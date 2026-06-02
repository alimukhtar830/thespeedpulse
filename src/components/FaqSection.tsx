import GlassCard from './GlassCard';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
}

/**
 * Renders an accessible FAQ list (native <details>) plus FAQPage JSON-LD
 * structured data for SEO rich results.
 */
export default function FaqSection({
  items,
  title = 'Frequently asked questions',
}: FaqSectionProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="not-prose">
      <h2 id="faq-heading" className="text-2xl font-bold text-white sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 space-y-3">
        {items.map((item, i) => (
          <GlassCard key={i} className="overflow-hidden" delay={i * 0.04}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-medium text-white">
                {item.question}
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-cyan-400 transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-slate-300">{item.answer}</p>
            </details>
          </GlassCard>
        ))}
      </div>

      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
