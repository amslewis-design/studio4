'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useScroll, useSpring, useAnimationFrame } from 'framer-motion';
import { PortfolioItem } from '@/lib/types';
import ParallaxCard from './ParallaxCard';

interface HorizontalGalleryProps {
  items: PortfolioItem[];
  activeFilter: string;
}

export default function HorizontalGallery({ items, activeFilter }: HorizontalGalleryProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [autoScrollX, setAutoScrollX] = useState(0);
  
  // Filter items
  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter((item) => item.category === activeFilter);

  // Scroll logic
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Convert vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  
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

  // Auto-scroll animation
  useAnimationFrame((_t) => {
    if (isAutoScrolling && scrollRef.current && !isMobile) {
      // Slow automatic scroll - moves 20px per second
      const scrollSpeed = 0.02; // Adjust this value to change speed
      setAutoScrollX((prev) => {
        const maxScroll = scrollRef.current?.scrollWidth || 0;
        const viewportWidth = window.innerWidth;
        const newX = prev - scrollSpeed;
        
        // Reset when we've scrolled through all items
        if (Math.abs(newX) >= (maxScroll - viewportWidth) * 0.85) {
          return 0;
        }
        return newX;
      });
    }
  });

  // Pause auto-scroll on user interaction
  useEffect(() => {
    const handleScroll = () => {
      setIsAutoScrolling(false);
      // Resume after 5 seconds of inactivity
      setTimeout(() => setIsAutoScrolling(true), 5000);
    };

    const handleMouseEnter = () => setIsAutoScrolling(false);
    const handleMouseLeave = () => setIsAutoScrolling(true);

    if (targetRef.current) {
      targetRef.current.addEventListener('scroll', handleScroll);
      targetRef.current.addEventListener('mouseenter', handleMouseEnter);
      targetRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener('scroll', handleScroll);
        targetRef.current.removeEventListener('mouseenter', handleMouseEnter);
        targetRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

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

  // Desktop View: Scroll Jack with auto-scroll
  const ghostHeight = `${Math.max(200, filteredItems.length * 60)}vh`;

  return (
    <section ref={targetRef} className="relative bg-[#1a1a1a]" style={{ height: ghostHeight }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div 
          ref={scrollRef}
          style={{ 
            x: isAutoScrolling ? autoScrollX : smoothX 
          }} 
          className="flex pl-[5vw] pr-[5vw]"
        >
          {filteredItems.map((item) => (
            <ParallaxCard 
              key={item.id} 
              item={item}
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
         <div className="text-white text-[10px] uppercase tracking-[0.3em]">
           {isAutoScrolling ? 'Auto-scrolling...' : 'Scroll to Explore'}
         </div>
      </div>
    </section>
  );
}
