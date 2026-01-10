'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SiteSettings } from '@/lib/types';

interface StyleManagerProps {
  initialSettings: SiteSettings;
  onSave: (settings: SiteSettings) => void;
}

export default function StyleManager({ initialSettings, onSave }: StyleManagerProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saved, setSaved] = useState(false);

  const handleColorChange = (key: keyof SiteSettings, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    onSave(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto space-y-8"
    >
      {/* Color Palette Section */}
      <div className="bg-neutral-900/50 p-10 border border-white/5 rounded-sm space-y-8">
        <div>
          <h3 className="text-2xl font-serif italic mb-4 text-white">Brand Palette</h3>
          <p className="text-[10px] uppercase tracking-widest text-gray-500">Customize the visual identity of your digital presence.</p>
        </div>

        {/* Primary Color */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Primary Color</label>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="w-full bg-black border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-[#FC7CA4] transition-all rounded-sm font-mono"
                placeholder="#1a1a1a"
              />
            </div>
            <div
              className="w-20 h-20 rounded-sm border-2 border-white/10"
              style={{ backgroundColor: settings.primaryColor }}
            ></div>
          </div>
        </div>

        {/* Secondary Color */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Secondary Color (Accent)</label>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <input
                type="text"
                value={settings.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                className="w-full bg-black border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-[#FC7CA4] transition-all rounded-sm font-mono"
                placeholder="#FC7CA4"
              />
            </div>
            <div
              className="w-20 h-20 rounded-sm border-2 border-white/10"
              style={{ backgroundColor: settings.secondaryColor }}
            ></div>
          </div>
        </div>

        {/* Background Color */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Background Color</label>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <input
                type="text"
                value={settings.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="w-full bg-black border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-[#FC7CA4] transition-all rounded-sm font-mono"
                placeholder="#0a0a0a"
              />
            </div>
            <div
              className="w-20 h-20 rounded-sm border-2 border-white/10"
              style={{ backgroundColor: settings.backgroundColor }}
            ></div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-white/5">
          <button
            onClick={handleSave}
            className="w-full py-6 text-black text-xs uppercase tracking-[0.5em] font-black shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all rounded-sm"
            style={{ backgroundColor: settings.secondaryColor }}
          >
            {saved ? '✓ Styles Applied' : 'Apply Brand Styles'}
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-neutral-900/50 p-10 border border-white/5 rounded-sm space-y-6">
        <h3 className="text-2xl font-serif italic text-white">Live Preview</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-sm"
              style={{ backgroundColor: settings.primaryColor }}
            ></div>
            <span className="text-sm text-gray-400">Primary</span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-sm"
              style={{ backgroundColor: settings.secondaryColor }}
            ></div>
            <span className="text-sm text-gray-400">Secondary (Accent)</span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-sm"
              style={{ backgroundColor: settings.backgroundColor }}
            ></div>
            <span className="text-sm text-gray-400">Background</span>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#FC7CA4] text-black px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold shadow-lg"
          >
            Styles updated successfully
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
