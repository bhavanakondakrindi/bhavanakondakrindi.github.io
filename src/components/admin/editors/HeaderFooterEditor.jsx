import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Layout, Sparkles, Compass, ShieldCheck, Bookmark, Flag } from 'lucide-react';

export const HeaderFooterEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const hf = draftData?.headerFooter || {};

  const handleHfChange = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      headerFooter: {
        ...(prev.headerFooter || {}),
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="font-editorial text-2xl font-black text-slate-900">
          Header, Navbar & Footer Branding
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Full CMS editing access for the top micro-ticker, navbar brand stamp, and footer colophon copyright.
        </p>
      </div>

      {/* =========================================================================
          1. TOP MICRO-TICKER (Site-wide Banner at Top of Screen)
         ========================================================================= */}
      <div className="bg-[#FEFCE8] p-6 rounded-2xl border-3 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-amber-950 font-mono text-xs font-bold uppercase pb-2 border-b-2 border-amber-300">
          <Flag className="w-4 h-4 text-amber-700" />
          <span>Top Micro-Ticker Ribbon (Fixed Site Header)</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Ticker Left Text (Campus & Publication Tag)
            </label>
            <input
              type="text"
              value={hf.tickerLeft || ''}
              onChange={(e) => handleHfChange('tickerLeft', e.target.value)}
              placeholder="DEV JOURNAL // DIGITAL FOLIO • KLH DEEMED TO BE UNIVERSITY"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Ticker Right Text (Merit & Academic Status)
            </label>
            <input
              type="text"
              value={hf.tickerRight || ''}
              onChange={(e) => handleHfChange('tickerRight', e.target.value)}
              placeholder="CSE 2ND YEAR • CGPA ~9.5"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-rose-800"
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. NAVBAR BRAND STAMP
         ========================================================================= */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-mono text-xs font-bold uppercase pb-2 border-b border-slate-200">
          <Bookmark className="w-4 h-4 text-purple-600" />
          <span>Navbar Brand Stamp & Title</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Monogram Stamp
            </label>
            <input
              type="text"
              maxLength={4}
              value={hf.brandInitials || ''}
              onChange={(e) => handleHfChange('brandInitials', e.target.value)}
              placeholder="BK"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-center font-editorial uppercase"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Navbar Main Title
            </label>
            <input
              type="text"
              value={hf.brandTitle || ''}
              onChange={(e) => handleHfChange('brandTitle', e.target.value)}
              placeholder="Bhavana Kondakrindi"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold font-editorial"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Navbar Subtitle / Sub-Tag
          </label>
          <input
            type="text"
            value={hf.brandSubtitle || ''}
            onChange={(e) => handleHfChange('brandSubtitle', e.target.value)}
            placeholder="Creative Developer Portfolio"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-600"
          />
        </div>
      </div>

      {/* =========================================================================
          3. FOOTER COLOPHON, UNIVERSITY & COPYRIGHT
         ========================================================================= */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-mono text-xs font-bold uppercase pb-2 border-b border-[#1A1714]/20">
          <Layout className="w-4 h-4 text-emerald-600" />
          <span>Footer Colophon & Editorial Credits</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Footer Brand Name
            </label>
            <input
              type="text"
              value={hf.footerBrand || ''}
              onChange={(e) => handleHfChange('footerBrand', e.target.value)}
              placeholder="Bhavana Kondakrindi"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Year / Academic Badge
            </label>
            <input
              type="text"
              value={hf.footerYearBadge || ''}
              onChange={(e) => handleHfChange('footerYearBadge', e.target.value)}
              placeholder="CSE 2ND YR"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Colophon Paragraph
          </label>
          <textarea
            rows={3}
            value={hf.footerColophon || ''}
            onChange={(e) => handleHfChange('footerColophon', e.target.value)}
            placeholder="COLOPHON: Designed as a bespoke digital scrapbook and editorial magazine..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            University & Location Line
          </label>
          <input
            type="text"
            value={hf.footerUniversity || ''}
            onChange={(e) => handleHfChange('footerUniversity', e.target.value)}
            placeholder="KLH Deemed to be University • Hyderabad, India"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
            Copyright Line
          </label>
          <input
            type="text"
            value={hf.footerCopyright || ''}
            onChange={(e) => handleHfChange('footerCopyright', e.target.value)}
            placeholder="© Bhavana Kondakrindi. Built with code, curiosity, and care."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
          />
        </div>
      </div>

    </div>
  );
};
