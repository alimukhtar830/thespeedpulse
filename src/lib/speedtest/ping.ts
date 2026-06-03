import type { PingResult } from './types';

/** Unique cache-busting token (avoids cached responses skewing timing). */
function cacheBust(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

/** Median of a numeric array. */
function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Jitter = average absolute difference between consecutive latency samples.
 * (RFC 3550-style mean deviation, simplified.)
 */
function computeJitter(samples: number[]): number {
  if (samples.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < samples.length; i++) {
    total += Math.abs(samples[i] - samples[i - 1]);
  }
  return total / (samples.length - 1);
}

interface PingOptions {
  /** Number of timed samples (the first is discarded as warm-up). */
  count?: number;
  /** Per-request timeout in ms. */
  timeoutMs?: number;
  /** Called with the latest sample (ms) for live UI feedback. */
  onSample?: (latestMs: number) => void;
  signal?: AbortSignal;
}

/**
 * Measure ping (latency) and jitter using multiple lightweight requests to
 * /api/ping. Each request is timed with performance.now(); the first sample is
 * dropped to exclude TLS/connection warm-up.
 */
export async function measurePing({
  count = 12,
  timeoutMs = 5000,
  onSample,
  signal,
}: PingOptions = {}): Promise<PingResult> {
  const samples: number[] = [];

  for (let i = 0; i < count; i++) {
    if (signal?.aborted) break;

    const controller = new AbortController();
    const onAbort = () => controller.abort();
    signal?.addEventListener('abort', onAbort, { once: true });
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const start = performance.now();
    try {
      await fetch(`/api/ping?cb=${cacheBust()}`, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal,
      });
      const rtt = performance.now() - start;

      // Discard the first measurement (connection warm-up).
      if (i > 0) {
        samples.push(rtt);
        onSample?.(rtt);
      }
    } catch {
      // Ignore individual failures; a few dropped samples won't break the result.
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }
  }

  if (samples.length === 0) {
    throw new Error('Ping test failed — no successful samples.');
  }

  // Use the minimum RTT as the representative latency (closest to true network
  // latency, excluding scheduling/jitter spikes); jitter still uses all samples.
  const best = Math.min(...samples);
  return {
    ping: Math.round(best * 10) / 10,
    jitter: Math.round(computeJitter(samples) * 10) / 10,
    samples,
  };
}
