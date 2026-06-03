'use client';

import GlassCard from './GlassCard';

export interface NetworkInfo {
  ip: string;
  isp: string;
  city: string;
  region: string;
  country: string;
  location: string; // pre-formatted "City, Region, Country"
  server: { name: string; city: string; country: string };
}

interface NetworkInfoCardProps {
  info: NetworkInfo | null;
  loading: boolean;
}

function Row({
  label,
  value,
  loading,
}: {
  label: string;
  value?: string;
  loading: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 py-3 last:border-0">
      <span className="shrink-0 text-sm text-slate-400">{label}</span>
      {loading ? (
        <span className="h-4 w-24 animate-pulse rounded bg-white/10" />
      ) : (
        // min-w-0 lets this flex item shrink so long values (IP/ISP) truncate
        // instead of forcing the card wider than the screen.
        <span
          className="min-w-0 truncate text-right text-sm font-medium text-white"
          title={value}
        >
          {value || '—'}
        </span>
      )}
    </div>
  );
}

/** Card showing the visitor's network details and the test server location. */
export default function NetworkInfoCard({
  info,
  loading,
}: NetworkInfoCardProps) {
  return (
    <GlassCard className="p-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/5 text-cyan-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.5 2.7 4 6.3 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.3-4-10s1.5-7.3 4-10z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </span>
        <h3 className="text-lg font-semibold text-white">Network Information</h3>
      </div>

      <div className="grid gap-x-8 sm:grid-cols-2">
        <div>
          <Row label="Public IP" value={info?.ip} loading={loading} />
          <Row label="ISP / Provider" value={info?.isp} loading={loading} />
          <Row label="City" value={info?.city} loading={loading} />
        </div>
        <div>
          <Row label="Region" value={info?.region} loading={loading} />
          <Row label="Country" value={info?.country} loading={loading} />
          <Row
            label="Server"
            value={
              info
                ? `${info.server.city}, ${info.server.country}`
                : undefined
            }
            loading={loading}
          />
        </div>
      </div>
    </GlassCard>
  );
}
