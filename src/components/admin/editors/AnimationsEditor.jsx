import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Zap, Play, Eye } from 'lucide-react';

export const AnimationsEditor = () => {
  const { draftData, updateDraft } = usePortfolio();
  const animations = draftData?.animations || {};

  const handleAnimChange = (field, value) => {
    updateDraft(prev => ({
      ...prev,
      animations: {
        ...prev.animations,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="font-editorial text-2xl font-bold text-slate-900">
          Interactions & Motion Dynamics
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Tune entrance animations, duration, hover feedback, and accessibility preferences.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook space-y-5">
        
        {/* Entrance Style */}
        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
            Section Entrance Style
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'editorial-reveal', name: 'Editorial Reveal', desc: 'Smooth vertical translate with spring damping.' },
              { id: 'gentle-fade', name: 'Gentle Fade', desc: 'Subtle opacity transition for peaceful reading.' },
              { id: 'playful-bounce', name: 'Playful Bounce', desc: 'Energetic scrapbook spring with playful tilts.' }
            ].map((style) => (
              <div
                key={style.id}
                onClick={() => handleAnimChange('entranceStyle', style.id)}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  animations.entranceStyle === style.id
                    ? 'border-[#1E1E24] bg-slate-50 shadow-xs font-bold'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="font-editorial text-sm text-slate-900 mb-1">
                  {style.name}
                </div>
                <p className="text-[11px] text-slate-500 font-sans leading-normal">
                  {style.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Animation Duration Slider */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-mono font-bold text-slate-700 uppercase">
              Base Animation Duration
            </label>
            <span className="text-xs font-mono font-bold text-rose-600">
              {animations.duration || 0.6} seconds
            </span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1.5"
            step="0.1"
            value={animations.duration || 0.6}
            onChange={(e) => handleAnimChange('duration', parseFloat(e.target.value))}
            className="w-full cursor-pointer accent-[#1E1E24]"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
            <span>Snappy (0.2s)</span>
            <span>Balanced (0.6s)</span>
            <span>Cinematic (1.5s)</span>
          </div>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="pt-3 border-t border-slate-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={animations.reducedMotion || false}
              onChange={(e) => handleAnimChange('reducedMotion', e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-slate-900"
            />
            <div>
              <span className="text-xs font-mono font-bold text-slate-800 block">
                Force Reduced Motion
              </span>
              <span className="text-[11px] font-sans text-slate-500">
                Disables floating keyframes and heavy translates for maximum accessibility.
              </span>
            </div>
          </label>
        </div>

      </div>

    </div>
  );
};
