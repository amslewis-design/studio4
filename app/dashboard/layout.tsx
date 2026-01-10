'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar with Branding and Actions */}
      <div className="sticky top-0 z-40 border-b border-white/5 bg-neutral-900/40 backdrop-blur-3xl px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-2xl">✧</span>
            <div className="flex flex-col">
              <span className="text-sm font-serif tracking-[0.2em] uppercase">Sassy</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Studio</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500">
              <span>Admin Access</span>
              <span className="text-[#FC7CA4]">•</span>
              <span>Dashboard</span>
            </div>
            <Link
              href="/"
              className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-l border-white/10 pl-6"
            >
              ← Return to Site
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-[calc(100vh-88px)]"
      >
        {children}
      </motion.div>
    </div>
  );
}
