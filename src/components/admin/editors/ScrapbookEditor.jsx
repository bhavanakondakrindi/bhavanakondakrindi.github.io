import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import {
  Sparkles,
  Paperclip,
  Stamp,
  Grid,
  Eye,
  EyeOff,
  RotateCw,
  Sliders,
  Check,
  RotateCcw,
  Search,
  Plus,
  Trash2,
  Tag
} from 'lucide-react';
import { GemSticker, SparkleStar } from '../../ui/DoodleArrow';
import { WashiTape } from '../../ui/WashiTape';
import { BinderClip } from '../../ui/BinderClip';
import { PostmarkStamp, CherriesSticker, RibbonBow, EditorialBarcode } from '../../ui/VintageStamps';
import { initialPortfolioData } from '../../../data/initialPortfolioData';

export const ScrapbookEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const appearance = draftData?.appearance || {};
  const stickers = appearance?.individualStickers || initialPortfolioData.appearance.individualStickers || {};

  const [activeSectionFilter, setActiveSectionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Update a single property on a specific sticker
  const updateSticker = (stickerId, field, value) => {
    updateDraft(prev => {
      const currentStickers = prev.appearance?.individualStickers || initialPortfolioData.appearance.individualStickers || {};
      const currentSticker = currentStickers[stickerId] || {};

      return {
        ...prev,
        appearance: {
          ...prev.appearance,
          individualStickers: {
            ...currentStickers,
            [stickerId]: {
              ...currentSticker,
              [field]: value
            }
          }
        }
      };
    });
  };

  // Toggle visibility of a specific sticker
  const toggleStickerVisibility = (stickerId) => {
    const current = stickers[stickerId]?.visible !== false;
    updateSticker(stickerId, 'visible', !current);
  };

  // Bulk toggle for all visible in current section
  const handleBulkToggle = (newVisibility) => {
    updateDraft(prev => {
      const currentStickers = { ...(prev.appearance?.individualStickers || initialPortfolioData.appearance.individualStickers || {}) };
      
      filteredStickerList.forEach(s => {
        if (currentStickers[s.id]) {
          currentStickers[s.id] = { ...currentStickers[s.id], visible: newVisibility };
        }
      });

      return {
        ...prev,
        appearance: {
          ...prev.appearance,
          individualStickers: currentStickers
        }
      };
    });
  };

  // Reset all stickers to factory defaults
  const handleResetToDefaults = () => {
    if (window.confirm('Reset all stickers to their original positions and visibility?')) {
      updateDraft(prev => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          individualStickers: initialPortfolioData.appearance.individualStickers
        }
      }));
    }
  };

  // Convert stickers object to array for filtering
  const stickerList = Object.values(stickers);

  const filteredStickerList = stickerList.filter(s => {
    const matchesSection = activeSectionFilter === 'all' || s.section === activeSectionFilter;
    const matchesSearch = !searchQuery.trim() || 
      s.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.section?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesSearch;
  });

  // Render live SVG sticker preview based on type
  const renderStickerPreview = (s) => {
    const rotate = s.rotate || 0;
    const size = s.size || 32;

    switch (s.type) {
      case 'cherries':
        return <CherriesSticker size={size} />;
      case 'ribbon-bow':
        return <RibbonBow />;
      case 'sparkle-star':
        return <SparkleStar size={size} color={s.color || '#FDE047'} />;
      case 'barcode':
        return <EditorialBarcode />;
      case 'postmark':
        return <PostmarkStamp text={s.text || 'STAMP'} date={s.date || '2025'} color={s.color || '#DC2626'} rotate={rotate} />;
      case 'washi':
        return <WashiTape color={s.color || 'yellow'} width="90px" height="20px" rotate={rotate} />;
      case 'binder-clip':
        return <BinderClip type={s.color || 'pink-binder'} rotate={rotate} />;
      case 'wax-seal':
        return (
          <div className="w-10 h-10 rounded-full bg-[#FEF08A] border-2 border-[#1A1714] shadow-xs flex flex-col items-center justify-center">
            <span className="font-editorial font-black text-xs text-amber-950">BK</span>
            <span className="text-[5px] font-mono font-bold text-amber-900 uppercase">SEAL</span>
          </div>
        );
      default:
        // Gems: diamond, ruby, emerald, amethyst, topaz, pink-moon, butterfly
        return <GemSticker type={s.type || 'diamond'} size={size} />;
    }
  };

  const sectionCounts = {
    all: stickerList.length,
    hero: stickerList.filter(s => s.section === 'hero').length,
    about: stickerList.filter(s => s.section === 'about').length,
    skills: stickerList.filter(s => s.section === 'skills').length,
    projects: stickerList.filter(s => s.section === 'projects').length,
    education: stickerList.filter(s => s.section === 'education').length,
    contact: stickerList.filter(s => s.section === 'contact').length,
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Scrapbook & Individual Sticker Studio
          </h2>
          <p className="text-xs font-mono text-slate-500 mt-1">
            Complete editing access for every individual sticker, washi tape strip, gem, and clip on the website.
          </p>
        </div>

        <button
          onClick={handleResetToDefaults}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset All to Defaults</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
        
        {/* Section Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Stickers' },
            { id: 'hero', label: 'Hero' },
            { id: 'about', label: 'About Journal' },
            { id: 'skills', label: 'Skills' },
            { id: 'projects', label: 'Projects' },
            { id: 'education', label: 'Education' },
            { id: 'contact', label: 'Contact' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSectionFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeSectionFilter === tab.id
                  ? 'bg-[#1A1714] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeSectionFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {sectionCounts[tab.id] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Bulk Action Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sticker by name, type, or color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs font-sans focus:outline-none focus:border-[#1A1714]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkToggle(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold hover:bg-emerald-100 flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Show All ({filteredStickerList.length})</span>
            </button>
            <button
              onClick={() => handleBulkToggle(false)}
              className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-300 text-xs font-mono font-bold hover:bg-rose-100 flex items-center gap-1"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Hide All</span>
            </button>
          </div>
        </div>

      </div>

      {/* =========================================================================
          INDIVIDUAL STICKER CARDS GRID
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStickerList.map((s) => {
          const isVisible = s.visible !== false;

          return (
            <div
              key={s.id}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-4 ${
                isVisible
                  ? 'bg-white border-[#1A1714] shadow-scrapbook'
                  : 'bg-slate-50 border-slate-300 opacity-60'
              }`}
            >
              {/* Top Row: Preview & Identity */}
              <div className="flex items-start gap-4">
                
                {/* Live SVG Visual Preview Frame */}
                <div className="w-16 h-16 rounded-xl bg-[#FAF7F2] border-2 border-[#1A1714]/20 flex items-center justify-center p-2 shrink-0 shadow-inner relative overflow-hidden">
                  <div style={{ transform: `rotate(${s.rotate || 0}deg)` }} className="transition-transform duration-200">
                    {renderStickerPreview(s)}
                  </div>
                </div>

                {/* Identity & Section Tag */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-950 border border-purple-200">
                      {s.section}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 truncate">
                      #{s.id}
                    </span>
                  </div>

                  <h4 className="font-editorial font-bold text-sm text-slate-900 mt-1 leading-snug">
                    {s.label}
                  </h4>

                  <span className="text-[11px] font-mono text-slate-500 capitalize">
                    {s.category}: {s.type} {s.color ? `(${s.color})` : ''}
                  </span>
                </div>

                {/* Visibility Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleStickerVisibility(s.id)}
                  className={`p-2 rounded-xl border-2 font-mono text-xs font-bold transition-colors ${
                    isVisible
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-400 hover:bg-emerald-100'
                      : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
                  }`}
                  title={isVisible ? 'Click to Hide Sticker' : 'Click to Show Sticker'}
                >
                  {isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Bottom Customization Controls (Only if visible) */}
              {isVisible && (
                <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* Rotation Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                      <span className="flex items-center gap-1">
                        <RotateCw className="w-3 h-3 text-slate-400" />
                        <span>Rotation</span>
                      </span>
                      <span className="font-bold">{s.rotate || 0}°</span>
                    </div>
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      value={s.rotate || 0}
                      onChange={(e) => updateSticker(s.id, 'rotate', parseInt(e.target.value, 10))}
                      className="w-full accent-slate-900 cursor-pointer h-1.5"
                    />
                  </div>

                  {/* Size or Color customization */}
                  {s.category === 'gem' || s.category === 'sparkle' || s.type === 'cherries' ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                        <span>Size</span>
                        <span className="font-bold">{s.size || 32}px</span>
                      </div>
                      <input
                        type="range"
                        min="16"
                        max="52"
                        value={s.size || 32}
                        onChange={(e) => updateSticker(s.id, 'size', parseInt(e.target.value, 10))}
                        className="w-full accent-slate-900 cursor-pointer h-1.5"
                      />
                    </div>
                  ) : s.category === 'washi' ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                        <span>Tape Color</span>
                        <span className="font-bold capitalize">{s.color || 'yellow'}</span>
                      </div>
                      <select
                        value={s.color || 'yellow'}
                        onChange={(e) => updateSticker(s.id, 'color', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-mono bg-white"
                      >
                        <option value="yellow">Yellow Washi</option>
                        <option value="pink">Pink Washi</option>
                        <option value="blue">Blue Washi</option>
                        <option value="lavender">Lavender Washi</option>
                        <option value="green">Green Washi</option>
                        <option value="coral">Coral Washi</option>
                      </select>
                    </div>
                  ) : s.category === 'clip' ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                        <span>Clip Type</span>
                        <span className="font-bold capitalize">{s.color || 'pink-binder'}</span>
                      </div>
                      <select
                        value={s.color || 'pink-binder'}
                        onChange={(e) => updateSticker(s.id, 'color', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-slate-300 text-xs font-mono bg-white"
                      >
                        <option value="pink-binder">Pink Binder Clip</option>
                        <option value="black-clip">Black Metal Clamp</option>
                        <option value="lavender">Lavender Bulldog</option>
                      </select>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end text-[11px] font-mono text-slate-400 pt-3">
                      <span>Standard Preset</span>
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
