import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Terminal, Code2, Cpu, Tag, Check, Sparkles, FolderOpen, Bookmark, Layers } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp } from '../ui/VintageStamps';
import { GemSticker } from '../ui/DoodleArrow';

export const SkillsSection = () => {
  const { publishedData } = usePortfolio();
  const categories = publishedData?.skills || [];
  const [activeFilter, setActiveFilter] = useState('all');

  const categoryIcons = {
    'cat-languages': <Terminal className="w-4 h-4 text-amber-900" />,
    'cat-web': <Code2 className="w-4 h-4 text-rose-900" />,
    'cat-cs': <Cpu className="w-4 h-4 text-sky-900" />,
  };

  const categoryColorThemes = {
    'cat-languages': { bg: 'bg-[#FEF08A]/30', border: 'border-amber-300', badge: 'bg-[#FEF08A] text-amber-950' },
    'cat-web': { bg: 'bg-[#FBCFE8]/30', border: 'border-pink-300', badge: 'bg-[#FBCFE8] text-pink-950' },
    'cat-cs': { bg: 'bg-[#BAE6FD]/30', border: 'border-sky-300', badge: 'bg-[#BAE6FD] text-sky-950' },
  };

  // Flatten skills with their parent category info for a dynamic specimen wall
  const allSkillsWithCategory = categories.flatMap(cat => 
    (cat.items || []).map(skill => ({
      ...skill,
      categoryId: cat.id,
      categoryName: cat.category,
    }))
  );

  const displayedSkills = activeFilter === 'all'
    ? allSkillsWithCategory
    : allSkillsWithCategory.filter(s => s.categoryId === activeFilter);

  return (
    <section id="skills" className="py-20 md:py-28 relative bg-[#FAF7F2] border-b-2 border-[#1A1714] bg-graph-paper">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BBF7D0] border-2 border-[#1A1714] font-mono text-xs font-bold text-emerald-950 uppercase tracking-widest mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-emerald-700" />
              <span>Chapter 02 // Repertoire & Capabilities</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
              Technical <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Toolbox</span>
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-xl mt-2">
              Collectible capability tags representing core programming languages, modern frameworks, and foundational computer science principles.
            </p>
          </div>

          {/* Interactive Folder Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#1A1714] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Items ({allSkillsWithCategory.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeFilter === cat.id
                    ? 'bg-[#1A1714] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* SPECIMEN TAG BOARD (Organic Asymmetrical Grid of Collectible Labels) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {displayedSkills.map((item, idx) => {
            const theme = categoryColorThemes[item.categoryId] || { bg: 'bg-white', border: 'border-slate-300', badge: 'bg-slate-100 text-slate-800' };

            return (
              <div
                key={item.id || idx}
                className={`group relative bg-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-1.5 transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden ${theme.bg}`}
              >
                {/* Washi Tape Corner on alternating cards */}
                {idx % 3 === 0 && (
                  <div className="absolute -top-3 right-6 z-10">
                    <WashiTape color="yellow" width="80px" height="20px" rotate={2} />
                  </div>
                )}
                {idx % 3 === 1 && (
                  <div className="absolute -top-3 left-6 z-10">
                    <WashiTape color="pink" width="80px" height="20px" rotate={-2} />
                  </div>
                )}

                <div>
                  {/* Top Eyelet Hole & Category Tag */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-[#1A1714]/15 mb-4">
                    <span className={`text-[10px] font-mono uppercase font-black px-2.5 py-0.5 rounded-full border border-black/20 ${theme.badge}`}>
                      {item.categoryName}
                    </span>
                    
                    {/* Brass eyelet hole graphic */}
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-200 border-2 border-amber-600 shadow-inner" />
                  </div>

                  {/* Skill Name */}
                  <h3 className="font-editorial text-2xl font-black text-slate-900 group-hover:text-rose-600 transition-colors leading-tight">
                    {item.name}
                  </h3>

                  {/* Level Pill */}
                  {item.level && (
                    <div className="mt-2 inline-block">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-700 font-bold border border-slate-300 shadow-2xs">
                        {item.level}
                      </span>
                    </div>
                  )}

                  {/* Practical Notes */}
                  {item.notes && (
                    <p className="text-xs text-slate-600 font-sans leading-relaxed mt-3 pt-2 border-t border-dashed border-slate-200">
                      {item.notes}
                    </p>
                  )}
                </div>

                {/* Bottom Verification Checkmark */}
                <div className="mt-6 pt-3 border-t border-[#1A1714]/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 font-bold text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                  <span className="text-slate-400 font-bold">KLH CSE</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer Banner */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-[#1A1714] shadow-scrapbook text-xs font-mono font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Foundational computer science principles applied across practical software engineering and simulations.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
