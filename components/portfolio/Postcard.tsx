'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/app/constants/portfolio';

interface PostcardProps {
  project: Project;
}

export function Postcard({ project }: PostcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group relative h-[420px] w-full perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)} // For mobile interaction
    >
      <div 
        className={`relative h-full w-full transition-all duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : 'rotate-y-0'
        }`}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full backface-hidden rounded-sm overflow-hidden shadow-lg bg-stone-100/10">
          <div className="relative h-full w-full">
            <Image
              src={project.imageUrl}
              alt={project.clientName}
              fill
              className="object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-90" />
            
            {/* Stamp - Top Right */}
            <div className="absolute top-4 right-4 h-16 w-16 border-2 border-stone-100/50 rounded-full flex items-center justify-center rotate-12 opacity-80 backdrop-blur-sm">
              <span className="font-serif text-stone-100 text-xs tracking-widest">{project.year}</span>
            </div>

            {/* Content - Bottom */}
            <div className="absolute bottom-0 left-0 p-6 w-full text-left">
              <h3 className="font-serif text-2xl text-stone-50 mb-1">{project.clientName}</h3>
              <p className="font-sans text-xs tracking-[0.2em] text-stone-300 uppercase">{project.location}</p>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full backface-hidden rotate-y-180 bg-[#fdfbf7] rounded-sm shadow-xl p-6 flex flex-col justify-between border border-stone-200">
            {/* Paper texture overlay could go here */}
            
            <div className="flex-1 flex gap-4 h-full">
                {/* Left Side: Message */}
                <div className="flex-1 flex flex-col justify-center space-y-4 pr-4 border-r border-stone-200/50 border-dashed">
                    <p className="font-serif italic text-stone-600 text-sm leading-relaxed">
                        "{project.testimonial}"
                    </p>
                    <p className="font-sans text-xs font-bold text-stone-400 uppercase tracking-wider">
                         — {project.testimonialAuthor}
                    </p>
                </div>

                {/* Right Side: Address/Stamp Area */}
                <div className="w-1/3 flex flex-col items-center pt-2">
                    {/* Stamp Placeholder */}
                    <div className="w-16 h-20 border border-stone-300 border-dashed bg-stone-100 flex items-center justify-center mb-12 self-end mr-2">
                        <span className="text-[10px] text-stone-400 uppercase rotate-45">Postage</span>
                    </div>

                    {/* Services Tags */}
                    <div className="w-full mt-auto">
                        <div className="flex flex-wrap gap-2 justify-end">
                            {project.services.map((service) => (
                                <span key={service} className="text-[9px] uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-1 rounded-sm">
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Branding */}
            <div className="w-full text-center mt-4 pt-4 border-t border-stone-100">
                <span className="font-serif text-stone-300 text-xs italic">Wanderlust Creative Co.</span>
            </div>
        </div>
      </div>
    </div>
  );
}
