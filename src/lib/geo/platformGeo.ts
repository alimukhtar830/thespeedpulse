import type { NextRequest } from 'next/server';
import iso from 'iso-3166-2';

export interface PlatformGeo {
  city?: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Reads geolocation from the hosting platform's edge headers (Vercel populates
 * these on every request from its own network — it is request metadata, not a
 * third-party API call made by this app). Returns null when running somewhere
 * that doesn't provide them (e.g. local dev), so callers can fall back to the
 * offline database.
 */
export function readPlatformGeo(req: NextRequest): PlatformGeo | null {
  const h = req.headers;
  const city = h.get('x-vercel-ip-city');
  const countryCode = h.get('x-vercel-ip-country');
  const regionCode = h.get('x-vercel-ip-country-region');
  const lat = h.get('x-vercel-ip-latitude');
  const lon = h.get('x-vercel-ip-longitude');

  if (!city && !countryCode && !regionCode) return null;

  // Expand the ISO country code to a full name (e.g. "PK" → "Pakistan").
  let country = countryCode ?? undefined;
  if (countryCode) {
    try {
      country =
        new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) ??
        countryCode;
    } catch {
      country = countryCode;
    }
  }

  // Expand the ISO 3166-2 subdivision code to a full name (e.g. "PB" → "Panjāb").
  let region = regionCode ?? undefined;
  if (countryCode && regionCode) {
    try {
      const sub = iso.subdivision(countryCode, regionCode);
      if (sub?.name) region = sub.name;
    } catch {
      /* keep the raw code */
    }
  }

  return {
    city: city ? decodeURIComponent(city) : undefined,
    region,
    country,
    latitude: lat ? Number(lat) : undefined,
    longitude: lon ? Number(lon) : undefined,
  };
}
