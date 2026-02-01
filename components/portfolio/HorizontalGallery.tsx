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
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  
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

  // Continuous auto-scroll animation || !isPlaying) return;

    const cardWidth = window.innerHeight * 0.45; // 45vh width per card
    const totalWidth = cardWidth * items.length;
    const duration = items.length * 5; // 5 seconds per card

    const animate = async () => {
      while (isPlaying) {
        await controls.start({
          x: -totalWidth,
          transition: {
            duration: duration,
            ease: 'linear',
          },
        });
        // Reset to start instantly
        controls.set({ x: 0 });
        setCurrentPosition(0);
      }
    };

    animate();

    return () => {
      controls.stop();
    };
  }, [isMobile, items.length, controls, isPlaying
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
// Manual navigation functions
  const handlePrevious = () => {
    if (isMobile) return;
    setIsPlaying(false);
    const cardWidth = window.innerHeight * 0.45;
    const newPosition = currentPosition + cardWidth;
    setCurrentPosition(newPosition);
    controls.start({
      x: newPosition,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    });
  };

  const handleNext = () => {
    if (isMobile) return;
    setIsPlaying(false);
    const cardWidth = window.innerHeight * 0.45;
    const totalWidth = cardWidth * items.length;
    const newPosition = currentPosition - cardWidth;
    
    // If we've gone past the end, reset to start
    if (Math.abs(newPosition) >= totalWidth) {
      setCurrentPosition(0);
      controls.set({ x: 0 });
    } else {
      setCurrentPosition(newPosition);
      controls.start({
        x: newPosition,
        transition: {
          duration: 0.6,
          ease: [0.33, 1, 0.68, 1],
        },

      {/* Navigation Controls */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-110"
          aria-label="Previous project"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-16 h-16 rounded-full border-2 border-[var(--accent)] bg-black/60 backdrop-blur-sm flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"></rect>
              <rect x="14" y="4" width="4" height="16" rx="1"></rect>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="8 5 19 12 8 19"></polygon>
            </svg>
          )}
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-110"
          aria-label="Next project"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      });
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      controls.stop();
    }
  };

  
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
