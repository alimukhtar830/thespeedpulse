import PageShell from '@/components/PageShell';
import { siteConfig } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: `About ${siteConfig.name} — Free Internet Speed Test Tool`,
  description: `Learn about ${siteConfig.name} — a fast, modern, privacy-friendly internet speed test for measuring download, upload, ping and jitter. Who built it and how it works.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title={`About ${siteConfig.name}`}
      intro="A fast, modern and privacy-friendly way to understand your internet connection."
      breadcrumbs={[{ name: 'About' }]}
      article={false}
    >
      <p>
        {siteConfig.name} is a free internet speed test built to give you a
        clear, accurate picture of your connection in seconds. We measure your
        download speed, upload speed, ping, and jitter, and show your public IP,
        ISP, approximate location, and the test server you connected to — all in
        one clean dashboard.
      </p>

      <h2 className="text-2xl font-bold text-white">Why we built it</h2>
      <p>
        Most speed tests are cluttered, slow to load, or buried under ads. We
        wanted something that feels premium and respects your time and privacy:
        a single tap to test, smooth animations, and results you can actually
        understand.
      </p>

      <h2 className="text-2xl font-bold text-white">How it works</h2>
      <p>
        When you start a test, we connect to a test server, send a series of
        lightweight requests to measure latency and jitter, then transfer data
        in both directions to measure your download and upload throughput. The
        speedometer animates in real time so you can watch your connection
        perform.
      </p>

      <h2 className="text-2xl font-bold text-white">Who built SpeedPulse</h2>
      <p>
        {siteConfig.name} was founded by{' '}
        <strong>{siteConfig.founders.join(' and ')}</strong> and is maintained by
        the {siteConfig.author}. We&apos;re a small,
        independent team of engineers who care about measurement accuracy and a
        clean, honest user experience. Our guides are written and reviewed by the
        team based on hands-on testing and established networking fundamentals.
        Have feedback or a correction?{' '}
        <a href="/contact" className="text-cyan-400 hover:underline">
          Get in touch
        </a>
        , and read{' '}
        <a href="/how-speedpulse-works" className="text-cyan-400 hover:underline">
          how SpeedPulse works
        </a>{' '}
        for our methodology.
      </p>

      <h2 className="text-2xl font-bold text-white">Privacy first</h2>
      <p>
        We resolve your network information on our own infrastructure and never
        sell your data. Uploaded test data is discarded immediately and never
        stored. Read more in our{' '}
        <a href="/privacy-policy" className="text-cyan-400 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </PageShell>
  );
}
