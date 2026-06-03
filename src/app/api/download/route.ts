import { randomFillSync } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MB = 1024 * 1024;
const MAX_BYTES = 64 * MB; // safety cap per request
const DEFAULT_BYTES = 8 * MB;
const BLOCK = 256 * 1024; // 256 KB streaming block

/**
 * Streams `bytes` of FRESH random data (a new random block per chunk) with
 * caching disabled. Fresh-per-chunk randomness is critical: the edge (Vercel)
 * applies Brotli compression regardless of `no-transform`, and a *reused* block
 * would compress to almost nothing — making the client over-count throughput by
 * 10×+. Truly random data is incompressible, so bytes-on-wire ≈ bytes-decoded
 * and the measurement is accurate.
 *
 * Query params:
 *   - bytes: number of bytes to send (clamped to MAX_BYTES)
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
      // allocUnsafe is fine — randomFillSync overwrites every byte.
      const chunk = Buffer.allocUnsafe(size);
      randomFillSync(chunk);
      controller.enqueue(chunk);
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
