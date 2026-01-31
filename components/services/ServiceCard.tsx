'use client';

import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
  className?: string;
}

export default function ServiceCard({ title, description, index, className = "" }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative flex flex-col justify-between p-8 min-h-[300px] bg-[#0a0a0a] border border-[#333333] hover:border-[#FC7CA4]/50 transition-colors duration-300 ${className}`}
    >
      <div className="space-y-4">
        <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#FC7CA4] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Decorative line */}
      <div className="w-12 h-1 bg-[#333333] group-hover:bg-[#FC7CA4] transition-colors duration-300 mt-8" />
      
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FC7CA4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
