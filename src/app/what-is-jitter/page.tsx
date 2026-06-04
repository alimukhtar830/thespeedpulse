import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'What is Jitter? (And Why It Matters for Calls & Gaming)',
  description:
    'Jitter explained: what it is, how it differs from ping, what a good jitter value is in ms, what causes it, and how to reduce it for smoother calls and gaming.',
  path: '/what-is-jitter',
  type: 'article',
});

const faqs = [
  {
    question: 'What is a good jitter value?',
    answer:
      'Under 5 ms is excellent and ideal for gaming and video calls. 5–20 ms is generally fine for everyday use. Above 30 ms you may notice stutter, lag spikes, or choppy audio/video.',
  },
  {
    question: 'What is the difference between ping and jitter?',
    answer:
      'Ping (latency) is how long one round trip takes. Jitter is how much that time varies between consecutive round trips. Low ping with high jitter still feels unstable, so both matter.',
  },
  {
    question: 'What causes high jitter?',
    answer:
      'Network congestion, Wi-Fi interference, overloaded routers, weak signal, and shared connections at peak times. A wired Ethernet connection usually reduces jitter significantly.',
  },
];

export default function JitterPage() {
  return (
    <PageShell
      eyebrow="Learn"
      title="What is Jitter?"
      intro="Jitter is the variation in your connection's response time — the key to whether calls and games feel smooth or choppy."
      breadcrumbs={[{ name: 'What is Jitter?' }]}
    >
      <p>
        <strong>Jitter</strong> is the variation in latency (
        <Link href="/what-is-ping" className="text-cyan-400 hover:underline">
          ping
        </Link>
        ) between data packets, measured in milliseconds (ms). If your ping is a
        steady 20 ms, jitter is low and your connection feels consistent. If the
        round-trip time bounces between 20 ms and 120 ms, jitter is high — and
        that inconsistency is what causes lag spikes, frozen video, and robotic
        audio on calls.
      </p>

      <h2 className="text-2xl font-bold text-white">How jitter is measured</h2>
      <p>
        A speed test sends several packets and records each one&apos;s round-trip
        time. Jitter is the average difference between those consecutive
        measurements. {''}
        {/* internal link */}
        Our test reports jitter alongside ping every time you run it — try a{' '}
        <Link href="/" className="text-cyan-400 hover:underline">
          free speed test
        </Link>{' '}
        to see yours.
      </p>

      <h2 className="text-2xl font-bold text-white">Why jitter matters</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Video calls</strong> — high jitter causes frozen frames and
          dropped audio (Zoom, Teams, WhatsApp).
        </li>
        <li>
          <strong>Online gaming</strong> — inconsistent latency causes rubber-
          banding and missed inputs even if average ping looks fine.
        </li>
        <li>
          <strong>Live streaming</strong> — buffering and quality drops.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white">How to reduce jitter</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Use a wired Ethernet connection instead of Wi-Fi.</li>
        <li>Reduce the number of devices competing for bandwidth.</li>
        <li>Place your router centrally and away from interference.</li>
        <li>
          Enable QoS (Quality of Service) on your router to prioritise calls and
          games. See our{' '}
          <Link href="/how-to-improve-internet-speed" className="text-cyan-400 hover:underline">
            speed improvement guide
          </Link>
          .
        </li>
      </ul>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
