import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  BookOpen,
  Bookmark,
  FileText,
  Quote,
  Lightbulb,
  CheckCircle2,
  Table
} from 'lucide-react';

export const AboutEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const profile = draftData?.profile || {};
  const about = draftData?.aboutContent || {};
  const paragraphs = profile.bioParagraphs || [];

  const handleAboutChange = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      aboutContent: {
        ...(prev.aboutContent || {}),
        [field]: value
      }
    }));
  };

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
      
      {/* Header */}
      <div>
        <h2 className="font-editorial text-2xl font-black text-slate-900">
          About Section & Dossier Journal
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Full CMS editing access for Section Headings, Page 01 University Dossier Slip, Page 02 Perspective Quote, Philosophy Note & Engineering Pillars.
        </p>
      </div>

      {/* =========================================================================
          1. SECTION HEADINGS (Chapter 01)
         ========================================================================= */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-mono text-xs font-bold uppercase pb-2 border-b border-slate-200">
          <Bookmark className="w-4 h-4 text-purple-600" />
          <span>Chapter 01 Header & Badge</span>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Chapter Badge Label
          </label>
          <input
            type="text"
            value={about.chapterBadge || ''}
            onChange={(e) => handleAboutChange('chapterBadge', e.target.value)}
            placeholder="Chapter 01 // Field Journal & Biography"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Heading Main
            </label>
            <input
              type="text"
              value={about.headingMain || ''}
              onChange={(e) => handleAboutChange('headingMain', e.target.value)}
              placeholder="Behind the"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-editorial font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Heading Script Accent
            </label>
            <input
              type="text"
              value={about.headingAccent || ''}
              onChange={(e) => handleAboutChange('headingAccent', e.target.value)}
              placeholder="Journal"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-serif italic text-rose-600 font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Section Subheading
          </label>
          <textarea
            rows={2}
            value={about.subheading || ''}
            onChange={(e) => handleAboutChange('subheading', e.target.value)}
            placeholder="Engineering perspective, academic grounding at KLH Deemed to be University..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-sans"
          />
        </div>
      </div>

      {/* =========================================================================
          2. PAGE 01 // FIELD IDENTITY SNAPSHOT & UNIVERSITY DOSSIER TABLE
         ========================================================================= */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-mono text-xs font-bold uppercase pb-2 border-b border-[#1A1714]/20">
          <Table className="w-4 h-4 text-emerald-600" />
          <span>Page 01 // Field Identity & University Slip Table</span>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Page Header Label
          </label>
          <input
            type="text"
            value={about.page1Header || ''}
            onChange={(e) => handleAboutChange('page1Header', e.target.value)}
            placeholder="PAGE 01 // FIELD IDENTITY"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold uppercase"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-1">
              Polaroid Snapshot Name
            </label>
            <input
              type="text"
              value={about.polaroidName || ''}
              onChange={(e) => handleAboutChange('polaroidName', e.target.value)}
              placeholder="Bhavana Kondakrindi"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-1">
              Degree Label
            </label>
            <input
              type="text"
              value={about.polaroidDegree || ''}
              onChange={(e) => handleAboutChange('polaroidDegree', e.target.value)}
              placeholder="B.Tech Computer Science & Engineering"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-1">
              Location Stamp
            </label>
            <input
              type="text"
              value={about.polaroidLocation || ''}
              onChange={(e) => handleAboutChange('polaroidLocation', e.target.value)}
              placeholder="KLH CAMPUS • HYDERABAD"
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
            />
          </div>
        </div>

        {/* Dossier Table Slip Details */}
        <div className="bg-white p-4 rounded-xl border-2 border-[#1A1714] space-y-3">
          <span className="text-[11px] font-mono font-bold text-slate-700 uppercase block">
            University Dossier Slip Table Fields
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-0.5">Institution Label</label>
              <input
                type="text"
                value={about.dossierInstitutionLabel || ''}
                onChange={(e) => handleAboutChange('dossierInstitutionLabel', e.target.value)}
                placeholder="INSTITUTION"
                className="w-full px-2.5 py-1 rounded border border-slate-300 text-xs font-mono uppercase"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-0.5">Institution Value</label>
              <input
                type="text"
                value={about.dossierInstitutionValue || ''}
                onChange={(e) => handleAboutChange('dossierInstitutionValue', e.target.value)}
                placeholder="KLH University"
                className="w-full px-2.5 py-1 rounded border border-slate-300 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-0.5">Degree Standing Label</label>
              <input
                type="text"
                value={about.dossierStandingLabel || ''}
                onChange={(e) => handleAboutChange('dossierStandingLabel', e.target.value)}
                placeholder="DEGREE STANDING"
                className="w-full px-2.5 py-1 rounded border border-slate-300 text-xs font-mono uppercase"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-0.5">Degree Standing Value</label>
              <input
                type="text"
                value={about.dossierStandingValue || ''}
                onChange={(e) => handleAboutChange('dossierStandingValue', e.target.value)}
                placeholder="2nd Year (Sophomore)"
                className="w-full px-2.5 py-1 rounded border border-slate-300 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-0.5">Academic Merit Label</label>
              <input
                type="text"
                value={about.dossierMeritLabel || ''}
                onChange={(e) => handleAboutChange('dossierMeritLabel', e.target.value)}
                placeholder="ACADEMIC MERIT"
                className="w-full px-2.5 py-1 rounded border border-slate-300 text-xs font-mono uppercase"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-0.5">Academic Merit Value</label>
              <input
                type="text"
                value={about.dossierMeritValue || ''}
                onChange={(e) => handleAboutChange('dossierMeritValue', e.target.value)}
                placeholder="CGPA ~9.5 / 10.0"
                className="w-full px-2.5 py-1 rounded border border-rose-300 bg-rose-50 text-rose-900 text-xs font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-0.5">Confidential Slip Footer Stamp</label>
            <input
              type="text"
              value={about.dossierFooterNote || ''}
              onChange={(e) => handleAboutChange('dossierFooterNote', e.target.value)}
              placeholder="CONFIDENTIAL FIELD NOTES • BK // FIELD LOG"
              className="w-full px-2.5 py-1 rounded border border-slate-300 text-xs font-mono uppercase text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. PAGE 02 // EDITORIAL QUOTE & PERSPECTIVE
         ========================================================================= */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-mono text-xs font-bold uppercase pb-2 border-b border-slate-200">
          <Quote className="w-4 h-4 text-rose-600" />
          <span>Page 02 // Header, Perspective & Editorial Quote</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Page Header Label
            </label>
            <input
              type="text"
              value={about.page2Header || ''}
              onChange={(e) => handleAboutChange('page2Header', e.target.value)}
              placeholder="PAGE 02 // ESSAY & PRINCIPLES"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Perspective Badge
            </label>
            <input
              type="text"
              value={about.page2Badge || ''}
              onChange={(e) => handleAboutChange('page2Badge', e.target.value)}
              placeholder="SOPHOMORE PERSPECTIVE"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold uppercase text-sky-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Large Editorial Pull-Quote
          </label>
          <textarea
            rows={2}
            value={about.editorialQuote || ''}
            onChange={(e) => handleAboutChange('editorialQuote', e.target.value)}
            placeholder='"I believe the most rewarding engineering happens at the intersection of robust data structures and thoughtful human interaction."'
            className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-sm font-serif italic font-bold focus:outline-none"
          />
        </div>
      </div>

      {/* =========================================================================
          4. PHILOSOPHY STICKY NOTE & 3 ENGINEERING PILLARS
         ========================================================================= */}
      <div className="bg-[#FEF9C3] p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-amber-950 font-mono text-xs font-bold uppercase pb-2 border-b border-amber-300">
          <Lightbulb className="w-4 h-4 text-amber-800" />
          <span>Philosophy Sticky Note & 3 Engineering Pillars</span>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-amber-950 uppercase mb-1">
            Philosophy Note Title
          </label>
          <input
            type="text"
            value={about.philosophyTitle || ''}
            onChange={(e) => handleAboutChange('philosophyTitle', e.target.value)}
            placeholder="My Engineering Philosophy"
            className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white text-sm font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-amber-950 uppercase mb-1">
            Philosophy Body Text
          </label>
          <textarea
            rows={3}
            value={about.philosophyBody || ''}
            onChange={(e) => handleAboutChange('philosophyBody', e.target.value)}
            placeholder="Rather than stopping at conceptual design, I value building complete, working prototypes..."
            className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white text-xs leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-amber-950 uppercase mb-2">
            3 Engineering Pillar Badges
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-0.5">Pillar 1</span>
              <input
                type="text"
                value={about.pillar1Text || ''}
                onChange={(e) => handleAboutChange('pillar1Text', e.target.value)}
                placeholder="Clean Code & OOP"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold"
              />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-0.5">Pillar 2</span>
              <input
                type="text"
                value={about.pillar2Text || ''}
                onChange={(e) => handleAboutChange('pillar2Text', e.target.value)}
                placeholder="Algorithmic Problem-Solving"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold"
              />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-0.5">Pillar 3</span>
              <input
                type="text"
                value={about.pillar3Text || ''}
                onChange={(e) => handleAboutChange('pillar3Text', e.target.value)}
                placeholder="User-Focused Applications"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. NARRATIVE ESSAY BIO PARAGRAPHS
         ========================================================================= */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-lg font-bold text-slate-900">
              Narrative Essay Bio Paragraphs
            </h3>
            <p className="text-xs font-mono text-slate-500">
              Custom multi-paragraph personal story shown in the right journal page.
            </p>
          </div>

          <button
            type="button"
            onClick={addParagraph}
            className="px-3 py-1.5 rounded-xl bg-[#1A1714] text-white text-xs font-mono font-bold shadow-scrapbook flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Paragraph</span>
          </button>
        </div>

        <div className="space-y-3">
          {paragraphs.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border-2 border-[#1A1714] shadow-scrapbook space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-500 uppercase">
                  Paragraph {idx + 1}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveParagraph(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded text-slate-500 hover:text-black disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveParagraph(idx, 'down')}
                    disabled={idx === paragraphs.length - 1}
                    className="p-1 rounded text-slate-500 hover:text-black disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
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
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:border-[#1A1714] leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
