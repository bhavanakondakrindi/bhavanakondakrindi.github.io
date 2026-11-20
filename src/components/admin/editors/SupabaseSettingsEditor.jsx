import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { useAuth } from '../../../context/AuthContext';
import {
  Database,
  ShieldCheck,
  Key,
  Download,
  Upload,
  Copy,
  Check,
  AlertCircle,
  FileCode
} from 'lucide-react';

export const SupabaseSettingsEditor = () => {
  const { draftData, updateDraft, resetToDefaults } = usePortfolio();
  const { isSupabaseConnected } = useAuth();
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [importStatus, setImportStatus] = useState('');

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(draftData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `bhavana_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed?.profile?.name) {
          updateDraft(parsed);
          setImportStatus('Portfolio backup successfully loaded into draft!');
          setTimeout(() => setImportStatus(''), 4000);
        } else {
          setImportStatus('Invalid JSON backup file structure.');
        }
      } catch (err) {
        setImportStatus('Error parsing JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  const copySqlSchema = () => {
    const sqlScript = `-- Supabase Schema for Bhavana Kondakrindi Portfolio
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.portfolio_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_type TEXT NOT NULL CHECK (version_type IN ('draft', 'published')),
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    updated_by UUID REFERENCES auth.users(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_portfolio_version_type 
ON public.portfolio_content (version_type);

ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public visitors can read published content"
ON public.portfolio_content FOR SELECT TO anon, authenticated
USING (version_type = 'published');

CREATE POLICY "Admin can modify portfolio content"
ON public.portfolio_content FOR ALL TO authenticated
USING (true) WITH CHECK (true);
`;
    navigator.clipboard.writeText(sqlScript);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Supabase & Site Architecture Settings
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Review backend database status, Row Level Security policies, and backup data.
        </p>
      </div>

      {/* Backend Status Card */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <h3 className="font-editorial text-lg font-bold text-slate-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-purple-600" />
          <span>Supabase Connection Health</span>
        </h3>

        {isSupabaseConnected ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Supabase Connected & Protected with RLS</p>
              <p className="mt-1 text-[11px] text-emerald-800 font-sans">
                Your portfolio is syncing drafts and published revisions to your Supabase PostgreSQL cluster. Public visitors can only query published rows.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs font-mono text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Local Storage Mode Active (Offline-Ready)</p>
              <p className="mt-1 text-[11px] text-amber-800 font-sans">
                You are currently running in robust Local Mode. All your edits, drafts, and published content are fully preserved in your browser's persistent storage. To connect your live Supabase project, add <code className="font-bold">VITE_SUPABASE_URL</code> and <code className="font-bold">VITE_SUPABASE_ANON_KEY</code> to your environment file.
              </p>
            </div>
          </div>
        )}

        {/* Copy SQL Schema button */}
        <div className="pt-2">
          <button
            onClick={copySqlSchema}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-800 flex items-center gap-2 border border-slate-300 transition-colors"
          >
            {copiedSchema ? <Check className="w-4 h-4 text-emerald-600" /> : <FileCode className="w-4 h-4 text-purple-600" />}
            <span>{copiedSchema ? 'SQL Schema Copied to Clipboard!' : 'Copy Supabase SQL Schema'}</span>
          </button>
        </div>
      </div>

      {/* Backup & Restore Card */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <h3 className="font-editorial text-lg font-bold text-slate-900">
          Portfolio Backup & Restore
        </h3>
        <p className="text-xs font-mono text-slate-500">
          Safeguard all your copy, projects, skills, and theme customizations as an offline JSON snapshot.
        </p>

        {importStatus && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-800">
            {importStatus}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportJSON}
            className="px-4 py-2.5 rounded-xl bg-[#1E1E24] text-white text-xs font-mono font-bold shadow-xs hover:bg-slate-800 flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-yellow-300" />
            <span>Download Portfolio Backup (.json)</span>
          </button>

          <label className="px-4 py-2.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-xs text-xs font-mono font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4 text-rose-500" />
            <span>Restore from Backup (.json)</span>
            <input
              type="file"
              accept=".json"
              onChange={importJSON}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Factory Reset Card */}
      <div className="bg-white p-6 rounded-2xl border-2 border-rose-300 shadow-scrapbook space-y-3">
        <h3 className="font-editorial text-lg font-bold text-rose-900">
          Factory Reset
        </h3>
        <p className="text-xs font-sans text-slate-600">
          Reset all sections, project dossiers, and academic data back to the verified original facts for Bhavana Kondakrindi.
        </p>

        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to restore the verified default portfolio information?")) {
              resetToDefaults();
            }
          }}
          className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-300 text-xs font-mono font-bold"
        >
          Restore Original Verified Defaults
        </button>
      </div>

    </div>
  );
};
