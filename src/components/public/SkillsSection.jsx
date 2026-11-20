import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Code2, Terminal, Cpu, Layers, Sparkles, Tag, Check } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PaperStamp } from '../ui/PaperStamp';

export const SkillsSection = () => {
  const { publishedData } = usePortfolio();
  const categories = publishedData?.skills || [];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryIcons = {
    'cat-languages': <Terminal className="w-4 h-4 text-amber-700" />,
    'cat-web': <Code2 className="w-4 h-4 text-pink-700" />,
    'cat-cs': <Cpu className="w-4 h-4 text-sky-700" />,
  };

  const filteredCategories = selectedCategory === 'all'
    ? categories
    : categories.filter(c => c.id === selectedCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative bg-[#FAF7F2] border-b-2 border-[#1E1E24]/10 bg-graph-paper">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#BBF7D0] border border-emerald-400 font-mono text-xs font-bold text-emerald-950 uppercase tracking-widest mb-3">
              <span>Chapter 02</span>
              <span>•</span>
              <span>Technical Repertoire</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl font-black text-[#1E1E24] tracking-tight">
              Skills & <span className="italic font-serif font-normal text-rose-600">Toolbox</span>
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-xl mt-2">
              Collectible skill labels representing core languages, frameworks, and foundational computer science concepts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/90 p-1.5 rounded-full border-2 border-[#1E1E24] shadow-scrapbook">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#1E1E24] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Skills
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#1E1E24] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat, idx) => (
            <div
              key={cat.id || idx}
              className="relative bg-white rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-scrapbook-lg flex flex-col justify-between"
              style={{
                backgroundColor: cat.color ? `${cat.color}15` : '#FFFFFF'
              }}
            >
              {/* Top Washi Tape accent */}
              <div className="absolute -top-3 left-8">
                <WashiTape
                  color={idx % 3 === 0 ? 'yellow' : idx % 3 === 1 ? 'pink' : 'blue'}
                  width="90px"
                  height="22px"
                  rotate={idx % 2 === 0 ? -2 : 2}
                />
              </div>

              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pt-2 mb-6 border-b border-[#1E1E24]/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-white border border-[#1E1E24]/20 shadow-xs">
                      {categoryIcons[cat.id] || <Tag className="w-4 h-4 text-slate-700" />}
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-slate-900">
                      {cat.category}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white border border-slate-300 text-slate-600 font-bold">
                    {cat.items?.length || 0} skills
                  </span>
                </div>

                {/* Collectible Skill Stamps & Cards */}
                <div className="space-y-3">
                  {cat.items?.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white p-3.5 rounded-xl border border-[#1E1E24]/20 hover:border-[#1E1E24] hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-editorial font-bold text-base text-slate-900 group-hover:text-rose-600 transition-colors">
                          {item.name}
                        </span>
                        {item.level && (
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                            {item.level}
                          </span>
                        )}
                      </div>

                      {item.notes && (
                        <p className="text-xs text-slate-500 font-sans leading-relaxed">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Scrapbook Stamp */}
              <div className="mt-6 pt-3 border-t border-dashed border-slate-300 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Verified Core Competency</span>
                <span className="text-emerald-700 font-bold">✓ Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note at bottom */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-300 text-xs font-mono text-slate-600">
            <span>💡 All skills are continuously practiced and expanded through academic coursework and real-world projects.</span>
          </p>
        </div>

      </div>
    </section>
  );
};
