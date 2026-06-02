import type { NextRequest } from 'next/server';

/** Private / loopback ranges that aren't meaningful public IPs. */
function isPrivateOrLocal(ip: string): boolean {
  if (!ip) return true;
  if (ip === '::1' || ip === '127.0.0.1') return true;
  if (ip.startsWith('::ffff:')) ip = ip.slice(7); // IPv4-mapped IPv6
  return (
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('127.') ||
    ip.startsWith('169.254.') ||
    ip.startsWith('fc') ||
    ip.startsWith('fd') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip)
  );
}

/**
 * Resolve the visitor's public IP from standard proxy/CDN headers — no
 * third-party API. Works behind Vercel, NGINX, Cloudflare, etc. On localhost
 * this yields a loopback address (reported to the UI as "Local network").
 *
 * Returns the raw IP plus an `isPublic` flag the geo layer uses to decide
 * whether a database lookup is worthwhile.
 */
export function getClientIp(req: NextRequest): {
  ip: string;
  isPublic: boolean;
} {
  const headers = req.headers;

  // x-forwarded-for may be a comma-separated list; the first entry is the client.
  const xff = headers.get('x-forwarded-for');
  const candidates: string[] = [];
  if (xff) candidates.push(...xff.split(',').map((s) => s.trim()));

  const single = [
    headers.get('x-real-ip'),
    headers.get('cf-connecting-ip'),
    headers.get('x-vercel-forwarded-for'),
    // Next.js populates request.ip on some platforms.
    (req as unknown as { ip?: string }).ip,
  ].filter(Boolean) as string[];
  candidates.push(...single);

  // Prefer the first public address; fall back to the first candidate.
  const publicIp = candidates.find((ip) => ip && !isPrivateOrLocal(ip));
  const ip = publicIp ?? candidates[0] ?? '127.0.0.1';
  const normalized = ip.startsWith('::ffff:') ? ip.slice(7) : ip;

  return { ip: normalized, isPublic: !isPrivateOrLocal(normalized) };
}
