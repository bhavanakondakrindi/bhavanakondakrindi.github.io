import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Terminal, Code2, Cpu, Tag, Check, Sparkles, FolderOpen, Bookmark } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp } from '../ui/VintageStamps';
import { GemSticker } from '../ui/DoodleArrow';

export const SkillsSection = () => {
  const { publishedData } = usePortfolio();
  const categories = publishedData?.skills || [];
  const [activeTab, setActiveTab] = useState('all');

  const categoryIcons = {
    'cat-languages': <Terminal className="w-5 h-5 text-amber-900" />,
    'cat-web': <Code2 className="w-5 h-5 text-rose-900" />,
    'cat-cs': <Cpu className="w-5 h-5 text-sky-900" />,
  };

  const folderColors = {
    'cat-languages': { bg: '#FEF9C3', tabBg: '#FEF08A', border: '#CA8A04' },
    'cat-web': { bg: '#FDF2F8', tabBg: '#FBCFE8', border: '#DB2777' },
    'cat-cs': { bg: '#F0F9FF', tabBg: '#BAE6FD', border: '#0284C7' },
  };

  const filteredCategories = activeTab === 'all'
    ? categories
    : categories.filter(c => c.id === activeTab);

  return (
    <section id="skills" className="py-20 md:py-28 relative bg-[#FAF7F2] border-b-2 border-[#1A1714] bg-graph-paper">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#BBF7D0] border-2 border-[#1A1714] font-mono text-xs font-bold text-emerald-950 uppercase tracking-widest mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-emerald-700" />
              <span>Chapter 02 // Repertoire & Capabilities</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
              Technical <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Toolbox</span>
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-xl mt-2">
              Collectible capability labels and verified proficiencies. No fabricated percentage bars or arbitrary ratings.
            </p>
          </div>

          {/* Interactive Folder File Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#1A1714] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Folders ({categories.reduce((acc, c) => acc + (c.items?.length || 0), 0)})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === cat.id
                    ? 'bg-[#1A1714] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Archival Filing Folders Grid (Reference 8) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {filteredCategories.map((cat, idx) => {
            const styling = folderColors[cat.id] || { bg: '#FFFFFF', tabBg: '#FEF08A', border: '#1A1714' };

            return (
              <div
                key={cat.id || idx}
                className="relative rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-scrapbook-xl"
                style={{ backgroundColor: styling.bg }}
              >
                {/* File Folder Tab Sticking Up (Reference 8) */}
                <div
                  className="absolute -top-7 left-6 px-4 py-1 rounded-t-xl border-2 border-[#1A1714] border-b-0 font-mono text-[11px] font-black uppercase tracking-wider flex items-center gap-2 shadow-xs"
                  style={{ backgroundColor: styling.tabBg }}
                >
                  <span>FILE {idx + 1}</span>
                  <span className="opacity-40">•</span>
                  <span>{cat.items?.length || 0} ITEMS</span>
                </div>

                {/* Top Corner Washi Tape */}
                <div className="absolute -top-3 right-6 z-10">
                  <WashiTape
                    color={idx === 0 ? 'yellow' : idx === 1 ? 'pink' : 'blue'}
                    width="100px"
                    height="22px"
                    rotate={idx % 2 === 0 ? 3 : -3}
                  />
                </div>

                <div>
                  {/* Category Header */}
                  <div className="pt-2 pb-5 border-b-2 border-[#1A1714]/15 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#1A1714] shadow-xs flex items-center justify-center">
                        {categoryIcons[cat.id] || <Tag className="w-5 h-5 text-slate-800" />}
                      </div>
                      <div>
                        <h3 className="font-editorial text-2xl font-black text-slate-900 leading-tight">
                          {cat.category}
                        </h3>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                          Core Academic Repertoire
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Collectible Specimen Badges */}
                  <div className="space-y-3.5">
                    {cat.items?.map((item) => (
                      <div
                        key={item.id}
                        className="group bg-white p-4 rounded-2xl border-2 border-[#1A1714]/20 hover:border-[#1A1714] hover:shadow-scrapbook transition-all"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-editorial font-bold text-lg text-slate-900 group-hover:text-rose-600 transition-colors">
                            {item.name}
                          </span>
                          {item.level && (
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold border border-slate-300">
                              {item.level}
                            </span>
                          )}
                        </div>

                        {item.notes && (
                          <p className="text-xs text-slate-600 font-sans leading-relaxed">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Folder Footer Stamp */}
                <div className="mt-8 pt-4 border-t-2 border-dashed border-[#1A1714]/20 flex items-center justify-between text-xs font-mono text-slate-600">
                  <span className="flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active Competency</span>
                  </span>
                  <span className="text-slate-400 font-bold">KLH CSE</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-[#1A1714] shadow-scrapbook text-xs font-mono font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>All skills are applied across practical applications, academic coursework, and software simulations.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
