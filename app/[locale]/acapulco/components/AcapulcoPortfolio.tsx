'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { PORTFOLIO_PROJECTS_EN, PORTFOLIO_PROJECTS_ES } from '@/app/constants/portfolio';

export default function AcapulcoPortfolio() {
  const t = useTranslations('acapulco.portfolio');
  const locale = useLocale();
  const portfolioItems = (locale === 'es' ? PORTFOLIO_PROJECTS_ES : PORTFOLIO_PROJECTS_EN).slice(0, 3);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-thin text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg font-light">{t('subtitle')}</p>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {portfolioItems.map((item, index) => (
            <Link
              key={item.id}
              href={`/${locale}/portfolio`}
              aria-label={`${item.clientName} - ${t('viewAll')}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative aspect-[4/5] overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.clientName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[#D4AF37] text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.location}
                  </p>
                  <h3 className="text-white text-xl font-serif font-light">{item.clientName}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <Link
            href={`/${locale}/portfolio`}
            className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 text-sm tracking-wide"
          >
            {t('viewAll')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
