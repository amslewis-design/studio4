'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { PortfolioItem } from '@/lib/types';

interface ParallaxCardProps {
  item: PortfolioItem;
  containerScrollProgress?: MotionValue<number>;
}

export default function ParallaxCard({ item, containerScrollProgress }: ParallaxCardProps) {
  // Use local state for hover effects
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 group overflow-hidden bg-neutral-900 border border-white/10"
      style={{
        width: '45vh', // Based on 9:16 ratio relative to height
        height: '80vh', // Significant screen real estate
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pink Accent Border */}
      <div 
        className={`absolute inset-0 border-2 border-[var(--accent)] z-20 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Image Container with Scale Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
          }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        >
          <Image
            src={item.imageUrl}
            alt={item.clientName}
            fill
            className="object-cover"
            sizes="(max-height: 80vh) 45vh"
          />
        </motion.div>
        
        {/* Noise Overlay (reusing global class) */}
        <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10 transform transition-transform duration-500">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">
              {item.category}
            </p>
            <h3 className="text-3xl md:text-4xl font-serif text-white font-light leading-none">
              {item.clientName}
            </h3>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <p className="pt-4 text-gray-400 text-sm font-light leading-relaxed line-clamp-3">
            {item.description}
          </p>
          <div className="pt-6 flex items-center gap-3">
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">View Project</span>
            <div className="h-[1px] w-8 bg-[var(--accent)]" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
