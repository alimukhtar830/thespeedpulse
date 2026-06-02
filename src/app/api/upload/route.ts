import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Upload measurement endpoint. Drains the request body to /dev/null (it is
 * NEVER stored or logged) and returns the number of bytes received so the
 * client can compute upload throughput.
 *
 * Privacy: uploaded test data is discarded immediately after counting.
 */
export async function POST(req: NextRequest) {
  let received = 0;

  try {
    const body = req.body;
    if (body) {
      const reader = body.getReader();
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) received += value.length;
        // value is dropped on the next iteration — nothing is buffered/stored.
      }
    } else {
      // Fallback for environments that don't expose a stream body.
      const buf = await req.arrayBuffer();
      received = buf.byteLength;
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: 'upload-read-failed' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  return NextResponse.json(
    { ok: true, bytes: received },
    { status: 200, headers: { 'Cache-Control': 'no-store, no-cache, max-age=0' } },
  );
}
