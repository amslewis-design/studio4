'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getAuthHeaders } from '@/lib/utils/clientAuth';

interface CloudinaryAsset {
  public_id: string;
  url: string;
  width: number;
  height: number;
  format: string;
}

interface ImageSelectorProps {
  selectedImages?: string[];
  onSelect: (images: string[]) => void;
  multiSelect?: boolean;
  maxImages?: number;
}

export default function ImageSelector({
  selectedImages = [],
  onSelect,
  multiSelect = false,
  maxImages = 5,
}: ImageSelectorProps) {
  const [assets, setAssets] = useState<CloudinaryAsset[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set(selectedImages));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const headers = await getAuthHeaders();
        const response = await fetch('/api/assets', { headers });
        
        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }

        const data = await response.json();
        setAssets(data.assets || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load assets');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const handleImageClick = (url: string) => {
    if (multiSelect) {
      const newSelected = new Set(selected);
      if (newSelected.has(url)) {
        newSelected.delete(url);
      } else if (newSelected.size < maxImages) {
        newSelected.add(url);
      }
      setSelected(newSelected);
    } else {
      setSelected(new Set([url]));
      onSelect([url]);
    }
  };

  const handleApply = () => {
    onSelect(Array.from(selected));
  };

  const handleRemoveImage = (url: string) => {
    const newSelected = new Set(selected);
    newSelected.delete(url);
    setSelected(newSelected);
  };

  const filteredAssets = assets.filter(a =>
    a.public_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-black border border-white/10 px-6 py-3 text-white text-sm outline-none focus:border-[#FC7CA4] transition-all rounded-sm"
        />
      </div>

      {/* Selected Images Preview (for multi-select) */}
      {multiSelect && selected.size > 0 && (
        <div className="bg-neutral-900/50 p-6 border border-white/10 rounded-sm space-y-4">
          <h4 className="text-sm uppercase tracking-widest text-gray-400 font-bold">
            Selected ({selected.size}/{maxImages})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from(selected).map((url) => (
              <div key={url} className="relative group">
                <img
                  src={url}
                  alt={`Preview of selected image: ${url.split('/').pop()?.split('.')[0] || 'image'}`}
                  className="w-full h-32 object-cover rounded-sm border border-[#FC7CA4]/50"
                />
                <button
                  onClick={() => handleRemoveImage(url)}
                  className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm uppercase tracking-widest">Loading assets...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-sm">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Asset Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAssets.length === 0 ? (
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-500 text-sm uppercase tracking-widest">
                  {searchQuery ? 'No images found' : 'No images available'}
                </p>
              </div>
            ) : (
              filteredAssets.map((asset) => {
                const isSelected = selected.has(asset.url);
                return (
                  <motion.button
                    key={asset.public_id}
                    onClick={() => handleImageClick(asset.url)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative overflow-hidden rounded-sm aspect-square border-2 transition-all ${
                      isSelected
                        ? 'border-[#FC7CA4] shadow-lg shadow-[#FC7CA4]/30'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <img
                      src={asset.url}
                      alt={asset.public_id}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#FC7CA4]/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-[#FC7CA4] rounded-full flex items-center justify-center text-black font-bold">
                          ✓
                        </div>
                      </div>
                    )}
                    <p className="absolute bottom-0 left-0 right-0 bg-black/80 px-2 py-1 text-[8px] text-white uppercase tracking-widest truncate">
                      {asset.public_id.split('/').pop()}
                    </p>
                  </motion.button>
                );
              })
            )}
          </div>

          {/* Apply Button (for multi-select) */}
          {multiSelect && (
            <button
              onClick={handleApply}
              disabled={selected.size === 0}
              className="w-full py-4 text-black text-xs uppercase tracking-[0.5em] font-black rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: selected.size > 0 ? '#FC7CA4' : '#666666',
              }}
            >
              Apply Images ({selected.size})
            </button>
          )}
        </>
      )}
    </div>
  );
}
