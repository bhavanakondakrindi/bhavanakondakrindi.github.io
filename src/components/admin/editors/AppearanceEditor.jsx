import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Palette, Check, Sparkles, Layout, Eye, MousePointer } from 'lucide-react';

export const AppearanceEditor = () => {
  const { draftData, updateDraft, activeThemeId, setActiveThemeId } = usePortfolio();
  const appearance = draftData?.appearance || {};
  const themes = appearance?.themes || [];
  const visibility = draftData?.sectionsVisibility || {};

  const currentTheme = themes.find(t => t.id === activeThemeId) || themes[0];

  const handleThemeSelect = (themeId) => {
    setActiveThemeId(themeId);
    updateDraft(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        activeTheme: themeId
      }
    }));
  };

  const handleCustomColor = (key, value) => {
    const updatedThemes = themes.map(t => {
      if (t.id === activeThemeId) {
        return { ...t, [key]: value };
      }
      return t;
    });

    updateDraft(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        themes: updatedThemes
      }
    }));
  };

  const toggleSection = (sectionKey) => {
    updateDraft(prev => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [sectionKey]: !prev.sectionsVisibility?.[sectionKey]
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Appearance, Palettes & Identity
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          The color identity is fully flexible. Select from curated editorial palettes or customize individual hex codes.
        </p>
      </div>

      {/* Curated Theme Presets */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <h3 className="font-editorial text-lg font-bold text-slate-900">
          Curated Visual Palettes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {themes.map((t) => (
            <div
              key={t.id}
              onClick={() => handleThemeSelect(t.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                activeThemeId === t.id
                  ? 'border-[#1E1E24] shadow-scrapbook bg-slate-50'
                  : 'border-slate-200 hover:border-slate-400 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-editorial font-bold text-sm text-slate-900">
                  {t.name}
                </span>
                {activeThemeId === t.id && (
                  <span className="p-1 rounded-full bg-[#1E1E24] text-white">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Color swatches preview */}
              <div className="flex items-center gap-1.5 h-6 rounded-lg overflow-hidden border border-slate-300">
                <div className="flex-1 h-full" style={{ backgroundColor: t.bgPrimary }} title="Primary Background" />
                <div className="flex-1 h-full" style={{ backgroundColor: t.bgSurface }} title="Surface" />
                <div className="flex-1 h-full" style={{ backgroundColor: t.accent }} title="Accent" />
                <div className="flex-1 h-full" style={{ backgroundColor: t.textPrimary }} title="Text" />
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{t.paperType || 'graph-paper'}</span>
                {t.tag && <span className="font-bold text-rose-600">{t.tag}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Color Pickers for Active Palette */}
      {currentTheme && (
        <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
          <h3 className="font-editorial text-lg font-bold text-slate-900">
            Custom Hex Colors for "{currentTheme.name}"
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Background Primary
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.bgPrimary || '#FAF7F2'}
                  onChange={(e) => handleCustomColor('bgPrimary', e.target.value)}
                  className="w-9 h-9 rounded border border-black/20 cursor-pointer"
                />
                <input
                  type="text"
                  value={currentTheme.bgPrimary || '#FAF7F2'}
                  onChange={(e) => handleCustomColor('bgPrimary', e.target.value)}
                  className="w-28 px-2 py-1 text-xs font-mono uppercase rounded border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Card / Surface Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.bgSurface || '#FFFFFF'}
                  onChange={(e) => handleCustomColor('bgSurface', e.target.value)}
                  className="w-9 h-9 rounded border border-black/20 cursor-pointer"
                />
                <input
                  type="text"
                  value={currentTheme.bgSurface || '#FFFFFF'}
                  onChange={(e) => handleCustomColor('bgSurface', e.target.value)}
                  className="w-28 px-2 py-1 text-xs font-mono uppercase rounded border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Primary Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.accent || '#F43F5E'}
                  onChange={(e) => handleCustomColor('accent', e.target.value)}
                  className="w-9 h-9 rounded border border-black/20 cursor-pointer"
                />
                <input
                  type="text"
                  value={currentTheme.accent || '#F43F5E'}
                  onChange={(e) => handleCustomColor('accent', e.target.value)}
                  className="w-28 px-2 py-1 text-xs font-mono uppercase rounded border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Text Primary (Ink)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.textPrimary || '#1E1E24'}
                  onChange={(e) => handleCustomColor('textPrimary', e.target.value)}
                  className="w-9 h-9 rounded border border-black/20 cursor-pointer"
                />
                <input
                  type="text"
                  value={currentTheme.textPrimary || '#1E1E24'}
                  onChange={(e) => handleCustomColor('textPrimary', e.target.value)}
                  className="w-28 px-2 py-1 text-xs font-mono uppercase rounded border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                Text Muted
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentTheme.textMuted || '#64748B'}
                  onChange={(e) => handleCustomColor('textMuted', e.target.value)}
                  className="w-9 h-9 rounded border border-black/20 cursor-pointer"
                />
                <input
                  type="text"
                  value={currentTheme.textMuted || '#64748B'}
                  onChange={(e) => handleCustomColor('textMuted', e.target.value)}
                  className="w-28 px-2 py-1 text-xs font-mono uppercase rounded border border-slate-300"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Typography & Cursor Settings */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <h3 className="font-editorial text-lg font-bold text-slate-900">
          Typography & Interactive Cursor
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Heading Font Pairing
            </label>
            <select
              value={appearance.fontFamilyHeading || 'editorial'}
              onChange={(e) => {
                updateDraft(prev => ({
                  ...prev,
                  appearance: { ...prev.appearance, fontFamilyHeading: e.target.value }
                }));
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
            >
              <option value="editorial">Fraunces (Editorial High-Contrast Serif)</option>
              <option value="serif">Playfair Display (Classic Elegant Serif)</option>
              <option value="display">Space Grotesk (Modern Geometric Display)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
              Desktop Custom Cursor
            </label>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={appearance.customCursorEnabled !== false}
                onChange={(e) => {
                  updateDraft(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, customCursorEnabled: e.target.checked }
                  }));
                }}
                className="w-4 h-4 rounded border-slate-300 text-slate-900"
              />
              <span className="text-xs font-mono text-slate-800">
                Enable small elegant circular cursor on desktop
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Section Visibility Toggles */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-4">
        <h3 className="font-editorial text-lg font-bold text-slate-900">
          Section Visibility Controls
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['hero', 'about', 'skills', 'projects', 'education', 'contact'].map((sec) => (
            <label
              key={sec}
              className={`p-3 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-colors ${
                visibility[sec] !== false
                  ? 'border-[#1E1E24] bg-slate-50'
                  : 'border-slate-200 bg-white opacity-60'
              }`}
            >
              <span className="font-mono text-xs uppercase font-bold text-slate-800">
                {sec}
              </span>
              <input
                type="checkbox"
                checked={visibility[sec] !== false}
                onChange={() => toggleSection(sec)}
                className="w-4 h-4 rounded"
              />
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};
