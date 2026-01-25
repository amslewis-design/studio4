'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCarouselProps {
  images: string[];
  interval?: number;
  opacity?: number;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  images,
  interval = 5000,
  opacity = 0.4,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Carousel image ${currentIndex}`}
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover grayscale"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2.5,
            ease: 'easeOut',
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;
