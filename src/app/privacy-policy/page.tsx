import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${siteConfig.name} handles your data: what we use your IP and approximate location for, and what we never store.`,
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Your privacy matters. Here's exactly what we collect, why, and what we never store."
      updated="June 1, 2026"
      withSidebarAd={false}
      breadcrumbs={[{ name: 'Privacy Policy' }]}
    >
      <h2 className="text-2xl font-bold text-white">Overview</h2>
      <p>
        {siteConfig.name} is designed to be privacy-friendly. We do not require
        an account, and we do not collect personal information unless you choose
        to submit it through our contact form.
      </p>

      <h2 className="text-2xl font-bold text-white">
        IP address &amp; approximate location
      </h2>
      <p>
        To display your network information and to run the speed test, we detect
        your public IP address from your connection. Your IP and an approximate
        location (derived from a local geolocation database on our own servers)
        are used <strong>only</strong> to:
      </p>
      <ul className="list-disc space-y-1 pl-6">
        <li>show you your IP, ISP, and approximate city/region/country;</li>
        <li>display the test server you connected to; and</li>
        <li>improve the accuracy and relevance of your test.</li>
      </ul>
      <p>
        We do not use a third-party advertising or tracking API to resolve this
        information, and we do not store your IP address after generating your
        results.
      </p>

      <h2 className="text-2xl font-bold text-white">Speed test data</h2>
      <p>
        During the upload portion of the test, your browser sends temporary,
        randomly generated data to our server. This data is{' '}
        <strong>discarded immediately</strong> after measuring transfer speed.
        It is never written to disk, logged, or stored in any form.
      </p>

      <h2 className="text-2xl font-bold text-white">Contact form</h2>
      <p>
        If you contact us, we use the details you provide (such as your name,
        email, and message) solely to respond to your enquiry. We do not use
        them for marketing and do not share them with third parties.
      </p>

      <h2 className="text-2xl font-bold text-white">Cookies &amp; analytics</h2>
      <p>
        The core speed test works without tracking cookies. If we add analytics
        or advertising (such as Google AdSense) in the future, this policy will
        be updated to describe the data those services collect, and any required
        consent mechanisms will be provided.
      </p>

      <h2 className="text-2xl font-bold text-white">Your choices</h2>
      <p>
        Because we do not store personal data from the speed test, there is
        nothing to delete after a test. For any contact enquiries, you may ask us
        to remove your message at any time.
      </p>

      <h2 className="text-2xl font-bold text-white">Contact</h2>
      <p>
        Questions about this policy? Reach us through our{' '}
        <a href="/contact" className="text-cyan-400 hover:underline">
          contact page
        </a>
        .
      </p>
    </PageShell>
  );
}
