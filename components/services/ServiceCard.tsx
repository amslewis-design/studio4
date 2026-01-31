'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
  className?: string;
  image?: string;
  sigil?: string; // e.g. "✦", "❂", "✧"
}

export default function ServiceCard({ title, description, index, className = "", image, sigil }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className={`group relative flex flex-col justify-end p-8 md:p-10 min-h-[400px] border border-white/5 hover:border-[#D4AF37]/40 transition-colors duration-500 overflow-hidden ${className}`}
    >
      {/* Background Image (Optional) */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Sigil Marker */}
        <div className="text-[#FC7CA4] text-2xl group-hover:text-[#D4AF37] transition-colors duration-500 mb-2 font-serif">
          {sigil || "✦"}
        </div>

        <h3 className="text-3xl font-serif font-thin text-white group-hover:text-[#D4AF37] transition-colors duration-300 tracking-wide">
          {title}
        </h3>
        
        <div className="w-12 h-[1px] bg-white/20 group-hover:bg-[#D4AF37] transition-colors duration-500" />
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300 font-light max-w-sm">
          {description}
        </p>
      </div>
      
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FC7CA4]/0 via-transparent to-[#D4AF37]/0 group-hover:to-[#D4AF37]/10 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}
