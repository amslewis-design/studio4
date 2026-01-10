"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
    if (!error) window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-black">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6 bg-neutral-900 p-8 rounded border border-white/10">
        <h1 className="text-2xl font-bold text-center text-white">Admin Login</h1>
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full p-3 rounded bg-black/40 border border-white/10 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="w-full p-3 rounded bg-black/40 border border-white/10 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-400 text-xs text-center">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--accent)] text-white py-3 rounded font-bold hover:bg-white hover:text-[var(--accent)] transition-colors disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
