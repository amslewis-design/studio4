'use client';

import { useState, useEffect } from 'react';
import { storageService } from '../lib/services/storageService';
import { Post } from '../lib/types';

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(storageService.getPosts());
  }, []);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen mb-20">
      <div className="mb-20 text-center space-y-4">
        <h1 className="text-6xl font-serif">The Alchemy <span className="italic">Blog</span></h1>
        <p className="text-gray-400 font-light max-w-xl mx-auto uppercase tracking-widest text-xs">Exploring the intersection of luxury hospitality and digital storytelling.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {posts.map(post => (
          <article key={post.id} className="group cursor-pointer">
            <div className="overflow-hidden mb-6 aspect-video bg-neutral-900 border border-white/5">
              <img 
                src={post.image} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                alt={post.title}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-[#FC7CA4]">
                <span>{post.category}</span>
                <span className="w-8 h-[1px] bg-white/20"></span>
                <span className="text-white/40">{post.date}</span>
              </div>
              <h2 className="text-3xl font-serif group-hover:text-[#FC7CA4] transition-colors">{post.title}</h2>
              <div 
                className="text-gray-400 font-light leading-relaxed line-clamp-3 text-sm ql-editor !p-0"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <button className="text-xs uppercase tracking-widest border-b border-[#FC7CA4] pb-1 hover:text-[#FC7CA4] pt-4">Read Article</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;