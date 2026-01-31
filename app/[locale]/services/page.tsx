'use client';

import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/app/components/Navbar';
import ServiceCard from '@/components/services/ServiceCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ServicesPage() {
  const t = useTranslations();
  const locale = useLocale();

  const servicesList = [
    {
      titleKey: 'services.visualAlchemy',
      descKey: 'services.visualAlchemyDesc',
    },
    {
      titleKey: 'services.digitalNarratives',
      descKey: 'services.digitalNarrativesDesc',
    },
    {
      titleKey: 'services.identityRefinement',
      descKey: 'services.identityRefinementDesc',
    },
  ];

  return (
    <>
      <Navbar isHomepage={false} />
      <main className="min-h-screen bg-[#1a1a1a] text-white pt-28 sm:pt-32 pb-12 sm:pb-20">
        
        {/* Header Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white">
              {t('services.title')}
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
              {t('hero.description')}
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {servicesList.map((service, index) => (
              <ServiceCard
                key={service.titleKey}
                index={index}
                title={t(service.titleKey)}
                description={t(service.descKey)}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 text-center">
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto py-16 border-t border-[#333333]"
            >
                <h2 className="text-3xl font-serif mb-6">{t('contact.title')}</h2>
                <p className="text-gray-400 mb-8">{t('contact.subtitle')}</p>
                 <Link 
                    href={`/${locale}#contact`}
                    className="inline-block bg-white text-black px-8 py-3 font-medium hover:bg-[#FC7CA4] hover:text-white transition-colors duration-300"
                  >
                    {t('common.enterTheStudio')}
                  </Link>
            </motion.div>
        </section>
      </main>
    </>
  );
}
