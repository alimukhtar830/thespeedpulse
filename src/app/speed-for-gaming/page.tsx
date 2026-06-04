import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Internet Speed for Gaming (Ping, Not Mbps, Matters Most)',
  description:
    'The internet speed you need for online gaming — why ping and jitter matter more than download Mbps, target latency for competitive play, and how to lower it.',
  path: '/speed-for-gaming',
  type: 'article',
});

const faqs = [
  {
    question: 'How much speed do I need for gaming?',
    answer:
      'Surprisingly little bandwidth — 10–25 Mbps download is plenty for the game itself. What matters most is low ping (under 50 ms) and low jitter for a responsive feel.',
  },
  {
    question: 'What is a good ping for gaming?',
    answer:
      'Under 20 ms is excellent for competitive play, 20–50 ms is good, 50–100 ms is playable, and above 150 ms causes noticeable lag.',
  },
  {
    question: 'Does download speed reduce lag?',
    answer:
      'No. Lag is caused by latency (ping) and jitter, not bandwidth. A 1 Gbps connection with high ping will still lag; a modest connection with low ping feels great.',
  },
];

export default function GamingPage() {
  return (
    <PageShell
      eyebrow="Use case"
      title="Internet Speed for Gaming"
      intro="For gaming, ping and jitter matter far more than download speed — here's what to aim for."
      breadcrumbs={[{ name: 'Speed for Gaming' }]}
    >
      <p>
        Online gaming uses very little bandwidth (often under 100 MB/hour). The
        thing that makes games feel responsive — or laggy — is{' '}
        <Link href="/what-is-ping" className="text-cyan-400 hover:underline">
          ping
        </Link>{' '}
        and{' '}
        <Link href="/what-is-jitter" className="text-cyan-400 hover:underline">
          jitter
        </Link>
        , not Mbps.
      </p>

      <h2 className="text-2xl font-bold text-white">What to aim for</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <span className="font-medium text-emerald-400">Ping under 20 ms</span> —
          competitive shooters and fighting games
        </li>
        <li>
          <span className="font-medium text-cyan-400">20–50 ms</span> — great for
          almost all online games
        </li>
        <li>
          <span className="font-medium text-amber-400">Jitter under 5 ms</span> —
          consistent, no rubber-banding
        </li>
        <li>
          <span className="font-medium text-slate-300">10–25 Mbps download</span>{' '}
          — enough for game data + voice chat + updates
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white">How to lower ping for gaming</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Use wired Ethernet — the single biggest improvement.</li>
        <li>Choose game servers geographically close to you.</li>
        <li>Enable QoS / gaming mode on your router.</li>
        <li>Stop background downloads and updates while playing.</li>
      </ul>
      <p>
        More fixes in{' '}
        <Link href="/how-to-fix-high-ping" className="text-cyan-400 hover:underline">
          how to fix high ping
        </Link>
        . Check your current ping with a{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          free test
        </Link>
        .
      </p>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
