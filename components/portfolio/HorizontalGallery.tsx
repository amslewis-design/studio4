'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { PortfolioItem } from '@/lib/types';
import ParallaxCard from './ParallaxCard';

interface HorizontalGalleryProps {
  items: PortfolioItem[];
  activeFilter: string;
}

export default function HorizontalGallery({ items, activeFilter }: HorizontalGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  
  // Filter items
  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter((item) => item.category === activeFilter);

  // Duplicate items for seamless loop
  const loopedItems = [...filteredItems, ...filteredItems];

  // Mobile check
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Continuous auto-scroll animation
  useEffect(() => {
    if (isMobile || filteredItems.length === 0 || isPaused) return;

    const cardWidth = window.innerHeight * 0.45; // 45vh width per card
    const totalWidth = cardWidth * filteredItems.length;
    const duration = filteredItems.length * 5; // 5 seconds per card

    const animate = async () => {
      while (!isPaused) {
        await controls.start({
          x: -totalWidth,
          transition: {
            duration: duration,
            ease: 'linear',
          },
        });
        // Reset to start instantly
        controls.set({ x: 0 });
      }
    };

    animate();

    return () => {
      controls.stop();
    };
  }, [isMobile, filteredItems.length, controls, isPaused]);

  // Pause/resume functions
  const handleMouseEnter = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (isMobile) {
    // Mobile View: Standard Horizontal Snap Scroll (Native)
    return (
      <div className="flex overflow-x-auto px-6 py-10 snap-x snap-mandatory hide-scrollbar">
        {filteredItems.map((item) => (
          <div key={item.id} className="snap-center shrink-0 w-[85vw] h-[75vh]">
            <ParallaxCard item={item} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="relative bg-[#1a1a1a] h-screen overflow-hidden">
      <div className="noise-overlay" />
      
      {/* Gallery Track */}
      <div className="flex h-screen items-center overflow-hidden">
        <motion.div 
          ref={scrollRef}
          animate={controls}
          className="flex pl-[27.5vh]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {loopedItems.map((item, index) => (
            <ParallaxCard 
              key={`${item.id}-${index}`}
              item={item}
            />
          ))}
        </motion.div>
      </div>

      {/* Status Indicator */}
      <div className="fixed bottom-12 left-12 z-50 pointer-events-none">
        <div className="text-white/60 text-[10px] uppercase tracking-[0.3em]">
          {filteredItems.length} Projects
          {!isPaused && <span className="ml-3 text-[var(--accent)] animate-pulse">●</span>}
          {isPaused && <span className="ml-3 text-white/40">Paused</span>}
        </div>
      </div>

      {/* Interaction Hint */}
      <div className="fixed bottom-12 right-12 z-50 pointer-events-none">
        <div className="text-white/40 text-[10px] uppercase tracking-[0.3em]">
          Hover to Pause
        </div>
      </div>
    </section>
  );
}
