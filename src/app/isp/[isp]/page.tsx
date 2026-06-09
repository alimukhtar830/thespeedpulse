import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import GlassCard from '@/components/GlassCard';
import FaqSection from '@/components/FaqSection';
import { isps, getIsp } from '@/content/isps';
import { flagEmoji } from '@/content/performance';
import { siteConfig } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

interface Props {
  params: { isp: string };
}

export function generateStaticParams() {
  return isps.map((i) => ({ isp: i.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const isp = getIsp(params.isp);
  if (!isp) return { title: 'Provider not found', robots: { index: false } };
  return pageMeta({
    title: `${isp.name} Speed Test — Is It Fast?`,
    description: `Test your ${isp.name} speed and compare to the typical in ${isp.country}: ~${isp.download} Mbps down, ${isp.upload} up, ${isp.ping} ms ping. Free & instant.`,
    path: `/isp/${isp.slug}`,
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

export default function IspPage({ params }: Props) {
  const isp = getIsp(params.isp);
  if (!isp) notFound();

  const others = isps.filter((i) => i.slug !== isp.slug && i.country === isp.country).slice(0, 6);

  const faqs = [
    {
      question: `Is ${isp.name} fast?`,
      answer: `${isp.name} (${isp.type}) typically delivers around ${isp.download} Mbps download and ${isp.upload} Mbps upload with a ping near ${isp.ping} ms in ${isp.country}. Your actual speed depends on your plan and location — run a test to see yours.`,
    },
    {
      question: `How do I test my ${isp.name} speed?`,
      answer: `Use the free ${siteConfig.name} speed test on this page. For the most accurate result, connect by Ethernet (or sit close to your router), close other apps, and run it a few times.`,
    },
    {
      question: `Why is my ${isp.name} speed slower than advertised?`,
      answer: `Wi-Fi distance, peak-time congestion, older equipment, and your specific plan all affect real speed. Testing wired next to the router shows your true line speed.`,
    },
  ];

  return (
    <main className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[{ name: 'ISP Speed Test', href: '/isp' }, { name: isp.name }]}
        />

        <div className="text-center">
          <p className="mb-3 text-4xl" aria-hidden>
            {flagEmoji(isp.countryCode)}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {isp.name} Speed Test
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Test your {isp.name} connection and compare it to the typical{' '}
            {isp.type.toLowerCase()} speed in {isp.country}.
          </p>
          <Link href="/" className="btn-primary mt-6">
            Start {isp.name} speed test
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          <Stat label="Download" value={isp.download} unit="Mbps" accent="text-cyan-400" />
          <Stat label="Upload" value={isp.upload} unit="Mbps" accent="text-violet" />
          <Stat label="Ping" value={isp.ping} unit="ms" accent="text-emerald-400" />
        </div>

        <div className="mt-8 space-y-5 text-slate-300">
          <p>
            <strong>{isp.name}</strong> is a {isp.type.toLowerCase()} provider in{' '}
            {isp.country}. A typical connection delivers around{' '}
            <strong>{isp.download} Mbps download</strong> and{' '}
            <strong>{isp.upload} Mbps upload</strong>, with a ping near{' '}
            <strong>{isp.ping} ms</strong>. These are representative reference
            figures — run the test above to see exactly what your line delivers.
          </p>
          <p>
            Getting less than expected? Compare wired vs Wi-Fi, then see{' '}
            <Link href="/why-is-my-internet-slow" className="text-cyan-400 hover:underline">
              why your internet is slow
            </Link>{' '}
            and{' '}
            <Link href="/how-to-improve-internet-speed" className="text-cyan-400 hover:underline">
              how to improve it
            </Link>
            .
          </p>
        </div>

        {others.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-white">
              Other providers in {isp.country}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/isp/${o.slug}`}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white"
                >
                  {o.name}
                </Link>
              ))}
              <Link
                href="/isp"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-cyan-400 hover:underline"
              >
                All providers →
              </Link>
            </div>
          </section>
        )}

        <div className="mt-12">
          <FaqSection items={faqs} />
        </div>

        <p className="mt-10 text-xs text-slate-500">
          Figures are approximate, representative typical speeds for general
          comparison only and are not affiliated with or endorsed by {isp.name}.
        </p>
      </div>
    </main>
  );
}
