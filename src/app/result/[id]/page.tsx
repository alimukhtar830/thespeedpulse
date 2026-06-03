import type { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { decodeResult } from '@/lib/speedtest/share';
import { siteConfig } from '@/lib/site';

interface Props {
  params: { id: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const r = decodeResult(params.id);
  if (!r) {
    return { title: 'Speed Test Result', robots: { index: false } };
  }
  const title = `${r.d} Mbps download · ${r.u} Mbps upload — Speed Test Result`;
  const description = `Download ${r.d} Mbps, upload ${r.u} Mbps, ping ${r.p} ms, jitter ${r.j} ms. Test your own internet speed free on ${siteConfig.name}.`;
  return {
    title,
    description,
    alternates: { canonical: `/result/${params.id}` },
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

const Stat = ({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: number;
  unit: string;
  accent: string;
}) => (
  <GlassCard className="p-5 text-center" reveal={false}>
    <p className="text-sm text-slate-400">{label}</p>
    <p className={`mt-1 text-3xl font-bold tabular-nums ${accent}`}>
      {value >= 100 ? value.toFixed(0) : value.toFixed(1)}
      <span className="ml-1 text-base font-medium text-slate-400">{unit}</span>
    </p>
  </GlassCard>
);

export default function ResultPage({ params }: Props) {
  const r = decodeResult(params.id);

  if (!r) {
    return (
      <main className="container-page py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Result not found</h1>
        <p className="mt-3 text-slate-400">
          This result link looks invalid or incomplete.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Run a speed test
        </Link>
      </main>
    );
  }

  return (
    <main className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: 'Speed Test Result' }]} />

        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Speed Test Result
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient">{r.d}</span> Mbps download
          </h1>
          <p className="mt-4 text-slate-300">
            A snapshot of an internet connection measured on {siteConfig.name}.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Stat label="Download" value={r.d} unit="Mbps" accent="text-cyan-400" />
          <Stat label="Upload" value={r.u} unit="Mbps" accent="text-violet" />
          <Stat label="Ping" value={r.p} unit="ms" accent="text-emerald-400" />
          <Stat label="Jitter" value={r.j} unit="ms" accent="text-amber-400" />
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <p className="text-lg font-semibold text-white">
            How fast is your connection?
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Run a free, instant test and compare your results.
          </p>
          <Link href="/" className="btn-primary mt-4">
            Test my internet speed
          </Link>
        </div>
      </div>
    </main>
  );
}
