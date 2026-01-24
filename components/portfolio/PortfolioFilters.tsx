'use client';

import { motion } from 'framer-motion';

interface PortfolioFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const CATEGORIES = ['All', 'Hotel', 'Restaurant', 'Lifestyle'];

export default function PortfolioFilters({
  activeFilter,
  onFilterChange,
}: PortfolioFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
      {CATEGORIES.map((category) => (
        <motion.button
          key={category}
          onClick={() => onFilterChange(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
            activeFilter === category
              ? 'bg-[#FC7CA4] text-white border border-[#FC7CA4]'
              : 'bg-transparent text-gray-300 border border-[#333333] hover:border-[#FC7CA4] hover:text-[#FC7CA4]'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
