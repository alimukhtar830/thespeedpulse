import { randomFillSync } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MB = 1024 * 1024;

// Pre-generated random pool, filled ONCE per instance. 24 MB is larger than
// Brotli's max compression window (16 MB), so streaming a slice of it stays
// incompressible — the edge can't shrink it, so the client measures true
// bytes-on-wire. Generating it once (not per request) means zero per-request
// CPU, so concurrent streams and cold instances deliver full throughput.
const POOL = 24 * MB;
const pool = Buffer.allocUnsafe(POOL);
randomFillSync(pool);

const MAX_BYTES = POOL; // a single response streams at most one full pool
const DEFAULT_BYTES = 8 * MB;
const BLOCK = 1024 * 1024; // 1 MB streaming block

/**
 * Streams up to `bytes` of incompressible random data (a slice of the pre-built
 * pool) with caching disabled. The client times the transfer to compute
 * download speed.
 *
 * Query params:
 *   - bytes: bytes to send (clamped to MAX_BYTES)
 *   - cb:    cache-busting token (defeats any cache)
 */
export async function GET(req: NextRequest) {
  const param = Number(req.nextUrl.searchParams.get('bytes'));
  const totalBytes =
    Number.isFinite(param) && param > 0
      ? Math.min(Math.floor(param), MAX_BYTES)
      : DEFAULT_BYTES;

  let sent = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (sent >= totalBytes) {
        controller.close();
        return;
      }
      const size = Math.min(BLOCK, totalBytes - sent);
      // Zero-copy slice of the pre-generated pool (no per-request CPU).
      controller.enqueue(pool.subarray(sent, sent + size));
      sent += size;
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(totalBytes),
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0, no-transform',
      Pragma: 'no-cache',
    },
  });
}
