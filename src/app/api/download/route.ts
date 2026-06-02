import { randomFillSync } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MB = 1024 * 1024;
const MAX_BYTES = 64 * MB; // safety cap per request
const DEFAULT_BYTES = 8 * MB;
const BLOCK = 256 * 1024; // 256 KB streaming block

// One pre-filled random block, reused across responses. Random (not zeroed)
// data is incompressible, so the measured size reflects real bytes on the wire.
const randomBlock = new Uint8Array(BLOCK);
randomFillSync(randomBlock);

/**
 * Streams `bytes` of incompressible random data with caching fully disabled.
 * The client times how long the transfer takes to compute download speed.
 *
 * Query params:
 *   - bytes: number of bytes to send (clamped to MAX_BYTES)
 *   - cb:    cache-busting token (ignored server-side, defeats caches)
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
      const remaining = totalBytes - sent;
      const chunk =
        remaining >= BLOCK ? randomBlock : randomBlock.subarray(0, remaining);
      controller.enqueue(chunk);
      sent += chunk.length;
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(totalBytes),
      // `no-transform` also prevents any proxy from compressing the payload.
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0, no-transform',
      Pragma: 'no-cache',
    },
  });
}
