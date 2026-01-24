'use client';

import { PortfolioItem } from '@/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PortfolioCardProps {
  item: PortfolioItem;
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden bg-[#0a0a0a] border border-[#333333] cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#1a1a1a]">
        <Image
          src={item.imageUrl}
          alt={item.clientName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="space-y-2">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#FC7CA4]">
              {item.category}
            </span>
          </div>

          {/* Client Name */}
          <h3 className="text-lg sm:text-xl font-serif font-semibold text-white group-hover:text-[#FC7CA4] transition-colors duration-300">
            {item.clientName}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
