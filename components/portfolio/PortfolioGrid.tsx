'use client';

import { PortfolioItem } from '@/lib/types';
import PortfolioCard from './PortfolioCard';
import { motion } from 'framer-motion';

interface PortfolioGridProps {
  items: PortfolioItem[];
  activeFilter: string;
}

export default function PortfolioGrid({
  items,
  activeFilter,
}: PortfolioGridProps) {
  const filteredItems =
    activeFilter === 'All'
      ? items
      : items.filter((item) => item.category === activeFilter);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    >
      {filteredItems.map((portfolioItem) => (
        <motion.div key={portfolioItem.id} variants={item}>
          <PortfolioCard item={portfolioItem} />
        </motion.div>
      ))}
    </motion.div>
  );
}
