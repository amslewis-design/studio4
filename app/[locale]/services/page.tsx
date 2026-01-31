'use client';

import { useTranslations } from 'next-intl';
import Navbar from '../../../components/Navbar';
import ServiceCard from '@/components/services/ServiceCard';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const t = useTranslations('services'); // Using the services namespace
  const plans = t.raw('plans');

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#FC7CA4] selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed font-light">
            {t('hero.intro')}
          </p>
        </motion.div>

        {/* Two Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ServiceCard
            index={0}
            title={t('plans.plan1.title')}
            description={t('plans.plan1.body')}
          />
          <ServiceCard
            index={1}
            title={t('plans.plan2.title')}
            description={t('plans.plan2.body')}
          />
        </div>

        {/* Bespoke Project - Full Width */}
        <div className="mb-20">
          <ServiceCard
            index={2}
            title={t('bespoke.title')}
            description={t('bespoke.body')}
            className="md:col-span-2 border-[#FC7CA4]/30 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a]"
          />
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pb-20"
        >
          <a 
            href="mailto:consult@sassystudio.com"
            className="inline-block px-8 py-4 bg-[#FC7CA4] text-white font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#FC7CA4] transition-colors duration-300"
          >
            {t('cta')}
          </a>
        </motion.div>
      </div>
    </main>
  );
}
