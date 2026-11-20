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
  CheckCircle2,
  Upload,
  Image as ImageIcon
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
  const profile = draftData?.profile || {};

  return (
    <div className="space-y-8">
      
      {/* Welcome & Fast Actions Banner */}
      <div className="bg-[#FEF08A] rounded-2xl border-2 border-[#1A1714] shadow-scrapbook p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-950">
              Visual Content Management System
            </span>
            <h2 className="font-editorial text-3xl font-black text-[#1A1714] mt-1">
              Welcome back, Bhavana!
            </h2>
            <p className="text-xs text-amber-900 font-sans mt-1 max-w-xl">
              Manage your personal photo, portfolio copy, project case files, technical skills, academics, and visual appearance with live preview.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveAdminTab('hero')}
              className="px-4 py-2.5 rounded-xl bg-white border-2 border-[#1A1714] text-[#1A1714] font-mono font-bold text-xs shadow-xs hover:bg-slate-50 flex items-center gap-2"
            >
              <Upload className="w-3.5 h-3.5 text-rose-600" />
              <span>Upload Photo from Laptop</span>
            </button>

            <button
              onClick={publish}
              className="px-5 py-2.5 rounded-xl bg-[#1A1714] hover:bg-slate-800 text-white font-mono font-bold text-xs shadow-scrapbook flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-yellow-300" />
              <span>Publish Changes Live</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Photo Status */}
        <div
          onClick={() => setActiveAdminTab('hero')}
          className="bg-white p-5 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook hover:-translate-y-0.5 cursor-pointer transition-all flex items-center gap-3.5"
        >
          <div className="w-12 h-14 rounded-lg overflow-hidden border border-[#1A1714] bg-slate-100 shrink-0">
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">COVER PHOTO</span>
            <span className="font-editorial font-bold text-sm text-slate-900 block truncate">
              Change Photo →
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">Laptop Upload</span>
          </div>
        </div>

        {/* Projects Card */}
        <div
          onClick={() => setActiveAdminTab('projects')}
          className="bg-white p-5 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook hover:-translate-y-0.5 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-mono text-[10px] font-bold uppercase">PROJECTS</span>
            <FolderGit2 className="w-4 h-4 text-rose-500" />
          </div>
          <div className="font-editorial text-2xl font-black text-slate-900">
            {draftData?.projects?.length || 0} Dossiers
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-1">
            Click to edit case files
          </p>
        </div>

        {/* Skills Card */}
        <div
          onClick={() => setActiveAdminTab('skills')}
          className="bg-white p-5 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook hover:-translate-y-0.5 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-mono text-[10px] font-bold uppercase">SKILLS</span>
            <Code2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-editorial text-2xl font-black text-slate-900">
            {draftData?.skills?.reduce((acc, c) => acc + (c.items?.length || 0), 0) || 0} Skills
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-1">
            Across {draftData?.skills?.length || 0} categories
          </p>
        </div>

        {/* Academic CGPA */}
        <div
          onClick={() => setActiveAdminTab('education')}
          className="bg-white p-5 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook hover:-translate-y-0.5 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-mono text-[10px] font-bold uppercase">ACADEMIC CGPA</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-editorial text-2xl font-black text-rose-700">
            ~{draftData?.profile?.cgpa || '9.5'}
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-1">
            KLH CSE 2nd Year
          </p>
        </div>

      </div>

      {/* Workflow Instructions */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <h3 className="font-editorial text-xl font-bold text-slate-900">
          How to Manage & Publish
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-mono font-bold text-slate-900 uppercase">1. Upload & Edit</span>
            <p>Select any section in the sidebar to add your laptop photo, tweak project features, or adjust colors.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-mono font-bold text-slate-900 uppercase">2. Live Preview</span>
            <p>Observe changes in real time in the right panel across Desktop, Tablet, and Mobile device frames.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-mono font-bold text-slate-900 uppercase">3. Publish Changes</span>
            <p>Click "Publish Changes Live" when you are satisfied to push your updates live for all visitors.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-500">
            Current Publication Status:{' '}
            <span className="font-bold text-slate-800">
              {publishedData?.lastPublishedAt
                ? `Published on ${new Date(publishedData.lastPublishedAt).toLocaleDateString()}`
                : 'Initial Defaults'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isDirty && (
              <button
                onClick={discardChanges}
                className="px-3.5 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-mono font-bold"
              >
                Revert Draft to Published
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
              Reset to Defaults
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
