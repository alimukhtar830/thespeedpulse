import { ImageResponse } from 'next/og';
import { decodeResult } from '@/lib/speedtest/share';
import { siteConfig } from '@/lib/site';

export const runtime = 'edge';
export const alt = 'Internet speed test result';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function Metric({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: 64, fontWeight: 700, color }}>
        {value >= 100 ? value.toFixed(0) : value.toFixed(1)}
      </div>
      <div style={{ fontSize: 24, color: '#94a3b8', marginTop: 4 }}>
        {label} · {unit}
      </div>
    </div>
  );
}

// Dynamic social share card showing the measured speeds.
export default async function Image({ params }: { params: { id: string } }) {
  const r = decodeResult(params.id) ?? { d: 0, u: 0, p: 0, j: 0 };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #05060f 0%, #0a0e1f 55%, #161c45 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, color: '#22d3ee', letterSpacing: 4 }}>
          {siteConfig.name.toUpperCase()} · SPEED TEST RESULT
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 24 }}>
          <div style={{ fontSize: 150, fontWeight: 800 }}>{r.d.toFixed(1)}</div>
          <div style={{ fontSize: 44, color: '#94a3b8', marginLeft: 16 }}>Mbps</div>
        </div>
        <div style={{ display: 'flex', gap: 80, marginTop: 40 }}>
          <Metric label="Upload" value={r.u} unit="Mbps" color="#8b5cf6" />
          <Metric label="Ping" value={r.p} unit="ms" color="#34d399" />
          <Metric label="Jitter" value={r.j} unit="ms" color="#fbbf24" />
        </div>
      </div>
    ),
    { ...size },
  );
}
