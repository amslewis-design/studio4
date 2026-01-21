'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { authService } from '@/lib/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const tLogin = useTranslations('login');
  const tCommon = useTranslations('common');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Attempt to sign in with Supabase Auth
    const { user, error: authError } = await authService.signIn(email, password);

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (user) {
      setSuccess(true);
      // Redirect to dashboard after animation
      setTimeout(() => {
        router.push(`/${locale}/dashboard/admin`);
      }, 800);
      return;
    }

    setError(tLogin('invalidCredentials'));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#FC7CA4]/5 blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/5 blur-[150px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-neutral-900/40 border border-white/5 p-12 rounded-sm space-y-10 backdrop-blur-3xl relative z-10 shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div 
              key="login-form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <motion.div 
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-[#FC7CA4] text-4xl mb-6 mx-auto w-fit"
                >
                  ✧
                </motion.div>
                <h1 className="text-3xl font-serif tracking-[0.25em] uppercase">{t('login.title')}</h1>
                <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-medium">{t('login.subtitle')}</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">{tLogin('staffIdentifier')}</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 p-4 text-white outline-none focus:border-[#FC7CA4] transition-all font-sans text-sm rounded-sm" 
                    placeholder={tLogin('staffPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">{tLogin('accessSigil')}</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 p-4 text-white outline-none focus:border-[#FC7CA4] transition-all font-sans text-sm rounded-sm" 
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs p-3 bg-red-950/20 border border-red-900/30 rounded-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FC7CA4] hover:bg-[#ff9fc0] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 uppercase tracking-[0.2em] text-xs transition-colors duration-300 rounded-sm"
                >
                  {loading ? tCommon('sending') : tLogin('enter')}
                </button>
              </form>

              {/* Demo Access button removed - using proper Supabase Auth */}
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                className="text-5xl"
              >
                ✨
              </motion.div>
              <div>
                <h2 className="text-2xl font-serif mb-2 text-white">{tLogin('welcome')}</h2>
                <p className="text-gray-400 text-sm">{tLogin('enteringMessage')}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
