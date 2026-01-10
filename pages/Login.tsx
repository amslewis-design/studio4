'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const performLogin = (userData: any) => {
    setLoading(false);
    setSuccess(true);
    // Shortened delay for better UX while keeping the "alchemy" transition effect
    setTimeout(() => {
      onLogin(userData);
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Instant check for Demo Credentials to avoid network timeout "stuck" state
    if (email.trim() === 'admin@sassy.studio' && pass.trim() === 'gold') {
      performLogin({ id: 'demo-alchemist', email: email.trim(), role: 'admin' });
      return;
    }

    // 2. Otherwise, attempt to reach the backend
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Sigil rejected. Verify credentials.');
      }

      const user = await response.json();
      performLogin(user);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Server is unresponsive. Use Demo Credentials.');
      } else {
        setError(err.message || 'The Alchemy failed. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    setEmail('admin@sassy.studio');
    setPass('gold');
    // Trigger immediate login for better "one-click" experience
    const demoUser = { id: 'demo-alchemist', email: 'admin@sassy.studio', role: 'admin' };
    setLoading(true);
    setTimeout(() => performLogin(demoUser), 400);
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
                <h1 className="text-3xl font-serif tracking-[0.25em] uppercase">Sassy Vault</h1>
                <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-medium">Digital Alchemy Control Portal</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Staff Identifier</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 p-4 text-white outline-none focus:border-[#FC7CA4] transition-all font-sans text-sm rounded-sm" 
                    placeholder="alchemist@sassy.studio"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Access Sigil</label>
                  <input 
                    type="password" 
                    required
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 p-4 text-white outline-none focus:border-[#FC7CA4] transition-all font-sans text-sm rounded-sm" 
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-500/10 border border-red-500/20 p-3 text-red-400 text-[9px] uppercase tracking-widest text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-4 pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FC7CA4] text-white py-5 uppercase tracking-[0.4em] text-[10px] font-black hover:bg-white hover:text-[#FC7CA4] transition-all duration-700 disabled:opacity-50 relative overflow-hidden group shadow-lg"
                  >
                    <span className="relative z-10">{loading ? 'Initiating Alchemy...' : 'Enter the Vault'}</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                  </button>

                  <button 
                    type="button"
                    onClick={handleDemoAccess}
                    disabled={loading}
                    className="w-full py-4 border border-white/5 text-gray-500 hover:text-[#FC7CA4] hover:border-[#FC7CA4]/30 transition-all text-[9px] uppercase tracking-[0.4em] font-medium disabled:opacity-30"
                  >
                    Use Demo Credentials
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success-screen"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-6"
            >
              <div className="relative w-20 h-20 mx-auto">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-[#FC7CA4] rounded-full opacity-20 blur-xl"
                ></motion.div>
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="text-[#FC7CA4] text-6xl"
                >
                  ❂
                </motion.div>
              </div>
              <h2 className="text-2xl font-serif italic">Identity Transmuted</h2>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-medium">Unlocking Alchemy Dashboard...</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="pt-6 border-t border-white/5 text-center">
          <p className="text-[8px] text-gray-700 uppercase tracking-[0.3em] font-medium">
            Protected Digital Environment
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;