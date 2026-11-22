import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, ArrowLeft, ShieldCheck, Key, AlertCircle, Database, HelpCircle } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';

export const AdminAuthModal = () => {
  const { login, authLoading, authError, isSupabaseConnected } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isSupabaseConnected) {
      setErrorMessage('Supabase is not configured. Local demo authentication is permanently disabled.');
      return;
    }

    if (!email || !password) {
      setErrorMessage('Please enter both your administrator email and password.');
      return;
    }

    const res = await login(email, password);
    if (!res.success) {
      setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#FAF7F2] bg-graph-paper flex items-center justify-center p-4">
      
      {/* Top back link to public portfolio */}
      <a
        href="#/"
        className="fixed top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#1E1E24] shadow-scrapbook text-xs font-mono font-bold text-slate-800 hover:bg-slate-50 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Public Portfolio</span>
      </a>

      {/* Main Authentication Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl border-3 border-[#1E1E24] shadow-scrapbook-xl p-8 overflow-hidden">
        
        {/* Washi Tape Header Decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <WashiTape color="pink" width="130px" height="26px" rotate={-1} />
        </div>

        {/* Lock Icon & Branding */}
        <div className="text-center pt-2 mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FEF08A] border-2 border-[#1E1E24] shadow-scrapbook flex items-center justify-center mb-3">
            <Lock className="w-7 h-7 text-[#1E1E24]" />
          </div>

          <h1 className="font-editorial text-3xl font-black text-slate-900">
            Admin Studio
          </h1>
          <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">
            Secure Administrator Access
          </p>
        </div>

        {/* Connection Status / Notice Banner */}
        {isSupabaseConnected ? (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-mono flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Supabase Authentication Active</p>
              <p className="text-[11px] text-emerald-800 font-sans mt-0.5">
                Protected by PostgreSQL Row Level Security (RLS). Only registered administrator accounts can access this studio.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-xs text-amber-950 font-mono space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Database className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Supabase Connection Required</span>
            </div>
            <p className="text-[11px] text-amber-900 font-sans leading-relaxed">
              Default demo credentials and insecure local authentication have been permanently removed. To log in, configure your Supabase credentials in your environment:
            </p>
            <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200 text-[10px] font-mono text-slate-700 space-y-1">
              <div><code>VITE_SUPABASE_URL</code></div>
              <div><code>VITE_SUPABASE_ANON_KEY</code></div>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {(errorMessage || authError) && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-900 font-mono flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage || authError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Administrator Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isSupabaseConnected || authLoading}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1E1E24]/30 focus:border-[#1E1E24] bg-slate-50 text-sm font-sans focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isSupabaseConnected || authLoading}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1E1E24]/30 focus:border-[#1E1E24] bg-slate-50 text-sm font-mono focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={!isSupabaseConnected || authLoading}
            className="w-full mt-2 py-3 rounded-xl bg-[#1E1E24] text-white font-mono font-bold text-sm shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-scrapbook"
          >
            {authLoading ? (
              <span>Authenticating with Supabase...</span>
            ) : (
              <>
                <Key className="w-4 h-4 text-yellow-300" />
                <span>Sign In to Admin Studio</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-[11px] font-mono text-slate-400">
          Zero-trust security: All changes are authorized through PostgreSQL Row Level Security.
        </div>

      </div>

    </div>
  );
};
