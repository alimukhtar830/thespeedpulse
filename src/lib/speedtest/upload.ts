import type { ProgressCallback } from './types';

function cacheBust(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

const MB = 1024 * 1024;

/**
 * Build a random payload once and reuse it across requests. Random (vs. zeros)
 * data defeats any opportunistic compression that would inflate the result.
 * Returns a concrete ArrayBuffer (a valid, correctly-typed Blob/fetch part).
 */
function makePayload(bytes: number): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes);
  const view = new Uint8Array(buffer);
  // crypto.getRandomValues is capped at 65536 bytes per call — fill in slices.
  const MAX = 65536;
  for (let offset = 0; offset < bytes; offset += MAX) {
    crypto.getRandomValues(view.subarray(offset, Math.min(offset + MAX, bytes)));
  }
  return buffer;
}

interface UploadOptions {
  durationMs?: number;
  warmupMs?: number;
  streams?: number;
  onProgress?: ProgressCallback;
  signal?: AbortSignal;
}

/**
 * Measure upload throughput by POSTing randomly-generated payloads to
 * /api/upload over a fixed window. The server reads and discards the body —
 * nothing is persisted. A warm-up window is excluded from the final figure.
 */
export async function measureUpload({
  durationMs = 8000,
  warmupMs = 1500,
  streams = 3,
  onProgress,
  signal,
}: UploadOptions = {}): Promise<number> {
  const payloadBytes = 2 * MB;
  // Build the random payload once and wrap it in a Blob (a correctly-typed,
  // reusable fetch body). The data is reused across all requests.
  const payload = new Blob([makePayload(payloadBytes)], {
    type: 'application/octet-stream',
  });

  let totalBytes = 0;
  let warmupBytes = 0;
  let warmupDone = false;

  const startTime = performance.now();
  const warmupEndTime = startTime + warmupMs;
  const endTime = warmupEndTime + durationMs;

  const controller = new AbortController();
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort, { once: true });

  let lastSampleBytes = 0;
  let lastSampleTime = startTime;
  const sampler = setInterval(() => {
    const now = performance.now();
    const deltaBits = (totalBytes - lastSampleBytes) * 8;
    const deltaSec = (now - lastSampleTime) / 1000;
    if (deltaSec > 0) onProgress?.(deltaBits / deltaSec / 1e6);
    lastSampleBytes = totalBytes;
    lastSampleTime = now;

    if (!warmupDone && now >= warmupEndTime) {
      warmupBytes = totalBytes;
      warmupDone = true;
    }
  }, 150);

  async function uploadWorker() {
    while (performance.now() < endTime && !controller.signal.aborted) {
      try {
        const res = await fetch(`/api/upload?cb=${cacheBust()}`, {
          method: 'POST',
          cache: 'no-store',
          headers: { 'Content-Type': 'application/octet-stream' },
          body: payload,
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // Count bytes only once the request resolves (fully sent + acknowledged).
        totalBytes += payloadBytes;
      } catch {
        if (controller.signal.aborted) break;
        await new Promise((r) => setTimeout(r, 120));
      }
    }
  }

  try {
    await Promise.all(Array.from({ length: streams }, () => uploadWorker()));
  } finally {
    clearInterval(sampler);
    signal?.removeEventListener('abort', onAbort);
  }

  if (!warmupDone) warmupBytes = 0;

  const measuredBytes = Math.max(0, totalBytes - warmupBytes);
  const measuredSeconds = Math.max(
    0.001,
    (performance.now() - warmupEndTime) / 1000,
  );
  const mbps = (measuredBytes * 8) / measuredSeconds / 1e6;

  if (!isFinite(mbps) || mbps <= 0) {
    throw new Error('Upload test failed — no data transferred.');
  }

  return Math.round(mbps * 100) / 100;
}
