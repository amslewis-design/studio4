'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard/admin', label: 'Admin Panel', icon: '⚙️' },
    { href: '/dashboard/blog', label: 'Blog', icon: '📝' },
    { href: '/dashboard/portfolio', label: 'Portfolio', icon: '🎨' },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-neutral-900/80 backdrop-blur-sm border-r border-white/5 p-8 flex flex-col overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 mb-12 group">
          <span className="text-2xl">✧</span>
          <div className="flex flex-col">
            <span className="text-sm font-serif tracking-[0.2em] uppercase">Sassy</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Studio</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-sm transition-all group ${
                  isActive
                    ? 'bg-[#FC7CA4] text-black'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm uppercase tracking-[0.2em] font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-4 border-t border-white/5 pt-6 mt-6">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white text-sm uppercase tracking-[0.2em] transition-colors"
          >
            ← Return to Site
          </Link>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-white border border-white/10 rounded-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 w-[calc(100%-16rem)] min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 border-b border-white/5 bg-neutral-900/40 backdrop-blur-3xl px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif uppercase tracking-[0.1em]">
              {navItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500">
              <span>Today</span>
              <span className="text-[#FC7CA4]">•</span>
              <span>Admin Access</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="min-h-[calc(100vh-88px)]"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
