import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { useAuth } from '../../../context/AuthContext';
import {
  Send,
  Save,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Database,
  ExternalLink,
  Layers,
  Code2,
  FolderGit2,
  CheckCircle2
} from 'lucide-react';

export const OverviewEditor = () => {
  const {
    draftData,
    publishedData,
    isDirty,
    saveDraft,
    publish,
    discardChanges,
    resetToDefaults,
    setActiveAdminTab
  } = usePortfolio();

  const { isSupabaseConnected } = useAuth();

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-[#FEF08A] rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-950">
              Content Management System
            </span>
            <h2 className="font-editorial text-3xl font-black text-[#1E1E24] mt-1">
              Welcome back, Bhavana!
            </h2>
            <p className="text-xs text-amber-900 font-sans mt-1 max-w-xl">
              This dashboard provides complete control over your portfolio copy, projects, technical skills, academics, visual palettes, and scrapbook styling.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={publish}
              className="px-5 py-2.5 rounded-xl bg-[#1E1E24] hover:bg-slate-800 text-white font-mono font-bold text-xs shadow-scrapbook flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-yellow-300" />
              <span>Publish All to Live</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics & System Health */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Projects Card */}
        <div
          onClick={() => setActiveAdminTab('projects')}
          className="bg-white p-5 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook hover:-translate-y-0.5 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold">PROJECTS</span>
            <FolderGit2 className="w-4 h-4 text-rose-500" />
          </div>
          <div className="font-editorial text-3xl font-black text-slate-900">
            {draftData?.projects?.length || 0}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">
            Click to manage dossiers
          </p>
        </div>

        {/* Skills Card */}
        <div
          onClick={() => setActiveAdminTab('skills')}
          className="bg-white p-5 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook hover:-translate-y-0.5 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold">SKILLS</span>
            <Code2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-editorial text-3xl font-black text-slate-900">
            {draftData?.skills?.reduce((acc, c) => acc + (c.items?.length || 0), 0) || 0}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">
            Across {draftData?.skills?.length || 0} categories
          </p>
        </div>

        {/* CGPA & Academic */}
        <div
          onClick={() => setActiveAdminTab('education')}
          className="bg-white p-5 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook hover:-translate-y-0.5 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold">CGPA</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-editorial text-3xl font-black text-slate-900">
            ~{draftData?.profile?.cgpa || '9.5'}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">
            KLH CSE 2nd Year
          </p>
        </div>

        {/* Backend Status */}
        <div
          onClick={() => setActiveAdminTab('settings')}
          className="bg-white p-5 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook hover:-translate-y-0.5 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-xs font-bold">STORAGE</span>
            <Database className="w-4 h-4 text-purple-600" />
          </div>
          <div className="font-editorial text-base font-bold text-slate-900 flex items-center gap-1.5 mt-2">
            {isSupabaseConnected ? (
              <span className="text-emerald-700 flex items-center gap-1 text-sm font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Supabase Live
              </span>
            ) : (
              <span className="text-amber-800 flex items-center gap-1 text-sm font-mono">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Local Storage
              </span>
            )}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-2">
            {isSupabaseConnected ? 'PostgreSQL & RLS Active' : 'Offline / Local Persistence'}
          </p>
        </div>

      </div>

      {/* Workflow & Quick Actions */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <h3 className="font-editorial text-xl font-bold text-slate-900">
          Workflow Guide: Draft vs Published
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-mono font-bold text-slate-900 uppercase">1. Make Changes</span>
            <p>Select any section in the sidebar to modify copy, add projects, or tweak visual themes.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-mono font-bold text-slate-900 uppercase">2. Save Draft</span>
            <p>Save work-in-progress without altering what public visitors see on the live site.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-mono font-bold text-slate-900 uppercase">3. Publish Live</span>
            <p>When you are satisfied with your draft, click Publish to immediately update the public site.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-500">
            Last Published:{' '}
            <span className="font-bold text-slate-800">
              {publishedData?.lastPublishedAt
                ? new Date(publishedData.lastPublishedAt).toLocaleString()
                : 'Initial Defaults'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isDirty && (
              <button
                onClick={discardChanges}
                className="px-3.5 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-mono font-bold"
              >
                Revert to Published
              </button>
            )}

            <button
              onClick={() => {
                if (window.confirm('Reset all portfolio content back to initial setup values?')) {
                  resetToDefaults();
                }
              }}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-mono"
            >
              Reset to Original Defaults
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
