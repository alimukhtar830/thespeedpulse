import PageShell from '@/components/PageShell';
import FaqSection from '@/components/FaqSection';
import { uploadFaqs } from '@/content/faqs';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'What is Upload Speed?',
  description:
    'Upload speed explained: what it means, how it is measured, why it is often lower than download speed, and how much you need for video calls and cloud backups.',
  path: '/what-is-upload-speed',
  type: 'article',
});

export default function UploadSpeedPage() {
  return (
    <PageShell
      eyebrow="Learn"
      title="What is Upload Speed?"
      intro="Upload speed is how fast your connection sends data from your device out to the internet."
      breadcrumbs={[{ name: 'What is Upload Speed?' }]}
    >
      <p>
        <strong>Upload speed</strong> measures how quickly data travels from
        your device to the internet, in megabits per second (Mbps). It matters
        whenever you send information out: video calls, posting photos and
        videos, cloud backups, sending email attachments, and live streaming.
      </p>

      <h2 className="text-2xl font-bold text-white">How it's measured</h2>
      <p>
        Our test generates temporary, random data in your browser and sends it
        to the server over several connections, measuring how many bits per
        second are transmitted. The uploaded data is discarded immediately and
        never stored. As with download, a short warm-up period is excluded for
        accuracy.
      </p>

      <h2 className="text-2xl font-bold text-white">
        Why is upload usually slower than download?
      </h2>
      <p>
        Most home broadband (cable and DSL) is <em>asymmetric</em>: providers
        allocate more bandwidth to download because that's what most people use
        most. Fiber connections are often <em>symmetric</em>, giving you the
        same speed in both directions.
      </p>

      <h2 className="text-2xl font-bold text-white">
        How much upload do you need?
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>HD video calls: 3–5 Mbps</li>
        <li>Cloud backups & large file sharing: 10 Mbps+</li>
        <li>Live streaming in HD: 5–10 Mbps</li>
        <li>Working from home with video: 5 Mbps+ for a smooth experience</li>
      </ul>

      <FaqSection items={uploadFaqs} />
    </PageShell>
  );
}
