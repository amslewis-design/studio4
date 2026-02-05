'use client';

import { useState, useEffect } from 'react';
import { PortfolioItem } from '@/lib/types';
import { storageService } from '@/lib/services/storageService';
import HorizontalGallery from '@/components/portfolio/HorizontalGallery';
import Navbar from '@/app/components/Navbar';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
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
          <HorizontalGallery items={portfolio} />
        )}
      </div>
    </>
  );
}
