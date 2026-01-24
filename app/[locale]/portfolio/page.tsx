'use client';

import { useState, useEffect } from 'react';
import { PortfolioItem } from '@/lib/types';
import { storageService } from '@/lib/services/storageService';
import PortfolioFilters from '@/components/portfolio/PortfolioFilters';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { motion } from 'framer-motion';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = storageService.getPortfolio();
        setPortfolio(data);
      } catch (error) {
        console.error('Failed to load portfolio:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-12 sm:py-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6">
            Our Portfolio
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Explore our latest projects and see how we transform spaces into
            unforgettable experiences.
          </p>
        </motion.div>
      </div>

      {/* Filters and Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8 sm:mb-12">
          <PortfolioFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-400">Loading portfolio...</div>
          </div>
        ) : portfolio.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-400 text-center">
              <p className="text-lg mb-2">No portfolio items yet</p>
              <p className="text-sm">Check back soon for our latest work</p>
            </div>
          </div>
        ) : (
          <PortfolioGrid items={portfolio} activeFilter={activeFilter} />
        )}
      </div>
    </div>
  );
}
