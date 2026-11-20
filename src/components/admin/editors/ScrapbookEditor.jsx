import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Sparkles, Paperclip, Stamp, Grid } from 'lucide-react';

export const ScrapbookEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const appearance = draftData?.appearance || {};

  const toggleAppearanceProp = (prop) => {
    updateDraft(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [prop]: !prev.appearance?.[prop]
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Scrapbook & Editorial Decor
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Toggle decorative elements, washi tapes, paper textures, and tactile clips.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <h3 className="font-editorial text-lg font-bold text-slate-900">
          Scrapbook Layer Toggles
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Washi Tape */}
          <div
            onClick={() => toggleAppearanceProp('washiTapeEnabled')}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              appearance.washiTapeEnabled !== false
                ? 'border-[#1E1E24] bg-[#FEF9C3]/50 shadow-scrapbook'
                : 'border-slate-200 bg-white opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-editorial font-bold text-sm text-slate-900">
                Washi Tape Strips
              </span>
              <input
                type="checkbox"
                checked={appearance.washiTapeEnabled !== false}
                onChange={() => {}}
                className="w-4 h-4 rounded"
              />
            </div>
            <p className="text-xs text-slate-600 font-sans">
              Semi-transparent textured washi tape pinned on photo corners and card headers.
            </p>
          </div>

          {/* Binder Clips */}
          <div
            onClick={() => toggleAppearanceProp('binderClipsEnabled')}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              appearance.binderClipsEnabled !== false
                ? 'border-[#1E1E24] bg-[#FBCFE8]/40 shadow-scrapbook'
                : 'border-slate-200 bg-white opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-editorial font-bold text-sm text-slate-900">
                Binder Clips
              </span>
              <input
                type="checkbox"
                checked={appearance.binderClipsEnabled !== false}
                onChange={() => {}}
                className="w-4 h-4 rounded"
              />
            </div>
            <p className="text-xs text-slate-600 font-sans">
              Bulldog clips, heart wire paperclips, and pastel foldback clips.
            </p>
          </div>

          {/* Stickers & Stamps */}
          <div
            onClick={() => toggleAppearanceProp('scrapbookStickersEnabled')}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              appearance.scrapbookStickersEnabled !== false
                ? 'border-[#1E1E24] bg-[#BBF7D0]/40 shadow-scrapbook'
                : 'border-slate-200 bg-white opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-editorial font-bold text-sm text-slate-900">
                Stickers & Stamps
              </span>
              <input
                type="checkbox"
                checked={appearance.scrapbookStickersEnabled !== false}
                onChange={() => {}}
                className="w-4 h-4 rounded"
              />
            </div>
            <p className="text-xs text-slate-600 font-sans">
              Doodle arrows, gem stickers, scalloped stamps, and star sparkles.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
