import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getClientIp } from '@/lib/geo/ip';
import { lookup } from '@/lib/geo/geoService';
import { readPlatformGeo } from '@/lib/geo/platformGeo';
import { getServerInfo } from '@/lib/geo/serverInfo';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Returns the visitor's network details, resolved on our own infrastructure:
 *  - public IP   → from request headers
 *  - ISP         → from the local offline ASN database (no third-party API)
 *  - city/region/country → from the platform's edge geo headers when deployed,
 *                  falling back to the local offline City database in dev
 *
 * Privacy: the IP is used only to build this response and is not stored.
 */
export async function GET(req: NextRequest) {
  const { ip, isPublic } = getClientIp(req);

  // ISP (+ city/region/country if a local City DB is present, e.g. in dev).
  const dbGeo = await lookup(ip, isPublic);
  // Platform edge geo (Vercel) — authoritative for city/region/country in prod.
  const platform = isPublic ? readPlatformGeo(req) : null;

  const pick = (...vals: Array<string | undefined>) =>
    vals.find((v) => v && v !== 'Unknown') ?? 'Unknown';

  const city = pick(platform?.city, dbGeo.city);
  const region = pick(platform?.region, dbGeo.region);
  const country = pick(platform?.country, dbGeo.country);
  const isp = pick(dbGeo.isp);

  const parts = [city, region, country].filter((p) => p && p !== 'Unknown');
  const location = parts.length ? parts.join(', ') : 'Unavailable';

  return NextResponse.json(
    {
      ip: isPublic ? ip : 'Local network',
      isp,
      city,
      region,
      country,
      location,
      server: getServerInfo(),
    },
    { headers: { 'Cache-Control': 'no-store, no-cache, max-age=0' } },
  );
}
