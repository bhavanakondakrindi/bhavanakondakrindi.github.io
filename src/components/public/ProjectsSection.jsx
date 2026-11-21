import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  ArrowUpRight,
  Sparkles,
  Bookmark,
  Layers,
  Plane,
  Compass,
  BookOpen,
  Leaf,
  Wallet,
  ExternalLink,
  Code2,
  CheckCircle2,
  Cpu,
  FolderOpen
} from 'lucide-react';
import { Github } from '../ui/BrandIcons';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp, RibbonBow } from '../ui/VintageStamps';
import { GemSticker } from '../ui/DoodleArrow';

export const ProjectsSection = () => {
  const { publishedData, setActiveProjectModal } = usePortfolio();
  const projects = publishedData?.projects || [];
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(p => {
        if (selectedFilter === 'web') return p.category?.toLowerCase().includes('web') || p.technologies?.includes('React.js');
        if (selectedFilter === 'ai') return p.title?.toLowerCase().includes('drone') || p.category?.toLowerCase().includes('ai') || p.category?.toLowerCase().includes('smart');
        if (selectedFilter === 'systems') return p.category?.toLowerCase().includes('software') || p.technologies?.includes('Java');
        return true;
      });

  // Highlight icons for project categories
  const getProjectIcon = (title = '') => {
    const t = title.toLowerCase();
    if (t.includes('airline')) return <Plane className="w-5 h-5 text-sky-600" />;
    if (t.includes('drone') || t.includes('route')) return <Compass className="w-5 h-5 text-indigo-600" />;
    if (t.includes('study') || t.includes('forge')) return <BookOpen className="w-5 h-5 text-purple-600" />;
    if (t.includes('eco') || t.includes('quest')) return <Leaf className="w-5 h-5 text-emerald-600" />;
    if (t.includes('finance') || t.includes('manager')) return <Wallet className="w-5 h-5 text-amber-600" />;
    return <Layers className="w-5 h-5 text-rose-600" />;
  };

  return (
    <section id="projects" className="py-20 md:py-32 relative bg-[#FAF7F2] border-b-2 border-[#1A1714] bg-graph-paper">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Editorial Badge & Timestamp */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF08A] border-2 border-[#1A1714] font-mono text-xs font-bold text-amber-950 uppercase tracking-widest mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-amber-700" />
              <span>Chapter 03 // Engineering Case Studies & Systems</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
              Selected <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Works</span>
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-xl mt-2">
              End-to-end software implementations, operational disruption management tools, pathfinding simulations, and practical utility engines.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'web', label: 'Web Applications' },
              { id: 'ai', label: 'AI & Pathfinding' },
              { id: 'systems', label: 'OOP & Systems' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedFilter === f.id
                    ? 'bg-[#1A1714] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            BESPOKE ASYMMETRICAL EDITORIAL GALLERY
           ========================================================================= */}
        <div className="space-y-12">
          
          {/* 1. HERO SPOTLIGHT CARD (Featured Landmark: Airline Disruption or First Item) */}
          {filteredProjects.length > 0 && (
            <div className="relative rounded-3xl bg-white border-3 border-[#1A1714] shadow-scrapbook-xl overflow-hidden">
              
              {/* Top Washi Tape accent */}
              <div className="absolute -top-3 left-16 z-20">
                <WashiTape color="yellow" width="140px" height="26px" rotate={-2} />
              </div>

              {/* Ribbon Bow on top-right */}
              <div className="absolute -top-4 right-8 z-20 hidden sm:block">
                <RibbonBow rotate={8} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Left Area: Editorial Project Summary (7 cols) */}
                <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded bg-[#FEF08A] border border-amber-300 text-amber-950 uppercase tracking-wider">
                        EXHIBIT #01 • FLAGSHIP PROTOTYPE
                      </span>
                      <span className="font-mono text-xs text-slate-500 font-semibold">
                        {filteredProjects[0].category}
                      </span>
                    </div>

                    <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                      {filteredProjects[0].title}
                    </h3>

                    <p className="font-sans text-slate-700 text-base leading-relaxed">
                      {filteredProjects[0].problemStatement || filteredProjects[0].summary}
                    </p>

                    {/* Key Technical Features Checklist */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                        Engineered Capabilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-800">
                        {filteredProjects[0].features?.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="pt-6 border-t-2 border-[#1A1714]/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {filteredProjects[0].technologies?.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-300 font-mono text-[11px] font-bold text-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveProjectModal(filteredProjects[0])}
                      className="px-5 py-2.5 rounded-xl bg-[#1A1714] text-white hover:bg-slate-800 font-mono text-xs font-bold flex items-center gap-2 shadow-xs transition-all hover:scale-102"
                    >
                      <span>Examine Case File</span>
                      <ArrowUpRight className="w-4 h-4 text-yellow-300" />
                    </button>
                  </div>

                </div>

                {/* Right Area: Interactive Screenshot Inset with Blueprint Frame (5 cols) */}
                <div
                  onClick={() => setActiveProjectModal(filteredProjects[0])}
                  className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 flex flex-col justify-between border-t-2 lg:border-t-0 lg:border-l-3 border-[#1A1714] cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                    <span className="font-bold flex items-center gap-1.5 text-white">
                      {getProjectIcon(filteredProjects[0].title)}
                      <span>SYSTEM MONITOR</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      LIVE SPEC
                    </span>
                  </div>

                  {/* Project Image Frame */}
                  <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-white/20 aspect-[16/10] bg-slate-900 shadow-2xl group-hover:border-white/50 transition-colors">
                    <img
                      src={filteredProjects[0].image}
                      alt={filteredProjects[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-mono">
                      <span className="truncate">{filteredProjects[0].subtitle}</span>
                      <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold">
                        Click to expand
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>STATUS: OPERATIONAL DISPATCH</span>
                    <span className="text-yellow-300 font-bold flex items-center gap-1">
                      View Dossier ↗
                    </span>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* 2. ASYMMETRICAL TWO-COLUMN SPREAD (SkyRoute & StudyForge) */}
          {filteredProjects.length > 2 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Item: SkyRoute (Aerospace & Simulation Card) - 7 cols */}
              <div className="md:col-span-7 bg-[#0F172A] text-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl p-7 sm:p-9 relative overflow-hidden flex flex-col justify-between space-y-6">
                
                {/* Washi Tape */}
                <div className="absolute -top-3 left-10">
                  <WashiTape color="blue" width="120px" height="24px" rotate={1} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800 font-bold uppercase">
                      EXHIBIT #02 // ALGORITHMIC SIMULATION
                    </span>
                    <span className="text-slate-400 font-bold">A* PATHFINDING</span>
                  </div>

                  <h3 className="font-editorial text-3xl sm:text-4xl font-black text-white leading-tight">
                    {filteredProjects[1].title}
                  </h3>

                  <p className="text-slate-300 font-sans text-sm leading-relaxed">
                    {filteredProjects[1].summary}
                  </p>

                  {/* Screenshot frame */}
                  <div
                    onClick={() => setActiveProjectModal(filteredProjects[1])}
                    className="relative rounded-2xl overflow-hidden border-2 border-cyan-900 aspect-video cursor-pointer group"
                  >
                    <img
                      src={filteredProjects[1].image}
                      alt={filteredProjects[1].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1517976487507-5b3bb113295e?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-xs font-mono text-cyan-300 font-bold">
                      Dynamic Weather & Battery Matrix
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {filteredProjects[1].technologies?.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveProjectModal(filteredProjects[1])}
                    className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Right Item: StudyForge (Soft Lavender Journal Card) - 5 cols */}
              <div className="md:col-span-5 bg-[#FAF5FF] text-slate-900 rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl p-7 relative flex flex-col justify-between space-y-6">
                
                {/* Binder Clip */}
                <div className="absolute -top-4 right-8">
                  <BinderClip type="lavender" rotate={-4} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-purple-900">
                    <span className="px-2.5 py-1 rounded bg-[#E9D5FF] border border-purple-300 font-bold uppercase">
                      EXHIBIT #03 // COLLABORATIVE
                    </span>
                    <span className="font-bold">PEER HUB</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                    {filteredProjects[2].title}
                  </h3>

                  <p className="text-slate-700 font-sans text-xs sm:text-sm leading-relaxed">
                    {filteredProjects[2].summary}
                  </p>

                  {/* Screenshot frame */}
                  <div
                    onClick={() => setActiveProjectModal(filteredProjects[2])}
                    className="relative rounded-2xl overflow-hidden border-2 border-[#1A1714] aspect-video cursor-pointer group shadow-sm"
                  >
                    <img
                      src={filteredProjects[2].image}
                      alt={filteredProjects[2].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 text-[11px] font-mono text-white font-bold">
                      Study Room & Note Collaboration
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-[#1A1714]/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {filteredProjects[2].technologies?.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-mono text-[10px] font-bold border border-purple-200">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveProjectModal(filteredProjects[2])}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1A1714] text-white hover:bg-slate-800 font-mono text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* 3. PAIRED ASYMMETRICAL CARDS (EcoQuest & Personal Finance Manager) */}
          {filteredProjects.length > 4 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* EcoQuest - Mint Ecological Card (5 cols) */}
              <div className="md:col-span-5 bg-[#F0FDF4] text-slate-900 rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl p-7 relative flex flex-col justify-between space-y-6">
                
                <div className="absolute -top-3 left-8">
                  <WashiTape color="green" width="110px" height="22px" rotate={-2} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-900">
                    <span className="px-2.5 py-1 rounded bg-[#DCFCE7] border border-emerald-300 font-bold uppercase">
                      EXHIBIT #04 // SUSTAINABILITY
                    </span>
                    <span className="font-bold">GAMIFIED</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                    {filteredProjects[3].title}
                  </h3>

                  <p className="text-slate-700 font-sans text-xs sm:text-sm leading-relaxed">
                    {filteredProjects[3].summary}
                  </p>

                  <div
                    onClick={() => setActiveProjectModal(filteredProjects[3])}
                    className="relative rounded-2xl overflow-hidden border-2 border-[#1A1714] aspect-video cursor-pointer group shadow-sm"
                  >
                    <img
                      src={filteredProjects[3].image}
                      alt={filteredProjects[3].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 text-[11px] font-mono text-white font-bold">
                      Eco-Tracker & Rewards Engine
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-[#1A1714]/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {filteredProjects[3].technologies?.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold border border-emerald-200">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveProjectModal(filteredProjects[3])}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1A1714] text-white hover:bg-slate-800 font-mono text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Personal Finance Manager - Warm Ledger Card (7 cols) */}
              <div className="md:col-span-7 bg-[#FFFBEB] text-slate-900 rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl p-7 sm:p-9 relative flex flex-col justify-between space-y-6">
                
                <div className="absolute -top-3 right-10">
                  <WashiTape color="pink" width="130px" height="24px" rotate={2} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-950">
                    <span className="px-2.5 py-1 rounded bg-[#FEF3C7] border border-amber-300 font-bold uppercase">
                      EXHIBIT #05 // FINANCIAL LEDGER
                    </span>
                    <span className="font-bold">JAVA OOP</span>
                  </div>

                  <h3 className="font-editorial text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                    {filteredProjects[4].title}
                  </h3>

                  <p className="text-slate-700 font-sans text-sm leading-relaxed">
                    {filteredProjects[4].summary}
                  </p>

                  <div
                    onClick={() => setActiveProjectModal(filteredProjects[4])}
                    className="relative rounded-2xl overflow-hidden border-2 border-[#1A1714] aspect-video cursor-pointer group shadow-sm"
                  >
                    <img
                      src={filteredProjects[4].image}
                      alt={filteredProjects[4].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-xs font-mono text-white font-bold">
                      OOP Encapsulation & Expense Tracking
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-[#1A1714]/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {filteredProjects[4].technologies?.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 font-mono text-[11px] font-bold border border-amber-200">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveProjectModal(filteredProjects[4])}
                    className="px-4 py-2 rounded-xl bg-[#1A1714] text-white hover:bg-slate-800 font-mono text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Examine Case File</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-yellow-300" />
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
};
