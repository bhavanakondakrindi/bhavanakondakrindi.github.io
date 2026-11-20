import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Plus, Trash2, ArrowUp, ArrowDown, BookOpen } from 'lucide-react';

export const AboutEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const profile = draftData?.profile || {};
  const paragraphs = profile.bioParagraphs || [];

  const handleParagraphChange = (index, value) => {
    const updated = [...paragraphs];
    updated[index] = value;
    updateDraft(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        bioParagraphs: updated
      }
    }));
  };

  const addParagraph = () => {
    updateDraft(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        bioParagraphs: [...(prev.profile.bioParagraphs || []), "New reflective paragraph about your computer science journey."]
      }
    }));
  };

  const removeParagraph = (index) => {
    const updated = paragraphs.filter((_, i) => i !== index);
    updateDraft(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        bioParagraphs: updated
      }
    }));
  };

  const moveParagraph = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= paragraphs.length) return;

    const updated = [...paragraphs];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    updateDraft(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        bioParagraphs: updated
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            About Me & Field Notes
          </h2>
          <p className="text-xs font-mono text-slate-500 mt-1">
            Manage your narrative, academic journey at KLH, and learning approach.
          </p>
        </div>

        <button
          onClick={addParagraph}
          className="px-3.5 py-2 rounded-xl bg-[#1E1E24] text-white text-xs font-mono font-bold shadow-scrapbook flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Paragraph</span>
        </button>
      </div>

      {/* Paragraphs List */}
      <div className="space-y-4">
        {paragraphs.map((p, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-500 uppercase">
                Paragraph {idx + 1}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveParagraph(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 rounded text-slate-500 hover:text-black disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveParagraph(idx, 'down')}
                  disabled={idx === paragraphs.length - 1}
                  className="p-1 rounded text-slate-500 hover:text-black disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => removeParagraph(idx)}
                  className="p-1 rounded text-rose-500 hover:text-rose-700 ml-2"
                  title="Delete Paragraph"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <textarea
              rows={3}
              value={p}
              onChange={(e) => handleParagraphChange(idx, e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1E1E24]/20 focus:border-[#1E1E24] text-sm font-sans focus:outline-none"
            />
          </div>
        ))}
      </div>

    </div>
  );
};
