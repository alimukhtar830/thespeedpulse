# SpeedPulse — Modern Internet Speed Test

A fast, premium internet speed-test web app built with **Next.js (App Router)**,
**React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It measures
download, upload, ping, and jitter against its own API routes, and resolves the
visitor's public IP, ISP, and approximate location entirely on **your own
infrastructure** — no third-party runtime API.

![Stack](https://img.shields.io/badge/Next.js-14-black) ![TS](https://img.shields.io/badge/TypeScript-strict-blue)

## Features

- 🎯 Animated SVG **speedometer** with a spring-eased needle and live count-up.
- ⚡ **Adaptive multi-stream** download/upload tests with warm-up exclusion and
  cache-busting for accuracy.
- 📡 **Self-hosted network info**: public IP from request headers + offline
  `.mmdb` geolocation database (no external API). Graceful IP-only fallback.
- 🔒 **Privacy-friendly**: uploaded test data is discarded, never stored; no
  tracking by default.
- 🎨 Premium dark UI: gradients, glassmorphism, glow effects, micro-animations,
  fully responsive.
- 🔍 **SEO-ready**: per-page metadata, `sitemap.xml`, `robots.txt`, FAQ JSON-LD,
  semantic HTML.
- 📰 Reserved, layout-shift-free **AdSense** placement zones.

## Prerequisites

- **Node.js 18.17+** (LTS recommended) and npm. Node is **not** bundled — install
  it from https://nodejs.org if `node -v` fails.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. (optional) configure environment
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env

# 3. Run the dev server
npm run dev
# open http://localhost:3000

# 4. Production build
npm run build
npm run start
```

## Deploy (required for real IP & real speed)

> **Important:** on `localhost` the server only sees the loopback address
> `127.0.0.1`, and the download/upload tests transfer data inside your own PC —
> so the IP shows "Local network" and the speed is **not** your real internet
> speed. Both become correct once the app runs on a **public server**, where
> requests arrive with your real IP and test data crosses your actual
> connection.

### Option A — Vercel CLI (fastest, no Git needed)

```bash
npm i -g vercel       # install the Vercel CLI
vercel login          # opens your browser to sign in (free account)
vercel                # deploy a preview — accept the defaults
vercel --prod         # deploy to production; prints your live URL
```

That's it — the live URL (e.g. `https://your-app.vercel.app`) will show your
real public IP and measure your real download/upload/ping/jitter.

### Option B — GitHub + Vercel dashboard

1. Push this folder to a new GitHub repository.
2. Go to https://vercel.com/new, import the repo, and click **Deploy**
   (Next.js is auto-detected — no configuration needed).

### After deploying

- Set `NEXT_PUBLIC_SITE_URL` in the Vercel project's **Environment Variables**
  to your live domain (used for canonical URLs, sitemap, robots).
- Optionally set `NEXT_PUBLIC_SERVER_CITY` / `NEXT_PUBLIC_SERVER_COUNTRY` to the
  Vercel region you deployed to.
- **ISP / city / country** still need an offline geo database. To enable it on
  Vercel: download a free `.mmdb` (see [`data/README.md`](./data/README.md)),
  remove the `/data/*.mmdb` line from `.gitignore` so it ships with the deploy,
  then redeploy. The public IP and speed work **without** the database.

## Environment variables

See `.env.example`. Key ones:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, sitemap, robots). |
| `NEXT_PUBLIC_SERVER_*` | Test-server name/city/country shown in the UI. |
| `GEO_CITY_DB_PATH` / `GEO_ASN_DB_PATH` | Paths to the local `.mmdb` databases. |

## Enabling full network info (ISP + location)

The app shows the public IP out of the box. For ISP/city/country, drop a free
offline database into `./data` — see [`data/README.md`](./data/README.md) for the
one-time download (DB-IP Lite needs no account). No code changes required.

> On `localhost` the IP is a loopback address, so network info shows
> "Local network". Real values resolve in production behind a proxy/CDN.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx, page.tsx, globals.css   # shell + home
│  ├─ sitemap.ts, robots.ts, not-found.tsx
│  ├─ about | privacy-policy | contact | …  # content pages
│  └─ api/{ping,download,upload,network-info,contact}/route.ts
├─ components/    # Speedometer, SpeedTest, cards, nav, footer, FAQ, …
├─ lib/
│  ├─ speedtest/{ping,download,upload,types}.ts   # measurement engine
│  ├─ geo/{ip,geoService,serverInfo}.ts           # self-hosted network info
│  └─ site.ts                                      # central config
└─ content/faqs.ts
```

## How the speed test works

1. **Find server** — connects to the app's own API and fetches network info.
2. **Ping/Jitter** — times multiple lightweight `/api/ping` requests; ping is the
   median, jitter the mean consecutive difference (first sample discarded).
3. **Download** — streams incompressible random data from `/api/download` over
   several parallel, adaptively-sized chunks; warm-up excluded; `no-store` +
   cache-busting prevents cached bytes.
4. **Upload** — POSTs randomly generated data to `/api/upload`, which counts and
   **discards** it. Throughput = bytes·8 / seconds.

Browser-based tests are an accurate **estimate**; Wi-Fi, device, and congestion
affect results. Test wired and average a few runs for the cleanest baseline.

## Enabling Google AdSense later

Reserved `<AdSlot>` containers already hold space (no layout shift). To activate:

1. Add the AdSense script to `src/app/layout.tsx` via `next/script`.
2. Replace the placeholder inside `src/components/AdSlot.tsx` with your
   `<ins className="adsbygoogle" …>` unit and push it.
3. Update the Privacy Policy to disclose ad cookies/consent.

## License

For your own use. Remember to honour the attribution terms of whichever IP
database you choose (see `data/README.md`).
