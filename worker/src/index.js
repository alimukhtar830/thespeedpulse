/**
 * SpeedPulse edge speed-test Worker.
 *
 * Runs on Cloudflare's global network (330+ data centers), so every visitor is
 * served from the PoP nearest them — giving low ping and full-line throughput
 * worldwide without per-country servers. This is the same model as
 * speed.cloudflare.com.
 *
 * Routes (all CORS-open so the Vercel-hosted site can call them):
 *   GET  /ping            -> tiny body, for latency
 *   GET  /download?bytes= -> streams up to 24 MB of incompressible random data
 *   POST /upload          -> drains and counts the body (never stored)
 */

const MB = 1024 * 1024;
const POOL_SIZE = 24 * MB; // > Brotli window; incompressible when sliced
const MAX_BYTES = POOL_SIZE;
const BLOCK = 1 * MB;

// Pre-generate one random pool per isolate (zero per-request CPU afterwards).
let pool = null;
function getPool() {
  if (!pool) {
    pool = new Uint8Array(POOL_SIZE);
    for (let o = 0; o < POOL_SIZE; o += 65536) {
      crypto.getRandomValues(pool.subarray(o, Math.min(o + 65536, POOL_SIZE)));
    }
  }
  return pool;
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': '86400',
};
const NOSTORE = 'no-store, no-cache, must-revalidate, max-age=0, no-transform';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // Latency
    if (path === '/ping' || path === '/') {
      return new Response('1', {
        headers: { ...CORS, 'Content-Type': 'text/plain', 'Cache-Control': NOSTORE },
      });
    }

    // Download — stream incompressible random data from the nearest edge.
    if (path === '/download') {
      const req = Number(url.searchParams.get('bytes'));
      const total =
        Number.isFinite(req) && req > 0 ? Math.min(Math.floor(req), MAX_BYTES) : 8 * MB;
      const p = getPool();
      let sent = 0;
      const stream = new ReadableStream({
        pull(controller) {
          if (sent >= total) {
            controller.close();
            return;
          }
          const size = Math.min(BLOCK, total - sent);
          controller.enqueue(p.subarray(sent, sent + size));
          sent += size;
        },
      });
      return new Response(stream, {
        headers: {
          ...CORS,
          'Content-Type': 'application/octet-stream',
          'Content-Length': String(total),
          'Cache-Control': NOSTORE,
        },
      });
    }

    // Upload — drain and count; never stored.
    if (path === '/upload') {
      let received = 0;
      if (request.body) {
        const reader = request.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) received += value.length;
        }
      } else {
        received = (await request.arrayBuffer()).byteLength;
      }
      return new Response(JSON.stringify({ ok: true, bytes: received }), {
        headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': NOSTORE },
      });
    }

    return new Response('Not found', { status: 404, headers: CORS });
  },
};
