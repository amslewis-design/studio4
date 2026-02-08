'use client';

import { useTranslations } from 'next-intl';
import Navbar from '../../components/Navbar';
import ServiceCard from '@/components/services/ServiceCard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ConsultationModal from '@/app/components/ConsultationModal';

export default function ServicesPage() {
  const t = useTranslations('services');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#FC7CA4] selection:text-black">
      <Navbar onConsult={() => setIsConsultModalOpen(true)} />
      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />
      <div className="noise-overlay" />
      
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-32"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#FC7CA4] mb-6 block font-bold">
            {t('menuTitle')}
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-thin mb-8 leading-[0.9]">
            {t.rich('menuHeading', {
              span: (chunks) => <span className="text-[#FC7CA4] italic pr-4">{chunks}</span>,
              br: () => <br />
            })}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed font-light max-w-2xl mx-auto">
            {t('hero.intro')}
          </p>
        </motion.div>

        {/* New Services Trio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <ServiceCard
            index={0}
            title={t('visualAlchemy')}
            description={t('visualAlchemyDesc')}
            image="https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp"
            sigil="◉"
            className="h-[500px]"
          />
          <ServiceCard
            index={1}
            title={t('digitalNarratives')}
            description={t('digitalNarrativesDesc')}
            image="https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1768343750/IMG_4098_nbgkvo.jpg"
            sigil="⌇"
            className="h-[500px]"
          />
          <ServiceCard
            index={2}
            title={t('identityRefinement')}
            description={t('identityRefinementDesc')}
            image="https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769302516/sassy-studio/Gemini_Generated_Image_ynrk3jynrk3jynrk_zzxlco.png"
            sigil="◊"
            className="h-[500px]"
          />
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 items-start">
          <div className="md:mt-0">
            <ServiceCard
              index={3}
              title={t('plans.plan1.title')}
              description={t('plans.plan1.body')}
              image="https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769605842/sassy-studio/cafe_tjpt9a.webp"
              sigil="✦"
              className="h-[500px]"
            />
          </div>
          <div className="md:mt-24">
            <ServiceCard
              index={4}
              title={t('plans.plan2.title')}
              description={t('plans.plan2.body')}
              image="https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1768343750/IMG_4098_nbgkvo.jpg"
              sigil="❂"
              className="h-[550px]"
            />
          </div>
        </div>

        {/* Bespoke Project - Full Width Cinema */}
        <div className="mb-8">
          <ServiceCard
            index={5}
            title={t('bespoke.title')}
            description={t('bespoke.body')}
            sigil="✧"
            image="https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769302516/sassy-studio/Gemini_Generated_Image_ynrk3jynrk3jynrk_zzxlco.png"
            className="md:col-span-2 min-h-[400px] border-[#D4AF37]/20"
          />
        </div>

        {/* Methodology - New Card */}
        <div className="mb-32">
          <ServiceCard
            index={6}
            title={t('methodology.title')}
            description={t('methodology.body')}
            sigil="✺"
            image="https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=2069&auto=format&fit=crop" // Abstract/Process visual
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
          <button 
            onClick={(e) => { 
                e.preventDefault(); 
                setIsConsultModalOpen(true);
            }}
            className="inline-block relative z-10 px-12 py-5 border border-white/20 text-white font-bold tracking-[0.3em] uppercase text-xs hover:bg-[#FC7CA4] hover:border-[#FC7CA4] hover:text-black transition-all duration-300 cursor-pointer"
          >
            {t('cta')}
          </button>
        </motion.div>
      </div>
    </main>
  );
}
