import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Contact form endpoint. Validates input and acknowledges receipt.
 *
 * NOTE: This intentionally does NOT persist the message. To actually deliver
 * messages, wire an email provider (e.g. Resend, SendGrid, Nodemailer) or a
 * datastore where indicated below — and update the Privacy Policy accordingly.
 */
export async function POST(req: NextRequest) {
  let data: { name?: string; email?: string; message?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  const name = (data.name ?? '').trim();
  const email = (data.email ?? '').trim();
  const message = (data.message ?? '').trim();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailValid || message.length < 5) {
    return NextResponse.json(
      { ok: false, error: 'validation' },
      { status: 422 },
    );
  }

  // TODO (deployment): deliver the message here, e.g.
  //   await sendEmail({ to: 'you@example.com', subject: `Contact from ${name}`, ... })
  // Nothing is stored by default to honour the privacy policy.

  return NextResponse.json(
    { ok: true },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
