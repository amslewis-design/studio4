'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function CoyoacanHero() {
  const t = useTranslations('coyoacan.hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image Carousel/Slideshow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        {/* Placeholder for hero image - replace with actual Coyoacán imagery */}
        <div className="relative w-full h-full bg-gradient-to-br from-[#FC7CA4]/20 via-black to-[#D4AF37]/20" />
        
        {/* Optional: Add actual image when ready
        <Image
          src="/coyoacan-hero.jpg"
          alt="Coyoacán"
          fill
          className="object-cover opacity-60"
          priority
        />
        */}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 border border-[#D4AF37]/30 bg-black/40 backdrop-blur-sm">
              <span className="text-[#D4AF37] text-sm">📍</span>
              <span className="text-white/80 text-sm font-light tracking-wider uppercase">
                Coyoacán, CDMX
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-thin text-white leading-tight max-w-5xl mx-auto">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#D4AF37] text-black font-medium tracking-wide hover:bg-[#FC7CA4] transition-colors duration-300 w-full sm:w-auto text-center"
            >
              {t('cta')}
            </motion.a>
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/20 text-white font-light tracking-wide hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 w-full sm:w-auto text-center"
            >
              {t.rich('..cta.secondary', { defaultValue: 'Ver proyectos en Coyoacán' })}
            </motion.a>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-6 justify-center items-center pt-12 text-sm text-white/60"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#FC7CA4]">✦</span>
              <span>Servicio en Español</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF37]">✦</span>
              <span>Con base en CDMX</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FC7CA4]">✦</span>
              <span>Respondemos en 24 horas</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-white/40 text-sm"
        >
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
