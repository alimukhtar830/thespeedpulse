import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import GlassCard from '@/components/GlassCard';
import AdSlot from '@/components/AdSlot';
import { citiesByCountry } from '@/content/cities';
import { flagEmoji } from '@/content/performance';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Internet Speed by City — Local Speed Test',
  description:
    'Check typical internet speeds in your city and test your own connection. Pakistan (Karachi, Lahore, Islamabad) and major cities worldwide.',
  path: '/speed',
});

export default function CityHub() {
  const groups = citiesByCountry();
  const countries = Object.keys(groups);

  return (
    <main className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: 'Speed by City' }]} />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          By City
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Internet Speed by City
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-300">
          See typical internet speeds in your city — then run a test and see how
          your connection compares.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Test your speed
        </Link>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <AdSlot className="min-h-[120px]" />
      </div>

      <div className="mx-auto mt-10 max-w-5xl space-y-10">
        {countries.map((country) => (
          <section key={country}>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
              <span aria-hidden>{flagEmoji(groups[country][0].countryCode)}</span>
              {country}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {groups[country].map((city) => (
                <Link key={city.slug} href={`/speed/${city.slug}`} className="block">
                  <GlassCard className="glass-hover p-5" reveal={false}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{city.name}</span>
                      <span className="text-cyan-400">→</span>
                    </div>
                    <div className="mt-2 text-sm text-slate-400">
                      <span className="font-medium text-white">{city.download}</span> Mbps ↓ ·{' '}
                      <span className="font-medium text-white">{city.ping}</span> ms
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-slate-500">
        Figures are approximate, representative typical speeds for general
        comparison. Run a{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          free speed test
        </Link>{' '}
        to measure your own.
      </p>
    </main>
  );
}
