import Link from 'next/link';
import Hero from '@/components/Hero';
import SpeedTestSection from '@/components/SpeedTestSection';
import GlassCard from '@/components/GlassCard';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import { siteConfig } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

const homeFaqs = [
  {
    question: 'What is a good internet speed?',
    answer:
      'For most households, 50–100 Mbps comfortably handles HD/4K streaming, video calls and several devices. Heavy 4K, large downloads or many users benefit from 200 Mbps or more.',
  },
  {
    question: 'How accurate is the SpeedPulse speed test?',
    answer:
      'SpeedPulse measures your real connection at test time using multiple parallel data transfers, with a warm-up period excluded for accuracy. Results vary with Wi-Fi, device and congestion, so run a few tests and average them.',
  },
  {
    question: 'Does the speed test use my data?',
    answer:
      'Yes — it transfers real data to measure speed, typically a few dozen to a few hundred MB depending on your connection. The exact amount is shown after each test, and uploaded data is never stored.',
  },
  {
    question: 'Why is my speed lower than my plan?',
    answer:
      'Wi-Fi distance and interference, older routers, background downloads, peak-time congestion and the distance to the test server all reduce measured speed. Testing over Ethernet usually gives a higher, more stable result.',
  },
  {
    question: 'What do download, upload, ping and jitter mean?',
    answer:
      'Download is how fast data reaches you; upload is how fast you send data out; ping is latency (responsiveness); and jitter is how stable that latency is. All four together describe your connection quality.',
  },
  {
    question: 'Is SpeedPulse free?',
    answer:
      'Yes, SpeedPulse is completely free, requires no signup, and runs right in your browser on any device.',
  },
];

export const metadata = pageMeta({
  title: 'Test Your Internet Speed Instantly — Free Speed Test',
  description: siteConfig.description,
  path: '/',
});

// SoftwareApplication structured data for the speed-test tool (rich results).
const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: `${siteConfig.name} Internet Speed Test`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  url: siteConfig.url,
  description:
    'Free internet speed test. Measure download, upload, ping and jitter instantly in your browser.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const explainers = [
  {
    title: 'Download speed',
    body: 'How fast data travels from the internet to your device. It affects streaming, browsing, and downloads. Higher is better.',
    href: '/what-is-download-speed',
    accent: 'text-cyan-400',
  },
  {
    title: 'Upload speed',
    body: 'How fast you can send data out — important for video calls, cloud backups, and posting content. Higher is better.',
    href: '/what-is-upload-speed',
    accent: 'text-violet',
  },
  {
    title: 'Ping (latency)',
    body: 'The round-trip time for a small request, in milliseconds. Lower ping means a more responsive connection, especially for gaming.',
    href: '/what-is-ping',
    accent: 'text-emerald-400',
  },
  {
    title: 'Jitter',
    body: 'The variation in your ping over time. Low, stable jitter keeps calls and live streams smooth and free of stutter.',
    href: '/internet-speed-guide',
    accent: 'text-amber-400',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <Hero />

      {/* Speed test — the main interactive component */}
      <section
        id="speed-test"
        aria-label="Internet speed test"
        className="container-page mt-10 sm:mt-14"
      >
        <GlassCard className="p-6 sm:p-10" reveal={false}>
          <SpeedTestSection />
        </GlassCard>
      </section>

      {/* Reserved ad placement (non-intrusive, no layout shift) */}
      <div className="container-page mt-10">
        <AdSlot className="min-h-[120px]" />
      </div>

      {/* Educational: what the results mean */}
      <section
        aria-labelledby="explainers-heading"
        className="container-page mt-16"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="explainers-heading"
            className="text-2xl font-bold sm:text-3xl"
          >
            What do your results mean?
          </h2>
          <p className="mt-3 text-slate-300">
            A quick guide to the four numbers that describe your connection.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {explainers.map((e, i) => (
            <GlassCard key={e.title} className="p-6" delay={i * 0.05}>
              <h3 className={`text-lg font-semibold ${e.accent}`}>{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {e.body}
              </p>
              <Link
                href={e.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white hover:text-cyan-400"
              >
                Learn more →
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        aria-labelledby="how-heading"
        className="container-page mt-16"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-heading" className="text-2xl font-bold sm:text-3xl">
            How the test works
          </h2>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['1', 'Find server', 'We connect you to the nearest test server.'],
            ['2', 'Measure ping', 'Lightweight requests measure latency & jitter.'],
            ['3', 'Test download', 'We stream data to gauge your download speed.'],
            ['4', 'Test upload', 'We send data back to measure upload speed.'],
          ].map(([n, title, body]) => (
            <GlassCard key={n} className="p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-hero-gradient text-sm font-bold text-white">
                {n}
              </span>
              <h3 className="mt-4 font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-400">{body}</p>
            </GlassCard>
          ))}
        </ol>
      </section>

      {/* Homepage FAQ — depth + FAQPage rich-result eligibility */}
      <section className="container-page mt-16">
        <div className="mx-auto max-w-3xl">
          <FaqSection items={homeFaqs} />
        </div>
      </section>
    </>
  );
}
