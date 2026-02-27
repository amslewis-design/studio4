'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

function ValueCard({ icon, title, description, index }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 hover:border-[#D4AF37]/40 transition-all duration-500"
    >
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <h3 className="text-2xl font-serif font-light text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
        {title}
      </h3>

      <div className="w-12 h-[1px] bg-white/20 group-hover:bg-[#D4AF37] transition-colors duration-300 mb-4" />

      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
        {description}
      </p>

      <div className="absolute inset-0 bg-gradient-to-br from-[#FC7CA4]/0 to-[#D4AF37]/0 group-hover:to-[#D4AF37]/5 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function LocalValueProps() {
  const t = useTranslations('cuernavaca.localValue');

  const values = [
    {
      icon: '📍',
      title: t('proximity.title'),
      description: t('proximity.description'),
    },
    {
      icon: '🌿',
      title: t('knowledge.title'),
      description: t('knowledge.description'),
    },
    {
      icon: '🤝',
      title: t('community.title'),
      description: t('community.description'),
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-thin text-white mb-6">
            {t('heading')}
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-sm mb-6">
            ¿Listo para trabajar con un equipo que conoce Cuernavaca de verdad?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 text-sm tracking-wide"
          >
            Comencemos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
