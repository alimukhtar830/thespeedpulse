import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'What is Bandwidth? (Bandwidth vs Speed Explained)',
  description:
    'Bandwidth explained simply: what it means, how it differs from speed and throughput, how it is measured in Mbps, and how much bandwidth your home needs.',
  path: '/what-is-bandwidth',
  type: 'article',
});

const faqs = [
  {
    question: 'Is bandwidth the same as speed?',
    answer:
      'Not exactly. Bandwidth is the maximum capacity of your connection (the size of the pipe); speed/throughput is how much data actually flows at a given moment. You rarely use 100% of your bandwidth at once.',
  },
  {
    question: 'How much bandwidth do I need?',
    answer:
      'It depends on simultaneous usage. One 4K stream needs ~25 Mbps; add video calls, gaming and downloads and a busy household is comfortable on 100–300 Mbps of bandwidth.',
  },
  {
    question: 'Does more bandwidth mean lower ping?',
    answer:
      'No. Bandwidth (capacity) and ping (latency) are independent. A high-bandwidth connection can still have high ping, which is why gaming cares about ping, not just bandwidth.',
  },
];

export default function BandwidthPage() {
  return (
    <PageShell
      eyebrow="Learn"
      title="What is Bandwidth?"
      intro="Bandwidth is the maximum amount of data your connection can carry — think of it as the width of the pipe."
      breadcrumbs={[{ name: 'What is Bandwidth?' }]}
    >
      <p>
        <strong>Bandwidth</strong> is the maximum rate at which data can travel
        over your internet connection, measured in megabits per second (Mbps).
        It&apos;s often pictured as a pipe: more bandwidth means a wider pipe
        that can carry more data at once. Your ISP plan (e.g. &quot;100
        Mbps&quot;) is really a bandwidth figure — the ceiling, not a guarantee
        of constant speed.
      </p>

      <h2 className="text-2xl font-bold text-white">Bandwidth vs speed vs throughput</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Bandwidth</strong> — the maximum capacity (the pipe size).
        </li>
        <li>
          <strong>Throughput / speed</strong> — how much data is actually moving
          right now, which a{' '}
          <Link href="/" className="text-cyan-400 hover:underline">
            speed test
          </Link>{' '}
          measures.
        </li>
        <li>
          <strong>Latency (<Link href="/what-is-ping" className="text-cyan-400 hover:underline">ping</Link>)</strong>{' '}
          — how quickly a request travels, independent of bandwidth.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white">Why you rarely hit your full bandwidth</h2>
      <p>
        Real-world throughput is usually a bit below your bandwidth because of
        Wi-Fi overhead, distance to the server, congestion, and the capabilities
        of the site you&apos;re downloading from. That&apos;s normal — see{' '}
        <Link href="/how-accurate-are-speed-tests" className="text-cyan-400 hover:underline">
          how accurate speed tests are
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold text-white">How much bandwidth do you need?</h2>
      <p>
        Add up what runs at the same time in your home. For a quick answer, see{' '}
        <Link href="/how-much-speed-do-i-need" className="text-cyan-400 hover:underline">
          how much speed do I need
        </Link>{' '}
        — most households are comfortable between 100 and 300 Mbps.
      </p>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
