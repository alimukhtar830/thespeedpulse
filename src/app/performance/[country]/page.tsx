import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import GlassCard from '@/components/GlassCard';
import FaqSection from '@/components/FaqSection';
import {
  countries,
  getCountry,
  flagEmoji,
  countryRank,
  speedTier,
  globalMedianDownload,
} from '@/content/performance';
import { siteConfig } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

interface Props {
  params: { country: string };
}

// Pre-render every country page at build time.
export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = getCountry(params.country);
  if (!c) return { title: 'Country not found', robots: { index: false } };
  return pageMeta({
    title: `${c.name} Internet Speed — Averages & Test`,
    description: `Typical internet speed in ${c.name}: about ${c.download} Mbps download, ${c.upload} Mbps upload, and ${c.ping} ms ping. Test your own connection free on ${siteConfig.name}.`,
    path: `/performance/${c.slug}`,
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

export default function CountryPage({ params }: Props) {
  const c = getCountry(params.country);
  if (!c) notFound();

  const others = countries.filter((x) => x.slug !== c.slug).slice(0, 8);

  // Computed, per-country context so each page is genuinely differentiated.
  const { rank, total } = countryRank(c.slug);
  const tier = speedTier(c.download);
  const aboveGlobal = c.download >= globalMedianDownload;
  const diffPct = globalMedianDownload
    ? Math.round((Math.abs(c.download - globalMedianDownload) / globalMedianDownload) * 100)
    : 0;
  const tierText: Record<typeof tier, string> = {
    fast: `${c.name} has a well-developed broadband market. Widespread fibre keeps typical speeds high, comfortably handling 4K streaming, online gaming, video calls and busy multi-device households.`,
    mid: `${c.name} sits mid-table globally. Fibre is expanding in cities while many homes still run on cable, DSL or fixed-wireless, so real-world speeds vary widely by area and provider — choosing a fibre plan where available makes the biggest difference.`,
    developing: `Broadband in ${c.name} is still maturing. Many users rely on DSL or mobile/4G, and fibre is concentrated in major cities, so speeds vary a lot. Where fibre is available it dramatically outperforms DSL and mobile.`,
  };

  const faqs = [
    {
      question: `What is a good internet speed in ${c.name}?`,
      answer: `A connection at or above the local typical of ~${c.download} Mbps download is comfortable for streaming, video calls, and multiple devices. For heavy 4K streaming or large households, aim higher. Run a test to see where your connection lands.`,
    },
    {
      question: `How can I check my internet speed in ${c.name}?`,
      answer: `Use the free ${siteConfig.name} speed test — it measures your download, upload, ping, and jitter in seconds, right in your browser, and shows your IP, ISP, and location.`,
    },
    {
      question: `Why is my speed lower than the ${c.name} average?`,
      answer: `Wi-Fi distance, older equipment, your specific plan, peak-time congestion, and how far you are from the test server all affect results. Testing over a wired connection usually gives the highest, most stable figure.`,
    },
  ];

  return (
    <main className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[{ name: 'Performance', href: '/performance' }, { name: c.name }]}
        />

        <div className="text-center">
          <p className="mb-3 text-5xl" aria-hidden>
            {flagEmoji(c.code)}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Internet Speed in {c.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Typical fixed-broadband performance in {c.name} and how to measure your
            own connection.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          <Stat label="Download" value={c.download} unit="Mbps" accent="text-cyan-400" />
          <Stat label="Upload" value={c.upload} unit="Mbps" accent="text-violet" />
          <Stat label="Ping" value={c.ping} unit="ms" accent="text-emerald-400" />
        </div>

        <div className="mt-8 space-y-5 text-slate-300">
          <p>
            In {c.name}, a typical fixed-broadband connection delivers around{' '}
            <strong>{c.download} Mbps download</strong> and{' '}
            <strong>{c.upload} Mbps upload</strong>, with a ping near{' '}
            <strong>{c.ping} ms</strong>. These are representative reference
            figures — your real speed depends on your provider, plan, and setup.
          </p>
          <h2 className="text-xl font-bold text-white">
            How {c.name} compares globally
          </h2>
          <p>
            In our dataset of {total} countries, {c.name} ranks{' '}
            <strong>#{rank} of {total}</strong> for typical download speed — that&apos;s{' '}
            {aboveGlobal ? 'above' : 'below'} the global median of{' '}
            <strong>{globalMedianDownload} Mbps</strong>
            {diffPct > 0 ? ` (roughly ${diffPct}% ${aboveGlobal ? 'higher' : 'lower'})` : ''}.{' '}
            {tierText[tier]}
          </p>

          <h2 className="text-xl font-bold text-white">
            What affects internet speed in {c.name}
          </h2>
          <p>
            Your real speed depends far more on your setup than the national
            average: the connection type ({''}
            <Link href="/wifi-vs-ethernet" className="text-cyan-400 hover:underline">
              wired vs Wi-Fi
            </Link>
            ), your provider and plan, distance to the exchange, and peak-time
            congestion. To get the most from your line, see{' '}
            <Link href="/how-to-improve-internet-speed" className="text-cyan-400 hover:underline">
              how to improve your internet speed
            </Link>{' '}
            and check what you actually need in our{' '}
            <Link href="/how-much-speed-do-i-need" className="text-cyan-400 hover:underline">
              speed requirements guide
            </Link>
            .
          </p>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <p className="text-lg font-semibold text-white">
              Test your internet speed in {c.name}
            </p>
            <Link href="/" className="btn-primary mt-4">
              Start free speed test
            </Link>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">Compare other countries</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/performance/${o.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white"
              >
                <span aria-hidden>{flagEmoji(o.code)}</span> {o.name}
              </Link>
            ))}
            <Link
              href="/performance"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-cyan-400 hover:underline"
            >
              All countries →
            </Link>
          </div>
        </section>

        <div className="mt-12">
          <FaqSection items={faqs} />
        </div>

        <p className="mt-10 text-xs text-slate-500">
          Figures are approximate, representative values for typical fixed-broadband
          connections, provided for general comparison only.
        </p>
      </div>
    </main>
  );
}
