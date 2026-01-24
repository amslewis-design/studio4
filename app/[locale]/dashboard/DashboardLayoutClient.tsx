'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState } from 'react';

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  // Redirect to login if not authenticated
  if (!loading && !user) {
    router.push(`/${locale}/login`);
    return null;
  }

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push(`/${locale}/login`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-white text-2xl"
        >
          ✧
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar with Branding and Actions */}
      <div className="sticky top-0 z-40 border-b border-white/5 bg-neutral-900/40 backdrop-blur-3xl px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
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
              <span className="text-white">{user?.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/${locale}`}
                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-r border-white/10 pr-4"
              >
                ← Return to Site
              </Link>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#FC7CA4] transition-colors disabled:opacity-50"
              >
                {signingOut ? 'Signing Out...' : 'Sign Out'}
              </button>
            </div>
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
