'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import { PortfolioItem } from '@/lib/types';
import ParallaxCard from './ParallaxCard';

interface HorizontalGalleryProps {
  items: PortfolioItem[];
  activeFilter: string;
}

export default function HorizontalGallery({ items, activeFilter }: HorizontalGalleryProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Filter items
  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter((item) => item.category === activeFilter);

  // Scroll logic
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Convert vertical scroll to horizontal movement
  // We need to calculate the actual width to scroll accurately
  // Standard approximation: Scroll 100vh vertically = 100vw horizontally (ish)
  // Logic: 0% scroll = 0% x, 100% scroll = -(totalWidth - viewportWidth)
  
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"]);
  
  // Smooth out the scroll
  const smoothX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mobile check for conditional rendering
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    // Mobile View: Standard Horizontal Snap Scroll (Native)
    return (
      <div className="flex overflow-x-auto gap-4 px-6 py-10 snap-x snap-mandatory hide-scrollbar">
        {filteredItems.map((item) => (
          <div key={item.id} className="snap-center shrink-0 w-[85vw] h-[75vh]">
            <ParallaxCard item={item} />
          </div>
        ))}
      </div>
    );
  }

  // Desktop View: Scroll Jack
  // Height calculation: (number of items * item width) / generic divisor + viewport height
  // This estimate allows the scroll container to be deep enough to scroll through all items
  const ghostHeight = `${Math.max(200, filteredItems.length * 60)}vh`;

  return (
    <section ref={targetRef} className="relative bg-[#1a1a1a]" style={{ height: ghostHeight }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div 
          ref={scrollRef}
          style={{ x: smoothX }} 
          className="flex gap-16 pl-[10vw] pr-[10vw]"
        >
          {filteredItems.map((item) => (
            <ParallaxCard 
              key={item.id} 
              item={item} 
              containerScrollProgress={scrollYProgress}
            />
          ))}
          {/* Decorative end spacer */}
          <div className="flex-shrink-0 w-[45vh] h-[80vh] flex items-center justify-center border border-white/5 opacity-30">
            <span className="text-[var(--accent)] text-[10px] uppercase tracking-[0.5em] rotate-90">
              End of Gallery
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="fixed bottom-12 left-12 z-50 pointer-events-none mix-blend-difference">
         <div className="text-white text-[10px] uppercase tracking-[0.3em] animate-pulse">
           Scroll to Explore
         </div>
      </div>
    </section>
  );
}
