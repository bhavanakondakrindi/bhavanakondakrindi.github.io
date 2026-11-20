import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import {
  Save,
  Send,
  Eye,
  LogOut,
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  Check,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';

export const AdminHeader = ({ showPreviewPane, setShowPreviewPane }) => {
  const {
    saveDraft,
    publish,
    discardChanges,
    saveStatus,
    isDirty,
    adminPreviewDevice,
    setAdminPreviewDevice,
  } = usePortfolio();

  const { logout, user } = useAuth();
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);

  const handlePublishClick = async () => {
    setShowPublishConfirm(false);
    await publish();
  };

  return (
    <header className="h-16 bg-white border-b-2 border-[#1E1E24] px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
      
      {/* Left Area: Logo & Exit to Public */}
      <div className="flex items-center gap-4">
        <a
          href="#/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 hover:border-black text-xs font-mono font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          title="Exit Admin & View Public Portfolio"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exit to Public Portfolio</span>
          <span className="sm:hidden">Exit</span>
        </a>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="font-editorial font-bold text-base text-[#1E1E24]">
            Admin Studio
          </span>
          
          {/* Status Badge */}
          {saveStatus === 'saving' && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
              Saving...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <Check className="w-3 h-3" /> Draft Saved
            </span>
          )}
          {saveStatus === 'published' && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-rose-600" /> Published Live
            </span>
          )}
          {isDirty && saveStatus === 'unsaved' && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300">
              ● Unsaved Changes
            </span>
          )}
        </div>
      </div>

      {/* Middle Area: Device Preview Modes (Visible when preview pane is enabled) */}
      <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
          onClick={() => {
            setAdminPreviewDevice('desktop');
            if (!showPreviewPane) setShowPreviewPane(true);
          }}
          className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
            adminPreviewDevice === 'desktop' && showPreviewPane
              ? 'bg-white shadow-xs font-bold text-[#1E1E24]'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          title="Desktop View (100%)"
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setAdminPreviewDevice('tablet');
            if (!showPreviewPane) setShowPreviewPane(true);
          }}
          className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
            adminPreviewDevice === 'tablet' && showPreviewPane
              ? 'bg-white shadow-xs font-bold text-[#1E1E24]'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          title="Tablet View (768px)"
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setAdminPreviewDevice('mobile');
            if (!showPreviewPane) setShowPreviewPane(true);
          }}
          className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
            adminPreviewDevice === 'mobile' && showPreviewPane
              ? 'bg-white shadow-xs font-bold text-[#1E1E24]'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          title="Mobile View (375px)"
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Right Area: Actions (Save Draft, Publish, Preview Toggle, Logout) */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Toggle Live Preview Pane */}
        <button
          onClick={() => setShowPreviewPane(!showPreviewPane)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
            showPreviewPane
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{showPreviewPane ? 'Hide Preview' : 'Live Preview'}</span>
        </button>

        {/* Save Draft */}
        <button
          onClick={saveDraft}
          className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-[#1E1E24] shadow-scrapbook hover:bg-slate-50 text-xs font-mono font-bold text-[#1E1E24] flex items-center gap-1.5 transition-all"
        >
          <Save className="w-3.5 h-3.5 text-amber-600" />
          <span>Save Draft</span>
        </button>

        {/* Publish Changes */}
        <div className="relative">
          <button
            onClick={() => setShowPublishConfirm(true)}
            className="px-4 py-1.5 rounded-xl bg-[#1E1E24] hover:bg-slate-800 text-white text-xs font-mono font-bold shadow-scrapbook flex items-center gap-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5 text-yellow-300" />
            <span>Publish</span>
          </button>

          {/* Publish Confirmation Popover */}
          {showPublishConfirm && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook-xl p-4 z-50">
              <h4 className="font-editorial font-bold text-sm text-slate-900 mb-1">
                Publish Changes to Public?
              </h4>
              <p className="text-xs text-slate-600 font-sans mb-3">
                This will update the live portfolio for all public visitors immediately.
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowPublishConfirm(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublishClick}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-mono font-bold hover:bg-rose-700"
                >
                  Yes, Publish Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Discard changes */}
        {isDirty && (
          <button
            onClick={discardChanges}
            title="Discard current unpublished changes and revert to published state"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 transition-colors"
          title={`Log out (${user?.email || 'Admin'})`}
        >
          <LogOut className="w-4 h-4" />
        </button>

      </div>

    </header>
  );
};
