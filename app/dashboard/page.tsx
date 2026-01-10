"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function LoginForm({ onLogin }: { onLogin: () => void }) {
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
    else onLogin();
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="max-w-xs mx-auto mt-32 space-y-6 bg-neutral-900 p-8 rounded shadow-xl border border-white/10">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">Admin Login</h2>
      <input
        type="email"
        required
        placeholder="Email"
        className="w-full p-3 rounded bg-black/40 border border-white/10 text-white"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        required
        placeholder="Password"
        className="w-full p-3 rounded bg-black/40 border border-white/10 text-white"
        value={password}
        onChange={e => setPassword(e.target.value)}
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
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-neutral-900 border border-white/10 rounded shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-[var(--accent)] text-white px-4 py-2 rounded font-bold hover:bg-white hover:text-[var(--accent)] transition-colors"
        >
          Logout
        </button>
      </div>
      {/* TODO: List posts, add post form, rich text editor, etc. */}
      <div className="text-gray-400">Welcome, admin! (Post management coming next.)</div>
    </div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) return <div className="text-center text-white mt-32">Loading...</div>;
  if (!user) return <LoginForm onLogin={() => supabase.auth.getUser().then(({ data }) => setUser(data.user))} />;
  return <AdminDashboard onLogout={handleLogout} />;
}
