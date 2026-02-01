'use client';

import { useState, useEffect } from 'react';
import { PortfolioItem } from '@/lib/types';
import { storageService } from '@/lib/services/storageService';
import PortfolioFilters from '@/components/portfolio/PortfolioFilters';
import HorizontalGallery from '@/components/portfolio/HorizontalGallery';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';

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
    <>
      <Navbar isHomepage={false} />
      <div className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#FC7CA4] selection:text-black">
        <div className="noise-overlay" />
        
        {/* Filters - Sticky Positioning */}
        <div className="fixed top-24 left-0 right-0 z-40 flex justify-center pointer-events-none">
           <div className="bg-[#1a1a1a]/80 backdrop-blur-md px-8 py-4 rounded-full border border-white/5 pointer-events-auto shadow-2xl">
              <PortfolioFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
           </div>
        </div>

        {/* Gallery */}
        {isLoading ? (
          <div className="flex h-screen items-center justify-center">
            <div className="text-[var(--accent)] animate-pulse uppercase tracking-widest text-xs">Loading artifacts...</div>
          </div>
        ) : portfolio.length === 0 ? (
          <div className="flex h-screen items-center justify-center">
            <div className="text-gray-400 text-center">
              <p className="text-lg mb-2">No portfolio items yet</p>
              <p className="text-sm">Check back soon for our latest work</p>
            </div>
          </div>
        ) : (
          <HorizontalGallery items={portfolio} activeFilter={activeFilter} />
        )}
      </div>
    </>
  );
}
