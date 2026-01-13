'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showCurtain, setShowCurtain] = useState(false);

  useEffect(() => {
    // Wait 3000ms for GIF to play, then trigger curtain
    const timer = setTimeout(() => {
      setShowCurtain(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // When curtain starts, wait for animation to complete (600ms) then call onComplete
    if (showCurtain) {
      const timer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [showCurtain, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* GIF */}
      <motion.img
        src="/sassyanimation.gif"
        alt="Intro animation"
        className="w-96 h-96 object-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Left Curtain Panel */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-white"
        initial={{ translateX: 0 }}
        animate={showCurtain ? { translateX: '-100%' } : { translateX: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Right Curtain Panel */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-white"
        initial={{ translateX: 0 }}
        animate={showCurtain ? { translateX: '100%' } : { translateX: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
