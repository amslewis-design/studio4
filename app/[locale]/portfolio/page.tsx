'use client';

import React from 'react';
import { Postcard } from '@/components/portfolio/Postcard';
import { PORTFOLIO_PROJECTS } from '@/app/constants/portfolio';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-stone-50 pb-20 relative">
      {/* Sticky Header / Hero Section */}
      <section className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 py-12 px-6 md:px-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-6xl text-stone-900 leading-tight">
              Curating digital experiences for the world's most extraordinary destinations.
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-sans text-sm tracking-widest uppercase text-stone-500 mb-2">
              Selected Works
            </p>
            <p className="font-serif italic text-stone-400">
              2023 — 2026
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {PORTFOLIO_PROJECTS.map((project) => (
            <Postcard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Footer / Contact teaser */}
      <section className="px-6 py-24 text-center">
        <p className="font-serif text-2xl text-stone-600 italic mb-6">
          "The journey is the destination."
        </p>
        <button className="px-8 py-3 bg-stone-900 text-stone-50 font-sans text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors duration-300">
          Start a Project
        </button>
      </section>
    </main>
  );
}
