import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import GlassCard from '@/components/GlassCard';
import FaqSection from '@/components/FaqSection';
import { cities, getCity } from '@/content/cities';
import { flagEmoji } from '@/content/performance';
import { siteConfig } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

interface Props {
  params: { city: string };
}

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const city = getCity(params.city);
  if (!city) return { title: 'City not found', robots: { index: false } };
  return pageMeta({
    title: `Internet Speed in ${city.name} — Speed Test & Averages`,
    description: `Typical internet speed in ${city.name}, ${city.country}: about ${city.download} Mbps download, ${city.upload} Mbps upload, ${city.ping} ms ping. Test your own connection free.`,
    path: `/speed/${city.slug}`,
    type: 'article',
  });
}

const Stat = ({ label, value, unit, accent }: { label: string; value: number; unit: string; accent: string }) => (
  <GlassCard className="p-5 text-center" reveal={false}>
    <p className="text-sm text-slate-400">{label}</p>
    <p className={`mt-1 text-3xl font-bold tabular-nums ${accent}`}>
      {value}
      <span className="ml-1 text-base font-medium text-slate-400">{unit}</span>
    </p>
  </GlassCard>
);

export default function CityPage({ params }: Props) {
  const city = getCity(params.city);
  if (!city) notFound();

  const others = cities.filter((c) => c.slug !== city.slug && c.country === city.country).slice(0, 6);

  const faqs = [
    {
      question: `What is a good internet speed in ${city.name}?`,
      answer: `A connection at or above the local typical of ~${city.download} Mbps comfortably handles streaming, calls and multiple devices in ${city.name}. Run a test to see where yours lands.`,
    },
    {
      question: `How do I test my internet speed in ${city.name}?`,
      answer: `Use the free ${siteConfig.name} test on this page — it measures download, upload, ping and jitter in seconds, right in your browser.`,
    },
    {
      question: `Why is my speed different from the ${city.name} average?`,
      answer: `Your provider, plan, Wi-Fi setup and the time of day all affect results. Testing wired next to your router gives the most accurate, highest reading.`,
    },
  ];

  return (
    <main className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[{ name: 'Speed by City', href: '/speed' }, { name: city.name }]}
        />

        <div className="text-center">
          <p className="mb-3 text-4xl" aria-hidden>
            {flagEmoji(city.countryCode)}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Internet Speed in {city.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Typical broadband performance in {city.name}, {city.country} — and an
            instant test of your own connection.
          </p>
          <Link href="/" className="btn-primary mt-6">
            Test your speed in {city.name}
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          <Stat label="Download" value={city.download} unit="Mbps" accent="text-cyan-400" />
          <Stat label="Upload" value={city.upload} unit="Mbps" accent="text-violet" />
          <Stat label="Ping" value={city.ping} unit="ms" accent="text-emerald-400" />
        </div>

        <div className="mt-8 space-y-5 text-slate-300">
          <p>
            In <strong>{city.name}</strong>, a typical broadband connection
            delivers around <strong>{city.download} Mbps download</strong> and{' '}
            <strong>{city.upload} Mbps upload</strong>, with a ping near{' '}
            <strong>{city.ping} ms</strong>. These are representative figures —
            your real speed depends on your provider and plan.
          </p>
          <p>
            Compare providers on the{' '}
            <Link href="/isp" className="text-cyan-400 hover:underline">
              ISP speed test
            </Link>{' '}
            page, or see the{' '}
            <Link href="/performance" className="text-cyan-400 hover:underline">
              country-level averages
            </Link>
            .
          </p>
        </div>

        {others.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-white">
              Other cities in {city.country}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/speed/${o.slug}`}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white"
                >
                  {o.name}
                </Link>
              ))}
              <Link
                href="/speed"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-cyan-400 hover:underline"
              >
                All cities →
              </Link>
            </div>
          </section>
        )}

        <div className="mt-12">
          <FaqSection items={faqs} />
        </div>

        <p className="mt-10 text-xs text-slate-500">
          Figures are approximate, representative typical speeds for general
          comparison only.
        </p>
      </div>
    </main>
  );
}
