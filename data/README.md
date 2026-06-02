# Local IP Geolocation Databases

This folder holds the **offline** IP geolocation databases used to resolve a
visitor's ISP and approximate location **without any third-party runtime API**.
The `.mmdb` files are git-ignored — download them once and drop them here.

The app runs fine **without** these files: network info falls back to showing
the public IP only (ISP/location reported as "Unknown"). Add the databases to
enable full network info.

## Expected files

| File | Provides | Env var |
| --- | --- | --- |
| `dbip-city-lite.mmdb` | City, region, country, lat/long | `GEO_CITY_DB_PATH` |
| `dbip-asn-lite.mmdb` | ISP / organization (ASN) | `GEO_ASN_DB_PATH` |

You can point the env vars (in `.env`) at different filenames/paths if you
prefer another location.

## Option A — DB-IP Lite (recommended, no account required)

DB-IP offers free monthly "Lite" databases under CC BY 4.0. No signup needed.

1. Visit https://db-ip.com/db/download/ip-to-city-lite and download the
   **MMDB** edition. Rename to `dbip-city-lite.mmdb` and place it here.
2. Visit https://db-ip.com/db/download/ip-to-asn-lite and download the
   **MMDB** edition. Rename to `dbip-asn-lite.mmdb` and place it here.

(Attribution: include a "IP Geolocation by DB-IP" credit where appropriate,
per their license.)

## Option B — MaxMind GeoLite2 (free, account required)

1. Create a free MaxMind account and license key.
2. Download **GeoLite2 City** and **GeoLite2 ASN** in `.mmdb` format.
3. Place them here and set the env vars to match the filenames, e.g.:

   ```
   GEO_CITY_DB_PATH=./data/GeoLite2-City.mmdb
   GEO_ASN_DB_PATH=./data/GeoLite2-ASN.mmdb
   ```

Both formats are read by the `maxmind` npm package, so either option works with
no code changes.

## Note on localhost

On `localhost` the detected IP is a loopback address, so network info shows
"Local network" regardless of the database. Real IPs resolve correctly once the
app is deployed behind a proxy/CDN (Vercel, NGINX, Cloudflare, etc.).
