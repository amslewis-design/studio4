'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ServicePackageProps {
  sigil: string;
  name: string;
  description: string;
  index: number;
}

function ServicePackage({ sigil, name, description, index }: ServicePackageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative flex flex-col justify-end p-8 md:p-10 min-h-[350px] border border-white/5 hover:border-[#D4AF37]/40 transition-colors duration-500 overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent"
    >
      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Sigil Marker */}
        <div className="text-[#FC7CA4] text-3xl group-hover:text-[#D4AF37] transition-colors duration-500 mb-3 font-serif">
          {sigil}
        </div>

        <h3 className="text-2xl md:text-3xl font-serif font-thin text-white group-hover:text-[#D4AF37] transition-colors duration-300 tracking-wide">
          {name}
        </h3>
        
        <div className="w-12 h-[1px] bg-white/20 group-hover:bg-[#D4AF37] transition-colors duration-500" />
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300 font-light">
          {description}
        </p>
      </div>
      
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FC7CA4]/0 via-transparent to-[#D4AF37]/0 group-hover:to-[#D4AF37]/10 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function CoyoacanServices() {
  const t = useTranslations('coyoacan.services');

  const services = [
    {
      sigil: '☀️',
      name: t('weekend.name'),
      description: t('weekend.description'),
    },
    {
      sigil: '🎭',
      name: t('cultural.name'),
      description: t('cultural.description'),
    },
    {
      sigil: '🍽️',
      name: t('gastro.name'),
      description: t('gastro.description'),
    },
    {
      sigil: '📸',
      name: t('location.name'),
      description: t('location.description'),
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-black">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
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
          <p className="text-gray-400 text-lg font-light max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-8" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((service, index) => (
            <ServicePackage
              key={index}
              sigil={service.sigil}
              name={service.name}
              description={service.description}
              index={index}
            />
          ))}
        </div>

        {/* Pricing Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-r from-[#FC7CA4]/10 to-[#D4AF37]/10 border border-[#D4AF37]/20 px-8 py-6">
            <p className="text-white/80 text-sm mb-2">
              Paquetes desde <span className="text-[#D4AF37] font-semibold text-lg">$8,000 MXN</span>
            </p>
            <p className="text-gray-400 text-xs">
              Contáctanos para cotización personalizada según tus necesidades
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-[#D4AF37] text-black font-medium tracking-wide hover:bg-[#FC7CA4] transition-colors duration-300"
          >
            Solicitar Cotización
          </a>
        </motion.div>
      </div>
    </section>
  );
}
