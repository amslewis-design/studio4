'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { storageService } from '@/lib/services/storageService';

interface AssetSelectorProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export default function AssetSelector({ onSelect, onClose }: AssetSelectorProps) {
  const [assets, setAssets] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch assets from storage
    const storedAssets = storageService.getAssets();
    // Add placeholder assets if empty
    if (storedAssets.length === 0) {
      const placeholders = [
        { id: 'p1', name: 'Ritz Lobby', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800' },
        { id: 'p2', name: 'Fine Dining', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800' },
        { id: 'p3', name: 'Luxury Hotel', url: 'https://images.unsplash.com/photo-1595950653106-6c82330c627f?auto=format&fit=crop&q=80&w=800' },
        { id: 'p4', name: 'Restaurant', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800' },
      ];
      setAssets(placeholders);
    } else {
      setAssets(storedAssets);
    }
  }, []);

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-sm p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif text-white">Digital Vault</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/10 px-6 py-3 text-white outline-none focus:border-[#FC7CA4] transition-all rounded-sm"
            />
          </div>

          {/* Asset Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAssets.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 text-sm uppercase tracking-widest">No assets found</p>
              </div>
            ) : (
              filteredAssets.map((asset) => (
                <motion.button
                  key={asset.id}
                  onClick={() => {
                    onSelect(asset.url);
                    onClose();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-sm bg-neutral-800 aspect-square border border-white/5 hover:border-[#FC7CA4]/30 transition-all"
                >
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-bold text-center px-4">Select</span>
                  </div>
                  <p className="absolute bottom-0 left-0 right-0 bg-black/80 px-4 py-2 text-[10px] text-white uppercase tracking-widest truncate">
                    {asset.name}
                  </p>
                </motion.button>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
