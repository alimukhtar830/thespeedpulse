import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Self-hosted IP geolocation service layer.
 *
 * Resolves ISP / city / region / country from LOCAL offline MaxMind-format
 * (.mmdb) databases — no third-party runtime API is called. Drop the free
 * DB-IP Lite (or GeoLite2) City + ASN databases into ./data (see data/README.md).
 *
 * If a database file is missing, lookups degrade gracefully to "Unknown"
 * instead of throwing, so the app runs fine without the DBs (IP-only).
 *
 * Swap in a different provider by replacing the body of `lookup()` — the
 * public shape (GeoLookup) stays the same.
 */

export interface GeoLookup {
  isp: string;
  city: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

// Minimal shapes for the MaxMind/DB-IP records we read.
interface CityRecord {
  country?: { names?: { en?: string }; iso_code?: string };
  city?: { names?: { en?: string } };
  subdivisions?: Array<{ names?: { en?: string } }>;
  location?: { latitude?: number; longitude?: number };
}
interface AsnRecord {
  autonomous_system_organization?: string;
  isp?: string;
  organization?: string;
}

type Reader<T> = { get(ip: string): T | null };

const CITY_DB = resolve(
  process.cwd(),
  process.env.GEO_CITY_DB_PATH ?? './data/dbip-city-lite.mmdb',
);
const ASN_DB = resolve(
  process.cwd(),
  process.env.GEO_ASN_DB_PATH ?? './data/dbip-asn-lite.mmdb',
);

// Cache opened readers (or `null` if the file is absent / failed to open) so we
// don't hit the filesystem on every request.
let cityReader: Reader<CityRecord> | null | undefined;
let asnReader: Reader<AsnRecord> | null | undefined;

async function openReader<T>(path: string): Promise<Reader<T> | null> {
  if (!existsSync(path)) return null;
  try {
    // Dynamic import keeps `maxmind` out of the edge bundle and optional.
    const { open } = await import('maxmind');
    // Cast through unknown — our minimal record shapes don't need maxmind's
    // generic Response constraint.
    return (await open(path)) as unknown as Reader<T>;
  } catch {
    return null;
  }
}

async function getCityReader() {
  if (cityReader === undefined) cityReader = await openReader<CityRecord>(CITY_DB);
  return cityReader;
}
async function getAsnReader() {
  if (asnReader === undefined) asnReader = await openReader<AsnRecord>(ASN_DB);
  return asnReader;
}

const UNKNOWN: GeoLookup = {
  isp: 'Unknown',
  city: 'Unknown',
  region: 'Unknown',
  country: 'Unknown',
};

/**
 * Look up geo + ISP info for a public IP. Returns best-effort data; any field
 * that can't be resolved is reported as "Unknown".
 */
export async function lookup(ip: string, isPublic: boolean): Promise<GeoLookup> {
  if (!isPublic) {
    return {
      isp: 'Local / Private Network',
      city: 'Local',
      region: 'Local',
      country: 'Local',
    };
  }

  const [city, asn] = await Promise.all([getCityReader(), getAsnReader()]);

  // No databases available — return IP-only placeholder.
  if (!city && !asn) return { ...UNKNOWN };

  const result: GeoLookup = { ...UNKNOWN };

  try {
    const rec = city?.get(ip);
    if (rec) {
      result.city = rec.city?.names?.en ?? 'Unknown';
      result.region = rec.subdivisions?.[0]?.names?.en ?? 'Unknown';
      result.country = rec.country?.names?.en ?? 'Unknown';
      result.latitude = rec.location?.latitude;
      result.longitude = rec.location?.longitude;
    }
  } catch {
    /* keep defaults */
  }

  try {
    const rec = asn?.get(ip);
    if (rec) {
      result.isp =
        rec.autonomous_system_organization ??
        rec.isp ??
        rec.organization ??
        'Unknown';
    }
  } catch {
    /* keep defaults */
  }

  return result;
}
