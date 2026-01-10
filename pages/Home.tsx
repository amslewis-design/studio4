'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ConsultationModal from '../app/components/ConsultationModal';

const services = [
  {
    title: 'Visual Alchemy',
    description: 'High-res hotel and gastronomy photography that captures the essence of luxury.',
    icon: '✧'
  },
  {
    title: 'Digital Narratives',
    description: 'Strategic Reels and TikTok production designed for maximum brand prestige.',
    icon: '✦'
  },
  {
    title: 'Identity Refinement',
    description: 'Bespoke brand positioning for Mexico City’s elite hospitality market.',
    icon: '❂'
  }
];

export default function Home() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: 'var(--primary)' }}>
      <ConsultationModal isOpen={isConsultModalOpen} onClose={() => setIsConsultModalOpen(false)} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070" 
              alt="Luxury Hotel" 
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[var(--primary)]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "1em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.5 }}
              className="text-[var(--accent)] uppercase text-xs mb-8 block font-sans font-medium"
            >
              Sassy Studio CDMX
            </motion.span>
            <h1 className="text-7xl md:text-[10rem] font-serif mb-10 leading-[0.85] tracking-tighter">
              Alchemists of <br />
              <span className="italic font-light opacity-80">Content</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-16 font-sans tracking-wide">
              Transforming boutique hospitality into digital gold through high-end visual storytelling and strategic brand refinement.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button 
                onClick={() => setIsConsultModalOpen(true)}
                className="border border-[var(--accent)] text-[var(--accent)] px-16 py-5 uppercase tracking-[0.4em] text-[10px] hover:bg-[var(--accent)] hover:text-black transition-all duration-700 font-black shadow-2xl"
                style={{ borderRadius: 'var(--btn-radius)' }}
              >
                Enter the Studio
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/20">Descent</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-[var(--accent)] to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 80] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-40 px-6" style={{ backgroundColor: 'var(--section-bg)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center mb-32"
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight">Our Craft</h2>
            <div className="w-32 h-[1px] bg-[var(--accent)] mx-auto opacity-30"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-20 lg:gap-32">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="mb-10 text-5xl text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-110 origin-left">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-serif mb-6 group-hover:text-[var(--accent)] transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed tracking-wide text-lg group-hover:text-gray-300 transition-colors duration-500">
                  {service.description}
                </p>
                <div className="mt-12 overflow-hidden">
                   <div className="w-full h-[1px] bg-white/5 group-hover:bg-[var(--accent)] transition-colors origin-left scale-x-0 group-hover:scale-x-100 duration-1000"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quote Section */}
      <section className="py-48 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--accent)]/5 -skew-x-12 translate-x-20"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-8xl font-serif text-[var(--accent)] opacity-10 block mb-12 leading-none">“</span>
            <p className="text-4xl md:text-7xl font-serif leading-[1.15] italic font-light mb-16 tracking-tight">
              In the heart of Mexico City, we refine your brand’s raw potential into the pure gold of digital distinction.
            </p>
            <div className="flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.6em] text-gray-600">
              <div className="w-16 h-[1px] bg-white/10"></div>
              <span>The Sassy Philosophy</span>
              <div className="w-16 h-[1px] bg-white/10"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Luxury Call to Action */}
      <section className="h-[70vh] flex items-center justify-center relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070" 
          alt="Gastronomy" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-8xl font-serif tracking-tighter">Ready for the <br/><span className="italic text-[var(--accent)] opacity-80">Transformation?</span></h2>
            <button 
              onClick={() => setIsConsultModalOpen(true)}
              className="bg-white text-black px-16 py-6 uppercase tracking-[0.5em] text-[11px] font-black hover:bg-[var(--accent)] hover:text-white transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{ borderRadius: 'var(--btn-radius)' }}
            >
              Schedule a Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}