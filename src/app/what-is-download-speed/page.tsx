import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { downloadFaqs } from '@/content/faqs';

export const metadata: Metadata = {
  title: 'What is Download Speed?',
  description:
    'Download speed explained: what it means, how it is measured in Mbps, what counts as a good download speed, and why yours might be slower than expected.',
  alternates: { canonical: '/what-is-download-speed' },
};

export default function DownloadSpeedPage() {
  return (
    <PageShell
      eyebrow="Learn"
      title="What is Download Speed?"
      intro="Download speed is how fast your connection pulls data from the internet to your device."
    >
      <p>
        <strong>Download speed</strong> measures how quickly data travels from
        the internet to your device, expressed in megabits per second (Mbps).
        It's the number that matters most for everyday activities like
        streaming video, loading web pages, downloading files, and updating
        apps. The higher your download speed, the faster content arrives.
      </p>

      <h2 className="text-2xl font-bold text-white">How it's measured</h2>
      <p>
        A speed test downloads data from a server and measures how many bits
        arrive per second. To stay accurate, our test transfers data over
        several parallel streams, ramps up the amount of data on faster
        connections, and ignores a brief warm-up period so the result reflects
        your true sustained speed. We also disable caching so you're always
        measuring a real transfer.
      </p>

      <h2 className="text-2xl font-bold text-white">
        What uses your download speed?
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Streaming video (Netflix, YouTube, etc.) — 5–25 Mbps per 4K stream</li>
        <li>Web browsing and social media</li>
        <li>Downloading games, apps, and large files</li>
        <li>Receiving files on cloud services</li>
      </ul>

      <h2 className="text-2xl font-bold text-white">Mbps vs. MB/s</h2>
      <p>
        Speed is in mega<em>bits</em> (Mbps), while file sizes are in
        mega<em>bytes</em> (MB). Since one byte is eight bits, a 100 Mbps
        connection downloads about 12.5 MB each second.
      </p>

      <FaqSection items={downloadFaqs} />
    </PageShell>
  );
}
