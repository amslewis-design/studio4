'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroSlideshowProps {
  images: string[];
  interval?: number;
  opacity?: number;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
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
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={`Slideshow image ${index}`}
          loading={index === 0 ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover grayscale"
          animate={{
            opacity: index === currentIndex ? opacity : 0,
          }}
          transition={{
            duration: 2.5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default HeroSlideshow;
