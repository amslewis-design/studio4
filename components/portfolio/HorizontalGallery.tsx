'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { PortfolioItem } from '@/lib/types';
import ParallaxCard from './ParallaxCard';

interface HorizontalGalleryProps {
  items: PortfolioItem[];
}

export default function HorizontalGallery({ items }: HorizontalGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [centeredIndex, setCenteredIndex] = useState(0);
  
  // Duplicate items for seamless loop
  const loopedItems = [...items, ...items];

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
    if (isMobile || items.length === 0) return;

    const cardWidth = window.innerHeight * 0.45; // 45vh width per card
    const totalWidth = cardWidth * items.length;
    const duration = items.length * 5; // 5 seconds per card

    const animate = async () => {
      while (true) {
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
  }, [isMobile, items.length, controls]);

  // Track centered item
  useEffect(() => {
    if (isMobile || items.length === 0) return;

    const updateCenteredItem = () => {
      if (!scrollRef.current) return;
      
      const cardWidth = window.innerHeight * 0.45;
      const offsetLeft = window.innerHeight * 0.275; // pl-[27.5vh]
      const centerX = window.innerWidth / 2;
      
      // Get current animation x position
      const computedStyle = window.getComputedStyle(scrollRef.current);
      const matrix = new DOMMatrix(computedStyle.transform);
      const currentX = matrix.m41;
      
      // Calculate which card is closest to center
      const adjustedCenter = centerX - offsetLeft - currentX;
      const index = Math.round(adjustedCenter / cardWidth) % items.length;
      const normalizedIndex = ((index % items.length) + items.length) % items.length;
      
      setCenteredIndex(normalizedIndex);
    };

    const interval = setInterval(updateCenteredItem, 100);
    return () => clearInterval(interval);
  }, [isMobile, items.length]);

  if (isMobile) {
    // Mobile View: Standard Horizontal Snap Scroll (Native)
    return (
      <div className="flex overflow-x-auto px-6 py-10 snap-x snap-mandatory hide-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="snap-center shrink-0 w-[85vw] h-[75vh]">
            <ParallaxCard item={item} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="relative bg-[#1a1a1a] h-screen overflow-hidden">
      {/* Gallery Track */}
      <div className="flex h-screen items-center overflow-hidden">
        <motion.div 
          ref={scrollRef}
          animate={controls}
          className="flex pl-[27.5vh]"
        >
          {loopedItems.map((item, index) => {
            const actualIndex = index % items.length;
            const isCentered = actualIndex === centeredIndex;
            return (
              <ParallaxCard 
                key={`${item.id}-${index}`}
                item={item}
                isCentered={isCentered}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
