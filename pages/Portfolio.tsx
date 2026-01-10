
'use client';

import { useState, useEffect } from 'react';
import { storageService } from '../lib/services/storageService';
import { PortfolioItem } from '../lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    setItems(storageService.getPortfolio());
  }, []);

  const filteredItems = filter === 'All' ? items : items.filter(i => i.category === filter);

  return (
    <div className="pt-40 px-6 max-w-7xl mx-auto min-h-screen" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="mb-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-serif mb-10 tracking-tight"
        >
          Our Collections
        </motion.h1>
        <div className="flex justify-center flex-wrap gap-8 text-[11px] uppercase tracking-[0.4em] text-gray-500 font-medium">
          {['All', 'Hotel', 'Restaurant', 'Lifestyle'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`transition-all duration-500 ${filter === cat ? "text-[var(--accent)] border-b border-[var(--accent)] pb-1" : "hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 p-1 rounded-sm shadow-inner">
        <AnimatePresence mode="popLayout">
          {filteredItems.map(item => (
            <motion.div 
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden aspect-[3/4] bg-neutral-900 cursor-pointer"
            >
              <img 
                src={item.imageUrl} 
                alt={item.clientName} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10 transform translate-y-4 group-hover:translate-y-0">
                <span className="text-[var(--accent)] text-[10px] uppercase tracking-[0.5em] mb-4 font-black">{item.category}</span>
                <h3 className="text-3xl font-serif mb-4 leading-none">{item.clientName}</h3>
                <p className="text-sm font-light text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                  {item.description}
                </p>
                <div className="mt-8 w-12 h-[1px] bg-[var(--accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Portfolio;
