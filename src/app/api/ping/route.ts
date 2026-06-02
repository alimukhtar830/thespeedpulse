import { NextResponse } from 'next/server';

// Always run dynamically on the Node runtime — never cache.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Lightweight latency endpoint. Returns a tiny body as fast as possible so the
 * client can time round-trip latency. Caching is disabled at every layer.
 */
export async function GET() {
  return new NextResponse('1', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      Pragma: 'no-cache',
    },
  });
}

// Allow a HEAD ping too (even cheaper).
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
  });
}
