import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Internet Speed for Working From Home',
  description:
    'The internet speed you need to work from home: requirements for video calls, VPN, cloud apps and file transfers, plus tips for a reliable remote-work connection.',
  path: '/speed-for-working-from-home',
  type: 'article',
});

const faqs = [
  {
    question: 'What internet speed is good for working from home?',
    answer:
      'For one person: 25 Mbps download and 5–10 Mbps upload is comfortable for calls, VPN and cloud apps. Households with multiple remote workers should aim for 100 Mbps+.',
  },
  {
    question: 'Why does my VPN make the internet slower?',
    answer:
      'A VPN adds encryption overhead and routes traffic through a remote server, which can reduce speed and raise ping. Test with and without the VPN to measure the impact.',
  },
  {
    question: 'Is upload important for remote work?',
    answer:
      'Yes — video calls, cloud backups, and sending large files all rely on upload, which is often the limiting factor on home plans.',
  },
];

export default function WfhPage() {
  return (
    <PageShell
      eyebrow="Use case"
      title="Internet Speed for Working From Home"
      intro="Reliable remote work needs solid upload, low jitter, and enough headroom for everyone at home at once."
      breadcrumbs={[{ name: 'Speed for Working From Home' }]}
    >
      <p>
        Remote work stresses the parts of a connection home plans are weakest at:
        upload (for calls and file sharing) and consistency (for VPN and cloud
        apps). Raw download speed is rarely the bottleneck.
      </p>

      <h2 className="text-2xl font-bold text-white">What you need</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Per remote worker:</strong> ~25 Mbps down, 5–10 Mbps up
        </li>
        <li>
          <strong>Video calls:</strong> stable upload + low{' '}
          <Link href="/what-is-jitter" className="text-cyan-400 hover:underline">
            jitter
          </Link>{' '}
          (see{' '}
          <Link href="/speed-for-video-calls" className="text-cyan-400 hover:underline">
            speed for video calls
          </Link>
          )
        </li>
        <li>
          <strong>VPN:</strong> expect some speed/ping overhead — test both ways
        </li>
        <li>
          <strong>Multiple workers + kids streaming:</strong> 100–300 Mbps total
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white">Make it reliable</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Use wired Ethernet for your main work device.</li>
        <li>Prioritise your work device with router QoS.</li>
        <li>
          Check upload, ping and jitter — not just download — with a{' '}
          <Link href="/" className="text-cyan-400 hover:underline">
            quick test
          </Link>
          .
        </li>
        <li>
          If it&apos;s slow, work through the{' '}
          <Link href="/how-to-improve-internet-speed" className="text-cyan-400 hover:underline">
            improvement guide
          </Link>
          .
        </li>
      </ul>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
