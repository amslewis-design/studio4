'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schemas';
import { useEffect, useState } from 'react';

export default function FAQPage() {
  const locale = useLocale();
  const t = useTranslations();
  const tFaq = useTranslations('faq');
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    // Load FAQ items from translations
    const items = [];
    let index = 0;
    while (true) {
      try {
        const question = tFaq(`items.${index}.question`);
        const answer = tFaq(`items.${index}.answer`);
        if (question && answer) {
          items.push({ question, answer });
          index++;
        } else {
          break;
        }
      } catch {
        break;
      }
    }
    setFaqs(items);
  }, [tFaq]);

  return (
    <>
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
              { name: tFaq('title'), url: `/${locale}/faq` },
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {tFaq('title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              {tFaq('subtitle')}
            </motion.p>
          </div>
        </section>

        {/* FAQ Items */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900/50 border border-white/5 rounded-sm p-8 hover:border-[#FC7CA4]/20 transition-colors"
              >
                <h3
                  className="text-2xl font-serif text-white mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </motion.div>
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
    </>
  );
}
