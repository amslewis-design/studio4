'use client';

import { useTranslations } from 'next-intl';
import Navbar from '../../components/Navbar';
import ServiceCard from '@/components/services/ServiceCard';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const t = useTranslations('services');

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      <div className="noise-overlay" />
      
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-32"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block font-bold">
            The Alchemist's Menu
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-thin mb-8 leading-[0.9]">
            It's time to turn <br />
            <span className="text-gold-gradient italic pr-4">content into gold.</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light max-w-2xl mx-auto">
            {t('hero.intro')}
          </p>
        </motion.div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 items-start">
          <div className="md:mt-0">
            <ServiceCard
              index={0}
              title={t('plans.plan1.title')}
              description={t('plans.plan1.body')}
              image="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1600&auto=format&fit=crop"
              sigil="✦"
              className="h-[500px]"
            />
          </div>
          <div className="md:mt-24">
            <ServiceCard
              index={1}
              title={t('plans.plan2.title')}
              description={t('plans.plan2.body')}
              image="https://images.unsplash.com/photo-1550418290-a8d86ad85ab4?q=80&w=1600&auto=format&fit=crop"
              sigil="❂"
              className="h-[550px]"
            />
          </div>
        </div>

        {/* Bespoke Project - Full Width Cinema */}
        <div className="mb-32">
          <ServiceCard
            index={2}
            title={t('bespoke.title')}
            description={t('bespoke.body')}
            sigil="✧"
            image="https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?q=80&w=2698&auto=format&fit=crop"
            className="md:col-span-2 min-h-[400px] border-[#D4AF37]/20"
          />
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pb-20 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FC7CA4]/20 blur-[100px] pointer-events-none" />
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }}
            className="inline-block relative z-10 px-12 py-5 border border-white/20 text-white font-bold tracking-[0.3em] uppercase text-xs hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-300"
          >
            {t('cta')}
          </a>
        </motion.div>
      </div>
    </main>
  );
}
