'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Asset } from '@/lib/types';

interface ImagePreviewModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImagePreviewModal({
  asset,
  isOpen,
  onClose,
}: ImagePreviewModalProps) {
  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!asset) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[210] w-10 h-10 flex items-center justify-center text-[#FC7CA4] hover:text-white transition-colors"
            aria-label="Close preview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            {/* Image */}
            <div className="flex-1 overflow-auto bg-black/50 rounded-sm flex items-center justify-center">
              <img
                src={asset.url}
                alt={asset.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Metadata footer */}
            <div className="bg-neutral-900 border border-t-0 border-white/10 p-6 rounded-b-sm">
              <h3 className="text-lg font-bold text-white mb-2">{asset.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[9px] uppercase tracking-widest">
                <div>
                  <p className="text-gray-600 mb-1">Created</p>
                  <p className="text-gray-300">{asset.createdAt || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Type</p>
                  <p className="text-gray-300">{asset.type || 'Image'}</p>
                </div>
                {asset.cloudinaryId && (
                  <div className="md:col-span-2">
                    <p className="text-gray-600 mb-1">Asset ID</p>
                    <p className="text-gray-300 break-all font-mono text-[8px]">{asset.cloudinaryId}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Add React import at the top
import React from 'react';
