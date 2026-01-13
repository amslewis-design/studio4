'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SiteSettings } from '@/lib/types';
import ImageSelector from './ImageSelector';

interface StyleManagerProps {
  initialSettings: SiteSettings;
  onSave: (settings: SiteSettings) => void;
}

export default function StyleManager({ initialSettings, onSave }: StyleManagerProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saved, setSaved] = useState(false);
  const [showHeroSelector, setShowHeroSelector] = useState(false);
  const [showGallerySelector, setShowGallerySelector] = useState(false);

  const handleColorChange = (key: keyof SiteSettings, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleHeroImageSelect = (images: string[]) => {
    setSettings({ ...settings, heroImage: images[0] || '' });
    setShowHeroSelector(false);
  };

  const handleGalleryImagesSelect = (images: string[]) => {
    setSettings({ ...settings, galleryImages: images });
    setShowGallerySelector(false);
  };

  const handleRemoveHeroImage = () => {
    setSettings({ ...settings, heroImage: '' });
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updated = [...(settings.galleryImages || [])];
    updated.splice(index, 1);
    setSettings({ ...settings, galleryImages: updated });
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

      {/* Image Management Section */}
      <div className="bg-neutral-900/50 p-10 border border-white/5 rounded-sm space-y-8">
        <div>
          <h3 className="text-2xl font-serif italic mb-4 text-white">Visual Assets</h3>
          <p className="text-[10px] uppercase tracking-widest text-gray-500">Configure images for your website hero and gallery sections.</p>
        </div>

        {/* Hero Image */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Hero Image</label>
          {settings.heroImage ? (
            <div className="relative group">
              <img
                src={settings.heroImage}
                alt="Hero"
                className="w-full h-48 object-cover rounded-sm border border-white/10"
              />
              <button
                onClick={handleRemoveHeroImage}
                className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="w-full h-48 bg-black border-2 border-dashed border-white/10 rounded-sm flex items-center justify-center">
              <span className="text-gray-500 text-sm">No hero image selected</span>
            </div>
          )}
          <button
            onClick={() => setShowHeroSelector(!showHeroSelector)}
            className="w-full py-3 text-white text-xs uppercase tracking-[0.3em] font-bold border border-white/10 hover:border-[#FC7CA4] rounded-sm transition-all"
          >
            {settings.heroImage ? 'Change' : 'Select'} Hero Image
          </button>
          {showHeroSelector && (
            <ImageSelector
              selectedImages={settings.heroImage ? [settings.heroImage] : []}
              onSelect={handleHeroImageSelect}
              multiSelect={false}
            />
          )}
        </div>

        {/* Gallery Images */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Gallery Images</label>
          {settings.galleryImages && settings.galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {settings.galleryImages.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-32 object-cover rounded-sm border border-white/10"
                  />
                  <button
                    onClick={() => handleRemoveGalleryImage(index)}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full py-8 bg-black border-2 border-dashed border-white/10 rounded-sm flex items-center justify-center">
              <span className="text-gray-500 text-sm">No gallery images selected</span>
            </div>
          )}
          <button
            onClick={() => setShowGallerySelector(!showGallerySelector)}
            className="w-full py-3 text-white text-xs uppercase tracking-[0.3em] font-bold border border-white/10 hover:border-[#FC7CA4] rounded-sm transition-all"
          >
            {settings.galleryImages && settings.galleryImages.length > 0 ? 'Update' : 'Select'} Gallery Images
          </button>
          {showGallerySelector && (
            <ImageSelector
              selectedImages={settings.galleryImages || []}
              onSelect={handleGalleryImagesSelect}
              multiSelect={true}
              maxImages={10}
            />
          )}
        </div>

        {/* Hero Display Settings */}
        <div className="pt-8 border-t border-white/5">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-serif italic mb-2 text-white">Hero Display Settings</h4>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Choose how your hero image will be displayed.</p>
            </div>

            {/* Radio Button Group */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold block">Display Mode</label>
              <div className="space-y-2">
                {[
                  { label: 'Static Image', value: 'static' },
                  { label: 'Carousel', value: 'carousel' },
                  { label: 'Slideshow', value: 'slideshow' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="heroMode"
                      value={option.value}
                      checked={settings.heroMode === option.value}
                      onChange={(e) => setSettings({ ...settings, heroMode: e.target.value as 'static' | 'carousel' | 'slideshow' })}
                      className="w-4 h-4 accent-[#FC7CA4]"
                    />
                    <span className="text-white uppercase tracking-widest text-sm group-hover:text-[#FC7CA4] transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Conditional Transition Interval Input */}
            {(settings.heroMode === 'carousel' || settings.heroMode === 'slideshow') && (
              <div className="space-y-3 pt-4 border-t border-white/10">
                <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Transition Interval (ms)</label>
                <input
                  type="number"
                  min="1000"
                  max="10000"
                  step="100"
                  value={settings.heroCarouselInterval || 5000}
                  onChange={(e) => setSettings({ ...settings, heroCarouselInterval: parseInt(e.target.value) })}
                  className="w-full bg-black border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-[#FC7CA4] transition-all rounded-sm font-mono"
                  placeholder="5000"
                />
                <p className="text-[9px] uppercase tracking-widest text-gray-600">Time between slide changes</p>
              </div>
            )}

            {/* Validation Warning */}
            {settings.heroMode !== 'static' && (!settings.galleryImages || settings.galleryImages.length < 2) && (
              <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-sm">
                <p className="text-yellow-400 text-sm">Add at least 2 gallery images to use Carousel or Slideshow modes</p>
              </div>
            )}
          </div>
        </div>

        {/* Animation Settings */}
        <div className="pt-8 border-t border-white/5">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-serif italic mb-2 text-white">Animation Settings</h4>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Control intro animation behavior.</p>
            </div>

            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={settings.skipIntroAnimation || false}
                onChange={(e) => setSettings({ ...settings, skipIntroAnimation: e.target.checked })}
                className="w-5 h-5 accent-[#FC7CA4] cursor-pointer"
              />
              <span className="text-white uppercase tracking-widest text-sm group-hover:text-[#FC7CA4] transition-colors">
                Skip Intro Animation
              </span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-white/5">
          <button
            onClick={handleSave}
            className="w-full py-6 text-black text-xs uppercase tracking-[0.5em] font-black shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all rounded-sm"
            style={{ backgroundColor: settings.secondaryColor }}
          >
            {saved ? '✓ All Changes Applied' : 'Apply All Changes'}
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
