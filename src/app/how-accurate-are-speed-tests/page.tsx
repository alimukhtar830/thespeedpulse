import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'How Accurate Are Internet Speed Tests?',
  description:
    'How accurate are online speed tests? What affects results, why two tests differ, why Wi-Fi and server distance matter, and how to get the most reliable reading.',
  path: '/how-accurate-are-speed-tests',
  type: 'article',
});

const faqs = [
  {
    question: 'Why do I get different results each time I test?',
    answer:
      'Network conditions change constantly — congestion, background apps, Wi-Fi interference and the test server all vary. Run a few tests and take the average for a representative figure.',
  },
  {
    question: 'Why is my speed test lower than my plan?',
    answer:
      'Wi-Fi overhead, distance from the router, older devices, peak-time congestion, and the distance to the test server all reduce measured speed. A wired test close to the router is most accurate.',
  },
  {
    question: 'Are browser speed tests reliable?',
    answer:
      'Yes, as a real-world estimate. They measure the actual data your device can move at test time. For the cleanest baseline, test wired, close other apps, and average several runs.',
  },
];

export default function AccuracyPage() {
  return (
    <PageShell
      eyebrow="Learn"
      title="How Accurate Are Speed Tests?"
      intro="Speed tests are a reliable estimate of real-world performance — here's what affects the number and how to get the cleanest reading."
      breadcrumbs={[{ name: 'How Accurate Are Speed Tests?' }]}
    >
      <p>
        A browser-based speed test measures the actual data your device can send
        and receive at the moment you run it. That makes it an excellent
        real-world estimate — but several factors mean two back-to-back tests can
        differ, and why your result may not exactly match your plan.
      </p>

      <h2 className="text-2xl font-bold text-white">What affects accuracy</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Wi-Fi vs wired</strong> — Wi-Fi adds overhead and is affected
          by distance and interference. See{' '}
          <Link href="/wifi-vs-ethernet" className="text-cyan-400 hover:underline">
            Wi-Fi vs Ethernet
          </Link>
          .
        </li>
        <li>
          <strong>Server distance</strong> — testing to a far server raises ping
          and can lower throughput. A nearby server gives higher numbers.
        </li>
        <li>
          <strong>Device &amp; browser</strong> — older hardware, many open tabs,
          or VPNs cap results.
        </li>
        <li>
          <strong>Congestion</strong> — shared connections are slower at peak
          evening hours.
        </li>
        <li>
          <strong>Background usage</strong> — downloads, updates and other
          devices eat bandwidth during the test.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white">How to get the most accurate result</h2>
      <ol className="list-decimal space-y-2 pl-6">
        <li>Connect by wired Ethernet, or sit close to the router.</li>
        <li>Close other apps, downloads and tabs; pause other devices.</li>
        <li>
          Run the{' '}
          <Link href="/" className="text-cyan-400 hover:underline">
            test
          </Link>{' '}
          three times and take the average.
        </li>
        <li>Test at different times of day to spot congestion.</li>
      </ol>

      <p>
        Want to know how our own measurement works? Read{' '}
        <Link href="/how-speedpulse-works" className="text-cyan-400 hover:underline">
          how SpeedPulse works
        </Link>
        .
      </p>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
