import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, ArrowLeft, ShieldCheck, Key, AlertCircle, Sparkles } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';

export const AdminAuthModal = () => {
  const { login, authLoading, authError, isSupabaseConnected } = useAuth();
  const [email, setEmail] = useState('admin@portfolio.local');
  const [password, setPassword] = useState('admin123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    const res = await login(email, password);
    if (!res.success) {
      setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#FAF7F2] bg-graph-paper flex items-center justify-center p-4">
      
      {/* Top back link */}
      <a
        href="#/"
        className="fixed top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#1E1E24] shadow-scrapbook text-xs font-mono font-bold text-slate-800 hover:bg-slate-50 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Public Portfolio</span>
      </a>

      {/* Main Authentication Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl border-3 border-[#1E1E24] shadow-scrapbook-xl p-8 overflow-hidden">
        
        {/* Washi Tape Header */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <WashiTape color="pink" width="130px" height="26px" rotate={-1} />
        </div>

        {/* Lock Icon & Branding */}
        <div className="text-center pt-2 mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FEF08A] border-2 border-[#1E1E24] shadow-scrapbook flex items-center justify-center mb-3">
            <Lock className="w-7 h-7 text-[#1E1E24]" />
          </div>

          <h1 className="font-editorial text-3xl font-black text-slate-900">
            Admin Studio
          </h1>
          <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">
            Bhavana Kondakrindi CMS
          </p>
        </div>

        {/* Status notification */}
        {isSupabaseConnected ? (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Connected to Supabase PostgreSQL & Auth</span>
          </div>
        ) : (
          <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 font-mono flex items-start gap-2">
            <Key className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Local Admin Mode Active</p>
              <p className="text-[11px] text-amber-800">
                Supabase credentials not yet provided in .env. You can log in using default demo credentials:
                <br />
                <code className="font-bold bg-amber-100 px-1 py-0.5 rounded">admin@portfolio.local</code> / <code className="font-bold bg-amber-100 px-1 py-0.5 rounded">admin123</code>
              </p>
            </div>
          </div>
        )}

        {(errorMessage || authError) && (
          <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-800 font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage || authError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Admin Email / Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@portfolio.local"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1E1E24]/30 focus:border-[#1E1E24] bg-slate-50 text-sm font-mono focus:outline-none transition-colors"
              required
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
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1E1E24]/30 focus:border-[#1E1E24] bg-slate-50 text-sm font-mono focus:outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full mt-2 py-3 rounded-xl bg-[#1E1E24] text-white font-mono font-bold text-sm shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {authLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Key className="w-4 h-4 text-yellow-300" />
                <span>Enter Admin Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs font-mono text-slate-400">
          Only authorized administrators have permission to edit and publish portfolio content.
        </div>

      </div>

    </div>
  );
};
