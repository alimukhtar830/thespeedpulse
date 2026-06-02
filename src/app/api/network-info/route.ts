import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getClientIp } from '@/lib/geo/ip';
import { lookup } from '@/lib/geo/geoService';
import { getServerInfo } from '@/lib/geo/serverInfo';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Returns the visitor's network details (public IP, ISP, approximate location)
 * resolved entirely on our own infrastructure — IP from request headers, geo
 * from a local offline database — plus the configured test-server location.
 *
 * Privacy: the IP is used only to build this response and is not stored.
 */
export async function GET(req: NextRequest) {
  const { ip, isPublic } = getClientIp(req);
  const geo = await lookup(ip, isPublic);
  const server = getServerInfo();

  const parts = [geo.city, geo.region, geo.country].filter(
    (p) => p && p !== 'Unknown',
  );
  const location = parts.length ? parts.join(', ') : 'Unavailable';

  return NextResponse.json(
    {
      ip: isPublic ? ip : 'Local network',
      isp: geo.isp,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      location,
      server,
    },
    { headers: { 'Cache-Control': 'no-store, no-cache, max-age=0' } },
  );
}
