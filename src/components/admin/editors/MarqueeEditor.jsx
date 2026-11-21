import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { initialPortfolioData } from '../../../data/initialPortfolioData';
import { Sparkles, Plus, Trash2, RotateCcw, Eye, EyeOff, Palette, Gauge, Check, ArrowRight } from 'lucide-react';

export const MarqueeEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const marquee = draftData?.marqueeBanner || initialPortfolioData.marqueeBanner;
  const items = marquee.items && marquee.items.length > 0 ? marquee.items : initialPortfolioData.marqueeBanner.items;

  const [newPhrase, setNewPhrase] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const updateMarquee = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      marqueeBanner: {
        ...(prev.marqueeBanner || initialPortfolioData.marqueeBanner),
        [field]: value
      }
    }));
  };

  const handleAddItem = (e) => {
    if (e) e.preventDefault();
    const trimmed = newPhrase.trim().toUpperCase();
    if (!trimmed) return;

    const updated = [...items, trimmed];
    updateMarquee('items', updated);
    setNewPhrase('');
    showNotification('Phrase added to moving tape!');
  };

  const handleUpdateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value.toUpperCase();
    updateMarquee('items', updated);
  };

  const handleRemoveItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    updateMarquee('items', updated);
    showNotification('Phrase removed from moving tape.');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset the moving tape phrases and style to original default values?')) {
      updateDraft(prev => ({
        ...prev,
        marqueeBanner: initialPortfolioData.marqueeBanner
      }));
      showNotification('Moving tape reset to factory defaults.');
    }
  };

  const colorPresets = [
    { name: 'Canary Yellow', bg: '#FEF08A', text: '#1A1714', border: '#EAB308' },
    { name: 'Strawberry Pink', bg: '#FBCFE8', text: '#831843', border: '#EC4899' },
    { name: 'Sky Blue', bg: '#BAE6FD', text: '#075985', border: '#0284C7' },
    { name: 'Sage Mint', bg: '#BBF7D0', text: '#065F46', border: '#10B981' },
    { name: 'Lavender Purple', bg: '#DDD6FE', text: '#4C1D95', border: '#8B5CF6' },
    { name: 'Peach Coral', bg: '#FED7AA', text: '#7C2D12', border: '#F97316' },
    { name: 'Kraft Paper', bg: '#FEF9C3', text: '#713F12', border: '#CA8A04' },
    { name: 'Midnight Charcoal', bg: '#1A1714', text: '#FEF08A', border: '#000000' },
  ];

  const speedDuration = marquee.speed === 'slow' ? '36s' : marquee.speed === 'fast' ? '14s' : '22s';

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1A1714]/15 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF08A] border-2 border-[#1A1714] text-xs font-mono font-bold text-amber-950 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Banner Component</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-black text-[#1A1714]">
            Yellow Moving Tape Studio
          </h2>
          <p className="text-sm font-sans text-slate-600 mt-1">
            Customize the animated marquee ribbon banner tape displayed under the Hero section.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-[#1A1714] text-xs font-mono font-bold text-slate-800 transition-colors shadow-xs self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Notification Toast */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border-2 border-emerald-500 rounded-xl text-xs font-mono font-bold text-emerald-900 flex items-center gap-2 animate-fade-in shadow-xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* LIVE INTERACTIVE MOVING TAPE PREVIEW */}
      <div className="bg-white p-6 rounded-3xl border-3 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase font-black tracking-wider text-slate-500">
            LIVE PREVIEW (REAL-TIME MOTION)
          </span>
          <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {marquee.enabled !== false ? '● Active on Site' : '○ Hidden on Site'}
          </span>
        </div>

        {marquee.enabled !== false ? (
          <div
            style={{
              backgroundColor: marquee.bgColor || '#FEF08A',
              color: marquee.textColor || '#1A1714',
            }}
            className="border-y-2 border-[#1A1714] py-3.5 overflow-hidden shadow-inner rounded-xl transition-colors"
          >
            <div
              className="flex whitespace-nowrap animate-marquee"
              style={{ animationDuration: speedDuration }}
            >
              <div className="flex items-center gap-8 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase">
                {items.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span>{marquee.starPrefix || '★'} {item}</span>
                    <span>{marquee.separator || '•'}</span>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center gap-8 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase pl-8">
                {items.map((item, idx) => (
                  <React.Fragment key={`dup-${idx}`}>
                    <span>{marquee.starPrefix || '★'} {item}</span>
                    <span>{marquee.separator || '•'}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-slate-50 border-2 border-dashed border-slate-300 text-center text-sm font-mono text-slate-500">
            Tape is currently hidden. Turn on the toggle below to activate it on your portfolio.
          </div>
        )}
      </div>

      {/* 1. MASTER TOGGLE & SPEED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Visibility Toggle */}
        <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-editorial font-bold text-lg text-slate-900">
              Tape Visibility
            </h4>
            <p className="text-xs text-slate-600 font-sans">
              Show or hide the moving tape strip on your public portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={() => updateMarquee('enabled', !(marquee.enabled !== false))}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border-2 border-[#1A1714] flex items-center gap-2 shadow-xs transition-all ${
              marquee.enabled !== false
                ? 'bg-emerald-400 text-emerald-950'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {marquee.enabled !== false ? (
              <>
                <Eye className="w-4 h-4 text-emerald-900" />
                <span>Visible</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-slate-600" />
                <span>Hidden</span>
              </>
            )}
          </button>
        </div>

        {/* Scroll Speed Control */}
        <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-editorial font-bold text-lg text-slate-900">
                Movement Speed
              </h4>
              <p className="text-xs text-slate-600 font-sans">
                Controls the animation scroll rate.
              </p>
            </div>
            <Gauge className="w-4 h-4 text-slate-500" />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { id: 'slow', label: 'Slow (36s)' },
              { id: 'normal', label: 'Normal (22s)' },
              { id: 'fast', label: 'Fast (14s)' },
            ].map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => updateMarquee('speed', s.id)}
                className={`py-2 px-2.5 rounded-xl border-2 border-[#1A1714] text-xs font-mono font-bold transition-all shadow-xs ${
                  (marquee.speed || 'normal') === s.id
                    ? 'bg-[#1A1714] text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 2. COLOR PALETTES & CUSTOM STYLING */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-rose-600" />
            <h4 className="font-editorial font-bold text-lg text-slate-900">
              Tape Color Identity
            </h4>
          </div>
          <span className="font-mono text-xs text-slate-500">
            Current: {marquee.bgColor || '#FEF08A'}
          </span>
        </div>

        {/* Preset Palette Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {colorPresets.map((preset) => {
            const isSelected = (marquee.bgColor || '#FEF08A').toLowerCase() === preset.bg.toLowerCase();

            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  updateDraft(prev => ({
                    ...prev,
                    marqueeBanner: {
                      ...(prev.marqueeBanner || initialPortfolioData.marqueeBanner),
                      bgColor: preset.bg,
                      textColor: preset.text
                    }
                  }));
                }}
                style={{ backgroundColor: preset.bg, color: preset.text }}
                className={`p-3 rounded-xl border-2 border-[#1A1714] text-left transition-all relative overflow-hidden flex items-center justify-between shadow-xs ${
                  isSelected ? 'ring-3 ring-rose-500 font-black scale-102' : 'hover:scale-101 opacity-90 hover:opacity-100'
                }`}
              >
                <span className="text-xs font-mono font-bold truncate">
                  {preset.name}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Custom Hex Inputs */}
        <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={marquee.bgColor || '#FEF08A'}
              onChange={(e) => updateMarquee('bgColor', e.target.value)}
              className="w-10 h-10 rounded-xl border-2 border-[#1A1714] cursor-pointer shadow-xs p-0.5 bg-white shrink-0"
            />
            <div className="flex-1">
              <label className="block text-[10px] font-mono font-bold uppercase text-slate-500">
                Custom Background Hex
              </label>
              <input
                type="text"
                value={marquee.bgColor || '#FEF08A'}
                onChange={(e) => updateMarquee('bgColor', e.target.value)}
                className="w-full px-2.5 py-1 rounded-lg border border-slate-300 font-mono text-xs uppercase font-bold"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={marquee.textColor || '#1A1714'}
              onChange={(e) => updateMarquee('textColor', e.target.value)}
              className="w-10 h-10 rounded-xl border-2 border-[#1A1714] cursor-pointer shadow-xs p-0.5 bg-white shrink-0"
            />
            <div className="flex-1">
              <label className="block text-[10px] font-mono font-bold uppercase text-slate-500">
                Custom Text Hex
              </label>
              <input
                type="text"
                value={marquee.textColor || '#1A1714'}
                onChange={(e) => updateMarquee('textColor', e.target.value)}
                className="w-full px-2.5 py-1 rounded-lg border border-slate-300 font-mono text-xs uppercase font-bold"
              />
            </div>
          </div>
        </div>

      </div>

      {/* 3. SEPARATOR & PREFIX SYMBOL */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        <h4 className="font-editorial font-bold text-lg text-slate-900">
          Divider Symbols & Punctuation
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
              Separator Between Phrases
            </label>
            <div className="flex gap-2">
              {['•', '★', '✦', '//', '—', '|'].map(symbol => (
                <button
                  key={symbol}
                  type="button"
                  onClick={() => updateMarquee('separator', symbol)}
                  className={`flex-1 py-1.5 rounded-lg border-2 border-[#1A1714] font-mono text-xs font-bold transition-all ${
                    (marquee.separator || '•') === symbol
                      ? 'bg-[#1A1714] text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
              Prefix Icon Before Each Phrase
            </label>
            <div className="flex gap-2">
              {[
                { id: '★', label: '★ Star' },
                { id: '✦', label: '✦ Sparkle' },
                { id: '📌', label: '📌 Pin' },
                { id: '', label: 'None' },
              ].map(opt => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => updateMarquee('starPrefix', opt.id)}
                  className={`flex-1 py-1.5 rounded-lg border-2 border-[#1A1714] font-mono text-xs font-bold transition-all ${
                    (marquee.starPrefix ?? '★') === opt.id
                      ? 'bg-[#1A1714] text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. PHRASES & TAPE CONTENT MANAGER */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h4 className="font-editorial font-bold text-lg text-slate-900">
              Moving Tape Phrases ({items.length})
            </h4>
            <p className="text-xs text-slate-600 font-sans">
              Add, edit, or delete any technical highlights repeating across the moving tape.
            </p>
          </div>
        </div>

        {/* Add New Phrase Form */}
        <form onSubmit={handleAddItem} className="flex gap-2">
          <input
            type="text"
            value={newPhrase}
            onChange={(e) => setNewPhrase(e.target.value)}
            placeholder="Type a new phrase e.g. 'FULL-STACK APPS'..."
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-[#1A1714]/20 focus:border-[#1A1714] text-xs font-mono font-bold uppercase focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1A1714] hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Phrase</span>
          </button>
        </form>

        {/* Current Items List */}
        <div className="space-y-2.5 pt-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border-2 border-[#1A1714]/15 hover:border-[#1A1714] transition-all group"
            >
              <span className="w-6 h-6 rounded-lg bg-white border border-[#1A1714] flex items-center justify-center font-mono text-[10px] font-black text-slate-700 shrink-0">
                {index + 1}
              </span>

              <input
                type="text"
                value={item}
                onChange={(e) => handleUpdateItem(index, e.target.value)}
                className="flex-1 bg-transparent border-0 font-mono text-xs font-bold text-slate-900 uppercase focus:outline-none focus:bg-white px-2 py-1 rounded"
              />

              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                title="Remove phrase"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
