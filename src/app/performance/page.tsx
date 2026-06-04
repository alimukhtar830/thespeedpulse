import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import GlassCard from '@/components/GlassCard';
import AdSlot from '@/components/AdSlot';
import { countries, flagEmoji } from '@/content/performance';
import { siteConfig } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Internet Speed by Country — Average Download, Upload & Ping',
  description:
    'Compare typical internet speeds around the world. See average download, upload, and ping by country, and test how your own connection measures up.',
  path: '/performance',
});

export default function PerformanceHub() {
  return (
    <main className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: 'Performance' }]} />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Performance
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Internet Speed by Country
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-300">
          Typical download, upload, and ping figures around the world — and an
          instant way to see how your own connection compares.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Test your speed
        </Link>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <AdSlot className="min-h-[120px]" />
      </div>

      <section
        aria-label="Countries"
        className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {countries.map((c, i) => (
          <Link key={c.slug} href={`/performance/${c.slug}`} className="block">
            <GlassCard className="glass-hover p-5" delay={Math.min(i, 8) * 0.03}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold text-white">
                  <span className="text-xl" aria-hidden>
                    {flagEmoji(c.code)}
                  </span>
                  {c.name}
                </span>
                <span className="text-cyan-400">→</span>
              </div>
              <div className="mt-3 flex gap-4 text-sm text-slate-400">
                <span>
                  <span className="font-semibold text-white">{c.download}</span> Mbps ↓
                </span>
                <span>
                  <span className="font-semibold text-white">{c.upload}</span> Mbps ↑
                </span>
                <span>
                  <span className="font-semibold text-white">{c.ping}</span> ms
                </span>
              </div>
            </GlassCard>
          </Link>
        ))}
      </section>

      <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-slate-500">
        Figures are approximate, representative values for typical fixed-broadband
        connections and are provided for general comparison. Your actual speed
        depends on your plan, provider, and network conditions — run a{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          free speed test
        </Link>{' '}
        on {siteConfig.name} to measure it.
      </p>
    </main>
  );
}
