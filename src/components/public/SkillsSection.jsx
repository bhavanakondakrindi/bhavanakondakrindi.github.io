import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Terminal,
  Code2,
  Cpu,
  Bookmark,
  Sparkles,
  CheckCircle2,
  Layers,
  Check,
  FolderOpen,
  ArrowRight
} from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp, RibbonBow } from '../ui/VintageStamps';
import { GemSticker } from '../ui/DoodleArrow';

export const SkillsSection = () => {
  const { publishedData } = usePortfolio();
  const categories = publishedData?.skills || [];

  // Descriptive highlights for each skill to make them tangible without fake percentages
  const skillHighlights = {
    'Java': 'OOP Architecture, Class Hierarchies, Enterprise Foundations',
    'Python': 'Simulation Scripts, A* Pathfinding, Pygame Engines',
    'JavaScript': 'ES6+ Syntax, Asynchronous Flow, Interactive DOM',
    'React.js': 'Component Architecture, Hooks, State Lifecycle',
    'HTML': 'Semantic Web Standards, Accessible Markup',
    'CSS': 'Responsive Layouts, Custom Animations, Papercraft UI',
    'Data Structures and Algorithms': 'Arrays, Linked Lists, Trees, Graph Traversal',
    'Object-Oriented Programming': 'Encapsulation, Polymorphism, Modular Design',
  };

  const getFolderTheme = (idx) => {
    switch (idx % 3) {
      case 0:
        return {
          bg: 'bg-[#FFFBEB]',
          border: 'border-amber-300',
          badge: 'bg-[#FEF3C7] text-amber-950 border-amber-300',
          tapeColor: 'yellow',
          icon: <Terminal className="w-5 h-5 text-amber-800" />,
          accent: '#B45309'
        };
      case 1:
        return {
          bg: 'bg-[#FFF1F2]',
          border: 'border-rose-300',
          badge: 'bg-[#FFE4E6] text-rose-950 border-rose-300',
          tapeColor: 'pink',
          icon: <Code2 className="w-5 h-5 text-rose-800" />,
          accent: '#BE123C'
        };
      default:
        return {
          bg: 'bg-[#F0F9FF]',
          border: 'border-sky-300',
          badge: 'bg-[#E0F2FE] text-sky-950 border-sky-300',
          tapeColor: 'blue',
          icon: <Cpu className="w-5 h-5 text-sky-800" />,
          accent: '#0369A1'
        };
    }
  };

  return (
    <section id="skills" className="py-20 md:py-32 relative bg-[#FAF7F2] border-b-2 border-[#1A1714] bg-graph-paper">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BBF7D0] border-2 border-[#1A1714] font-mono text-xs font-bold text-emerald-950 uppercase tracking-widest mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-emerald-700" />
              <span>Chapter 02 // Repertoire & Technical Toolbox</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
              Technical <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Toolbox</span>
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-xl mt-2">
              Core programming languages, modern web frameworks, and foundational computer science principles—presented honestly without arbitrary ratings.
            </p>
          </div>

          <div className="hidden sm:block">
            <PostmarkStamp text="COMPETENCY ARCHIVE" date="CSE 2025 • VERIFIED" color="#059669" rotate={-3} />
          </div>
        </div>

        {/* =========================================================================
            TACTILE 3-DRAWER SPECIMEN WORKBENCH
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {categories.map((categoryGroup, catIdx) => {
            const theme = getFolderTheme(catIdx);

            return (
              <div
                key={categoryGroup.id || catIdx}
                className={`relative rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl p-7 sm:p-8 flex flex-col justify-between space-y-6 ${theme.bg}`}
              >
                {/* Washi Tape Header */}
                <div className="absolute -top-3 left-10">
                  <WashiTape color={theme.tapeColor} width="120px" height="24px" rotate={catIdx % 2 === 0 ? -2 : 2} />
                </div>

                {/* Folder Top Metadata */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${theme.badge}`}>
                      TRAY #{catIdx + 1}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#1A1714] shadow-xs flex items-center justify-center">
                      {theme.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                      {categoryGroup.category}
                    </h3>
                    <p className="text-xs font-mono text-slate-600 mt-1">
                      {categoryGroup.items?.length || 0} Verified Core Capabilities
                    </p>
                  </div>

                  {/* Collectible Specimen Badges */}
                  <div className="space-y-3 pt-2">
                    {categoryGroup.items?.map((item, itemIdx) => {
                      const desc = skillHighlights[item.name] || 'Practical implementation & active coursework focus';

                      return (
                        <div
                          key={item.id || itemIdx}
                          className="group relative bg-white p-3.5 rounded-2xl border-2 border-[#1A1714] shadow-xs hover:shadow-scrapbook hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-editorial font-bold text-base text-slate-900 group-hover:text-rose-600 transition-colors">
                              {item.name}
                            </span>
                            <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              ACTIVE
                            </span>
                          </div>

                          <p className="text-[11px] font-sans text-slate-600 mt-1 leading-snug">
                            {desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Tray Base Note */}
                <div className="pt-4 border-t-2 border-[#1A1714]/15 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-bold text-slate-800">KLH CSE CURRICULUM</span>
                  <span>CATALOGUED</span>
                </div>

              </div>
            );
          })}

        </div>

        {/* =========================================================================
            TRANSPARENCY MANIFESTO BANNER (Honest Engineering Guarantee)
           ========================================================================= */}
        <div className="mt-12 p-6 sm:p-7 rounded-3xl bg-white border-3 border-[#1A1714] shadow-scrapbook flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#BBF7D0] border-2 border-[#1A1714] shadow-xs flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h4 className="font-editorial font-bold text-slate-900 text-lg">
                Engineering Honesty & Competency Philosophy
              </h4>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Skills are demonstrated through complete, running GitHub repositories and academic systems rather than arbitrary percentages.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700">
              ● Rigorous CS Fundamentals
            </span>
          </div>
        </div>

      </div>

    </section>
  );
};
