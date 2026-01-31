'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2.5,
            ease: 'easeOut',
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`Carousel image ${currentIndex}`}
            fill
            priority={currentIndex === 0}
            quality={85}
            className="object-cover grayscale"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;
