import PageShell from '@/components/PageShell';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact',
  description: `Get in touch with the ${siteConfig.name} team. Questions, feedback, or partnership enquiries welcome.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Get in touch"
      intro="Questions, feedback, or partnership enquiries? Send us a message and we'll get back to you."
      withSidebarAd={false}
      breadcrumbs={[{ name: 'Contact' }]}
    >
      <ContactForm />
    </PageShell>
  );
}
