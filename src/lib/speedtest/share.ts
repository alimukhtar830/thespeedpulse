/**
 * Encode/decode a speed-test result into a compact, URL-safe token used in
 * shareable /result/<id> links. The values are encoded directly into the URL —
 * nothing is stored server-side (privacy-friendly, stateless, indexable).
 */

export interface ShareResult {
  d: number; // download Mbps
  u: number; // upload Mbps
  p: number; // ping ms
  j: number; // jitter ms
}

function toBase64Url(str: string): string {
  // btoa/atob exist in both the browser and Node 18+ (our payload is ASCII).
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
  return atob(padded);
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Encode a result to a short URL-safe token. */
export function encodeResult(r: ShareResult): string {
  // Compact array form keeps the token short: [d,u,p,j]
  const json = JSON.stringify([round1(r.d), round1(r.u), round1(r.p), round1(r.j)]);
  return toBase64Url(json);
}

/** Decode a token back to a result, or null if it's malformed. */
export function decodeResult(token: string): ShareResult | null {
  try {
    const arr = JSON.parse(fromBase64Url(token));
    if (!Array.isArray(arr) || arr.length < 4) return null;
    const [d, u, p, j] = arr.map(Number);
    if ([d, u, p, j].some((n) => !Number.isFinite(n) || n < 0)) return null;
    return { d, u, p, j };
  } catch {
    return null;
  }
}
