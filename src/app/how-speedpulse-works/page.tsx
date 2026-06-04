import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { siteConfig } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'How SpeedPulse Works — Our Speed Test Methodology',
  description:
    'The methodology behind the SpeedPulse speed test: how we measure download, upload, ping and jitter, how we ensure accuracy, and what we do (and never do) with your data.',
  path: '/how-speedpulse-works',
  type: 'article',
});

const faqs = [
  {
    question: 'How does SpeedPulse measure my speed?',
    answer:
      'We transfer real data between your browser and the nearest test server over several parallel connections, timing the transfer to compute download and upload, and timing lightweight requests for ping and jitter.',
  },
  {
    question: 'Does SpeedPulse store my data or results?',
    answer:
      'No. Uploaded test data is discarded immediately and never stored. Your IP is used only to display your network info for that test and is not retained.',
  },
  {
    question: 'Why might my result differ from another speed test?',
    answer:
      'Different tools use different servers and methods. Server distance, the number of connections, and your line’s condition all cause variation. See our accuracy guide for details.',
  },
];

export default function HowItWorksPage() {
  return (
    <PageShell
      eyebrow="Methodology"
      title="How SpeedPulse Works"
      intro="Transparency about how we measure your connection — and how we protect your privacy while doing it."
      breadcrumbs={[{ name: 'How SpeedPulse Works' }]}
    >
      <p>
        {siteConfig.name} measures your connection by moving real data between
        your browser and a nearby test server, then timing it. Here&apos;s
        exactly what happens when you press start.
      </p>

      <h2 className="text-2xl font-bold text-white">1. Finding the server</h2>
      <p>
        We connect you to a test server on a global edge network so the
        measurement runs against a server near you. We also read your public IP
        and approximate location to show your network details.
      </p>

      <h2 className="text-2xl font-bold text-white">2. Ping &amp; jitter</h2>
      <p>
        We send a series of small requests and time each round trip. The median
        becomes your{' '}
        <Link href="/what-is-ping" className="text-cyan-400 hover:underline">
          ping
        </Link>
        ; the variation between them is your{' '}
        <Link href="/what-is-jitter" className="text-cyan-400 hover:underline">
          jitter
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold text-white">3. Download &amp; upload</h2>
      <p>
        We transfer incompressible random data over several parallel connections
        for a few seconds in each direction, discard a short warm-up period, and
        divide bytes by time to get your{' '}
        <Link href="/what-is-download-speed" className="text-cyan-400 hover:underline">
          download
        </Link>{' '}
        and{' '}
        <Link href="/what-is-upload-speed" className="text-cyan-400 hover:underline">
          upload
        </Link>{' '}
        speed. Multiple connections and warm-up exclusion are what make the
        result reflect your true line — read more on{' '}
        <Link href="/how-accurate-are-speed-tests" className="text-cyan-400 hover:underline">
          accuracy
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold text-white">4. Privacy</h2>
      <p>
        Uploaded test data is generated on the fly and{' '}
        <strong>discarded immediately</strong> — never stored. Your IP is used
        only to build your network-info card for that test. Full details are in
        our{' '}
        <Link href="/privacy-policy" className="text-cyan-400 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
