import type { ProgressCallback } from './types';
import { shardHost, shardingAvailable } from './shard';

function cacheBust(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

const MB = 1024 * 1024;

/** Probe a shard subdomain once; fall back to same-origin if unreachable. */
async function shardsReachable(probeBody: BodyInit): Promise<boolean> {
  if (!shardingAvailable()) return false;
  try {
    const res = await fetch(`${shardHost(0)}/api/upload?cb=${cacheBust()}`, {
      method: 'POST',
      cache: 'no-store',
      body: probeBody,
    });
    return res.ok;
  } catch {
    return false;
  }
}

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
  streams = 6,
  onProgress,
  signal,
}: UploadOptions = {}): Promise<number> {
  const payloadBytes = 2 * MB;
  // Build the random payload once. Label it text/plain so cross-origin POSTs to
  // shard subdomains are "simple requests" (no CORS preflight). The bytes are
  // still random/incompressible; the server only counts them.
  const payload = new Blob([makePayload(payloadBytes)], { type: 'text/plain' });

  const useShards = await shardsReachable(payload);

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

  async function uploadWorker(index: number) {
    const base = useShards ? shardHost(index) : '';
    while (performance.now() < endTime && !controller.signal.aborted) {
      try {
        // No custom headers + text/plain body => simple request, no preflight.
        const res = await fetch(`${base}/api/upload?cb=${cacheBust()}`, {
          method: 'POST',
          cache: 'no-store',
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
    await Promise.all(Array.from({ length: streams }, (_, i) => uploadWorker(i)));
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
