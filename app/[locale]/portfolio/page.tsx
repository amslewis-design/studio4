'use client';

import React from 'react';
import Navbar from '@/app/components/Navbar';
import { Postcard } from '@/components/portfolio/Postcard';
import { PORTFOLIO_PROJECTS } from '@/app/constants/portfolio';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-20 relative">
      <Navbar />
      {/* Sticky Header / Hero Section */}
      <section className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-12 px-6 md:px-12 transition-all duration-300 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight">
              Curating digital experiences for the world's most extraordinary destinations.
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-sans text-sm tracking-widest uppercase text-white/50 mb-2">
              Selected Works
            </p>
            <p className="font-serif italic text-white/40">
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
        <p className="font-serif text-2xl text-white/60 italic mb-6">
          "The journey is the destination."
        </p>
        <button className="px-8 py-3 bg-[var(--accent)] text-white font-sans text-sm tracking-widest uppercase hover:opacity-80 transition-opacity duration-300">
          Start a Project
        </button>
      </section>
    </main>
  );
}
