'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface KnowledgeItemProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

function KnowledgeItem({ icon, title, description, index }: KnowledgeItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex gap-4 group"
    >
      <div className="flex-shrink-0 text-2xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-serif text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
          {title}
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function LocalKnowledge() {
  const t = useTranslations('acapulco.localKnowledge');

  const knowledgeItems = [
    {
      icon: '☀️',
      title: t('lightTiming.title'),
      description: t('lightTiming.description'),
    },
    {
      icon: '⏰',
      title: t('crowdPattern.title'),
      description: t('crowdPattern.description'),
    },
    {
      icon: '🏖️',
      title: t('seasonal.title'),
      description: t('seasonal.description'),
    },
    {
      icon: '🗺️',
      title: t('hiddenGems.title'),
      description: t('hiddenGems.description'),
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-black via-[#D4AF37]/5 to-black">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-thin text-white mb-6 leading-tight">{t('title')}</h2>
            <p className="text-gray-400 text-lg font-light mb-8">{t('subtitle')}</p>
            <div className="w-24 h-[1px] bg-[#D4AF37]" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-12 relative"
            >
              <div className="aspect-[4/3] border border-white/10 overflow-hidden relative">
                <Image
                  src="https://res.cloudinary.com/ds86m2xm0/image/upload/v1772129448/COYOAC%C3%81N-placeholder_qucawx.webp"
                  alt="Acapulco bay landscape"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            {knowledgeItems.map((item, index) => (
              <KnowledgeItem
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                index={index}
              />
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-8 border-t border-white/10"
            >
              <p className="text-[#D4AF37] text-sm italic">
                &ldquo;Trabajar en Acapulco exige entender su ritmo turístico, su luz costera y sus temporadas.
                Esa lectura local es clave para contenido que conecta y convierte.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
