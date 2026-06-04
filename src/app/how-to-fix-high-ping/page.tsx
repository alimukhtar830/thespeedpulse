import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'How to Fix High Ping (Lower Latency for Gaming)',
  description:
    'High ping or lag spikes? Learn what causes high latency and the proven fixes — wired connections, server choice, QoS, and when it is your ISP.',
  path: '/how-to-fix-high-ping',
  type: 'article',
});

const faqs = [
  {
    question: 'What causes high ping?',
    answer:
      'Distance to the server, Wi-Fi interference, network congestion, background bandwidth use, an overloaded router, or ISP routing. Wired tests help isolate the cause.',
  },
  {
    question: 'Does a faster plan lower ping?',
    answer:
      'Usually not. Ping is latency, not bandwidth. Upgrading Mbps rarely reduces ping unless your current line was saturated.',
  },
  {
    question: 'What is a high ping?',
    answer:
      'Above ~100 ms starts to feel laggy for gaming and calls; above 150 ms is noticeably bad. Under 50 ms is good, under 20 ms excellent.',
  },
];

export default function HighPingPage() {
  return (
    <PageShell
      eyebrow="Fix"
      title="How to Fix High Ping"
      intro="Lag is about latency, not Mbps. Here's how to bring your ping down and stop the spikes."
      breadcrumbs={[{ name: 'How to Fix High Ping' }]}
    >
      <p>
        High{' '}
        <Link href="/what-is-ping" className="text-cyan-400 hover:underline">
          ping
        </Link>{' '}
        and{' '}
        <Link href="/what-is-jitter" className="text-cyan-400 hover:underline">
          jitter
        </Link>{' '}
        cause lag and rubber-banding even on fast connections. Check yours with a{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          quick test
        </Link>
        , then work through these fixes in order.
      </p>

      <h2 className="text-2xl font-bold text-white">Proven fixes (most effective first)</h2>
      <ol className="list-decimal space-y-2 pl-6">
        <li>
          <strong>Use wired Ethernet.</strong> Wi-Fi adds latency and jitter —
          this is the single biggest fix.
        </li>
        <li>
          <strong>Pick a nearby server.</strong> In games, choose the closest
          region; distance directly adds milliseconds.
        </li>
        <li>
          <strong>Stop background bandwidth.</strong> Pause downloads, updates,
          and other devices&apos; streaming.
        </li>
        <li>
          <strong>Enable QoS / gaming mode</strong> on your router to prioritise
          latency-sensitive traffic.
        </li>
        <li>
          <strong>Restart and update</strong> your router; replace very old
          hardware.
        </li>
        <li>
          <strong>Disable VPNs</strong> while gaming unless they demonstrably
          improve routing.
        </li>
      </ol>

      <p>
        If wired ping is still high at all hours, it may be your ISP&apos;s
        routing — see{' '}
        <Link href="/why-is-my-internet-slow" className="text-cyan-400 hover:underline">
          why is my internet slow
        </Link>{' '}
        and contact them with your results.
      </p>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
