import type { ProgressCallback } from './types';
import { shardHost, shardingAvailable } from './shard';

function cacheBust(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

const MB = 1024 * 1024;

/** Probe a shard subdomain once; if it isn't reachable, fall back to same-origin. */
async function shardsReachable(): Promise<boolean> {
  if (!shardingAvailable()) return false;
  try {
    const res = await fetch(`${shardHost(0)}/api/download?bytes=16&cb=${cacheBust()}`, {
      cache: 'no-store',
    });
    await res.arrayBuffer();
    return res.ok;
  } catch {
    return false;
  }
}

interface DownloadOptions {
  /** Total measurement window in ms (excludes warm-up). */
  durationMs?: number;
  /** Warm-up period in ms, discarded from the final calculation. */
  warmupMs?: number;
  /** Number of parallel download streams. */
  streams?: number;
  /** Live progress callback (current Mbps). */
  onProgress?: ProgressCallback;
  signal?: AbortSignal;
}

/**
 * Measure download throughput using adaptive, multi-stream chunked downloads.
 *
 * - Multiple parallel streams saturate fast links.
 * - Chunk size ramps up as the connection proves fast (fewer round-trips).
 * - A warm-up window is discarded so TCP slow-start / TLS setup doesn't drag
 *   the result down.
 * - Every response is `no-store` + cache-busted so the browser/proxy cache
 *   cannot return stale bytes and inflate the measurement.
 */
export async function measureDownload({
  durationMs = 9000,
  warmupMs = 1000,
  streams = 16,
  onProgress,
  signal,
}: DownloadOptions = {}): Promise<{ mbps: number; bytes: number }> {
  let totalBytes = 0;
  // Bytes/time captured at the end of the warm-up window — the final speed is
  // computed only from data transferred after this point.
  let warmupBytes = 0;
  let warmupDone = false;

  const startTime = performance.now();
  const endTime = startTime + warmupMs + durationMs;
  const warmupEndTime = startTime + warmupMs;

  // Adaptive chunk size, shared across streams. Start larger to avoid wasting
  // the high-latency window on small ramp-up requests. Cap matches the server's
  // 24 MB incompressible pool (one response = at most one pool).
  let chunkBytes = 8 * MB;
  const maxChunk = 24 * MB;

  const controller = new AbortController();
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort, { once: true });

  // Live sampling loop — reports instantaneous speed for the gauge.
  let lastSampleBytes = 0;
  let lastSampleTime = startTime;
  const sampler = setInterval(() => {
    const now = performance.now();
    const deltaBits = (totalBytes - lastSampleBytes) * 8;
    const deltaSec = (now - lastSampleTime) / 1000;
    if (deltaSec > 0) {
      const mbps = deltaBits / deltaSec / 1e6;
      onProgress?.(mbps);
    }
    lastSampleBytes = totalBytes;
    lastSampleTime = now;

    if (!warmupDone && now >= warmupEndTime) {
      warmupBytes = totalBytes;
      warmupDone = true;
    }
  }, 150);

  // Decide once whether to spread streams across subdomains (separate HTTP/2
  // connections) — the single biggest factor for browser throughput on high-RTT links.
  const useShards = await shardsReachable();

  /** A single continuous download stream that keeps fetching chunks until time is up. */
  async function streamWorker(index: number) {
    const base = useShards ? shardHost(index) : '';
    while (performance.now() < endTime && !controller.signal.aborted) {
      const reqBytes = Math.min(chunkBytes, maxChunk);
      try {
        const res = await fetch(
          `${base}/api/download?bytes=${reqBytes}&cb=${cacheBust()}`,
          { cache: 'no-store', signal: controller.signal },
        );
        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

        const reader = res.body.getReader();
        const chunkStart = performance.now();
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) totalBytes += value.length;
          if (performance.now() >= endTime) {
            await reader.cancel().catch(() => {});
            break;
          }
        }

        // Adapt: if a chunk downloaded in well under a second, grow the next one
        // to reduce per-request overhead on fast links.
        const elapsed = performance.now() - chunkStart;
        if (elapsed < 700 && chunkBytes < maxChunk) {
          chunkBytes = Math.min(chunkBytes * 2, maxChunk);
        }
      } catch {
        if (controller.signal.aborted) break;
        // Brief backoff on transient errors, then retry until the window ends.
        await new Promise((r) => setTimeout(r, 120));
      }
    }
  }

  try {
    await Promise.all(Array.from({ length: streams }, (_, i) => streamWorker(i)));
  } finally {
    clearInterval(sampler);
    signal?.removeEventListener('abort', onAbort);
  }

  if (!warmupDone) warmupBytes = 0; // window ended before warm-up completed

  const measuredBytes = Math.max(0, totalBytes - warmupBytes);
  const measuredSeconds = Math.max(
    0.001,
    (performance.now() - warmupEndTime) / 1000,
  );
  const mbps = (measuredBytes * 8) / measuredSeconds / 1e6;

  if (!isFinite(mbps) || mbps <= 0) {
    throw new Error('Download test failed — no data transferred.');
  }

  // `bytes` is the TOTAL transferred (incl. warm-up) — what the data plan is charged.
  return { mbps: Math.round(mbps * 100) / 100, bytes: totalBytes };
}
