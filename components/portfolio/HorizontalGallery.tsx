'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { PortfolioItem } from '@/lib/types';
import ParallaxCard from './ParallaxCard';

interface HorizontalGalleryProps {
  items: PortfolioItem[];
  activeFilter: string;
}

export default function HorizontalGallery({ items, activeFilter }: HorizontalGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  
  // Filter items
  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter((item) => item.category === activeFilter);

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

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || isMobile || filteredItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, isMobile, filteredItems.length]);

  // Animate to current index
  useEffect(() => {
    if (isMobile) return;
    
    const cardWidth = window.innerHeight * 0.45; // 45vh width per card
    const targetX = -currentIndex * cardWidth;
    
    animate(x, targetX, {
      type: 'spring',
      stiffness: 100,
      damping: 30,
    });
  }, [currentIndex, x, isMobile]);

  // Navigation functions
  const goToNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const goToPrev = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const goToIndex = (index: number) => {
    setIsAutoScrolling(false);
    setCurrentIndex(index);
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
          style={{ x }} 
          className="flex pl-[27.5vh]"
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
        >
          {filteredItems.map((item) => (
            <ParallaxCard 
              key={item.id} 
              item={item}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 group"
        aria-label="Previous"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 group"
        aria-label="Next"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        {filteredItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[var(--accent)] w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Status Indicator */}
      <div className="fixed bottom-12 left-12 z-50 pointer-events-none">
        <div className="text-white/60 text-[10px] uppercase tracking-[0.3em]">
          {currentIndex + 1} / {filteredItems.length}
          {isAutoScrolling && <span className="ml-3 text-[var(--accent)]">●</span>}
        </div>
      </div>
    </section>
  );
}
