import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schemas';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqMessages = {
  title: string;
  subtitle: string;
  items: FaqItem[];
};

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

async function getFAQMessages(locale: string): Promise<FaqMessages> {
  const messages = (await import(`../../../messages/${locale}.json`)).default as {
    faq?: {
      title?: string;
      subtitle?: string;
      items?: Array<{ question?: string; answer?: string }>;
    };
  };

  const faq = messages.faq;
  const items = Array.isArray(faq?.items)
    ? faq.items
        .filter((item): item is { question: string; answer: string } => Boolean(item?.question && item?.answer))
        .map((item) => ({ question: item.question, answer: item.answer }))
    : [];

  return {
    title: faq?.title || '',
    subtitle: faq?.subtitle || '',
    items,
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const faq = await getFAQMessages(locale);
  const faqs = faq.items;

  return (
    <>
      <Navbar isHomepage={false} />
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs, locale)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: t('navigation.home'), url: `/${locale}` },
              { name: faq.title, url: `/${locale}/faq` },
            ])
          ),
        }}
      />

      <div
        style={{
          backgroundColor: '#0a0a0a',
          minHeight: '100vh',
          paddingTop: '100px',
        }}
      >
        {/* Header */}
        <section className="py-16 md:py-24 px-6 border-b border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {faq.title}
            </h1>
            <p
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              {faq.subtitle}
            </p>
          </div>
        </section>

        {/* FAQ Items */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-neutral-900/50 border border-white/5 rounded-sm p-8 hover:border-[#FC7CA4]/20 transition-colors"
              >
                <h3
                  className="text-2xl font-serif text-white mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-500 mb-8">
              {locale === 'es'
                ? '¿No encontraste lo que buscabas?'
                : "Didn't find what you were looking for?"}
            </p>
            <Link
              href={`/${locale}#contact`}
              className="inline-block border border-[#FC7CA4] text-[#FC7CA4] px-12 py-4 uppercase tracking-[0.35em] text-[10px] hover:bg-[#FC7CA4] hover:text-black transition-colors duration-300 font-black"
            >
              {t('common.sendMessage')}
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
