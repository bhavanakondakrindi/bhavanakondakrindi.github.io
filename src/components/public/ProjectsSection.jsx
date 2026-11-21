import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  ArrowUpRight,
  Bookmark,
  Plane,
  Compass,
  BookOpen,
  Leaf,
  Wallet,
  Code2,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp, RibbonBow } from '../ui/VintageStamps';
import { GemSticker, SparkleStar } from '../ui/DoodleArrow';

export const ProjectsSection = () => {
  const { publishedData, setActiveProjectModal } = usePortfolio();
  const rawProjects = publishedData?.projects || [];

  // Helper to safely get project by index or title keyword
  const p1 = rawProjects[0] || {}; // Airline Disruption
  const p2 = rawProjects[1] || {}; // SkyRoute Drone
  const p3 = rawProjects[2] || {}; // StudyForge (Tall right column in sketch)
  const p4 = rawProjects[3] || {}; // EcoQuest (Bottom left in sketch)
  const p5 = rawProjects[4] || {}; // Personal Finance Manager (Bottom center left in sketch)
  const p6 = rawProjects[5] || {
    id: "proj-algo-visualizer",
    title: "Algorithmic Graph Visualizer",
    subtitle: "Interactive Data Structures & Pathfinding Engine",
    category: "CS Foundations & Tools",
    color: "#FFE4E6",
    summary: "Real-time interactive traversal visualizer exploring BFS, DFS, Dijkstra, and A* pathfinding algorithms.",
    technologies: ["JavaScript", "HTML5 Canvas", "DSA", "Algorithms"],
    image: "https://images.unsplash.com/photo-1516116211227-bbc3834f8e56?auto=format&fit=crop&w=1200&q=80"
  };

  return (
    <section id="projects" className="py-16 md:py-24 relative bg-[#FAF7F2] border-b-2 border-[#1A1714] bg-graph-paper">
      
      {/* Whimsical Bedazzling Background Accents */}
      <div className="absolute top-10 left-6 pointer-events-none hidden lg:block">
        <GemSticker type="diamond" size={32} />
      </div>
      <div className="absolute top-16 right-10 pointer-events-none hidden lg:block">
        <GemSticker type="pink-moon" size={36} />
      </div>
      <div className="absolute bottom-12 left-10 pointer-events-none hidden lg:block">
        <GemSticker type="butterfly" size={34} />
      </div>
      <div className="absolute bottom-16 right-8 pointer-events-none hidden lg:block">
        <GemSticker type="topaz" size={30} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF08A] border-2 border-[#1A1714] font-mono text-xs font-bold text-amber-950 uppercase tracking-widest mb-2 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-amber-700" />
              <span>Chapter 03 // Sticky Note Project Desk</span>
            </div>
            
            <div className="relative inline-block">
              <h2 className="font-editorial text-4xl sm:text-5xl font-black text-[#1A1714] tracking-tight">
                Selected <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Works</span>
              </h2>
              <div className="absolute -top-3 -right-6 pointer-events-none">
                <SparkleStar size={24} color="#FDE047" />
              </div>
            </div>

            <p className="text-slate-600 font-sans text-sm max-w-xl mt-1">
              Click any project sticky note to inspect full architecture diagrams, objectives, and problem dossiers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border-2 border-[#1A1714] shadow-xs">
              📌 6 Interactive Dossiers
            </span>
            <div className="hidden sm:block">
              <PostmarkStamp text="FIELD SPEC" date="2025" color="#0284C7" rotate={-4} />
            </div>
          </div>
        </div>

        {/* =========================================================================
            STICKY NOTE GRID MOSAIC (Exact Layout From Hand-Drawn Sketch)
            - Column 1: Project 1 (top) + Project 4 (bottom)
            - Column 2: Project 2 (top wide) + Project 5 & Project 6 (bottom side-by-side)
            - Column 3: Project 3 (tall full-height right column)
            - Crisp, non-blunted paper edges (rounded-lg) with realistic sticky tape!
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ==========================================
              COLUMN 1 (Left): Project 1 & Project 4
             ========================================== */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            
            {/* PROJECT 1 (Top Left Sticky Note - Canary Yellow) */}
            <div
              onClick={() => setActiveProjectModal(p1)}
              className="group relative bg-[#FEF9C3] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between transform -rotate-1 hover:rotate-0 overflow-visible"
            >
              {/* Sticky Tape at Top Center (Uncut, no overflow clipping!) */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <WashiTape color="yellow" width="90px" height="20px" rotate={1} />
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded border border-amber-300">
                    PROJECT // 01
                  </span>
                  <Plane className="w-4 h-4 text-sky-700" />
                </div>

                <h3 className="font-editorial text-lg font-black text-slate-900 leading-snug group-hover:text-rose-700 transition-colors">
                  {p1.title || "Airline Disruption Management"}
                </h3>

                <p className="font-sans text-xs text-slate-700 line-clamp-2 leading-relaxed">
                  {p1.summary || "Operations dashboard managing flight delays, passenger re-accommodations, and meal vouchers."}
                </p>

                {/* Compact Screenshot Inset */}
                {p1.image && (
                  <div className="rounded-md overflow-hidden border border-[#1A1714] aspect-[16/9] bg-slate-900 relative mt-1">
                    <img
                      src={p1.image}
                      alt={p1.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Bottom Tags */}
              <div className="pt-3 mt-2 border-t border-amber-300/80 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-950">
                  React.js • Operations
                </span>
                <span className="w-6 h-6 rounded bg-white border border-[#1A1714] flex items-center justify-center text-slate-800 shadow-xs group-hover:bg-[#1A1714] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* PROJECT 4 (Bottom Left Sticky Note - Mint Green) */}
            <div
              onClick={() => setActiveProjectModal(p4)}
              className="group relative bg-[#DCFCE7] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 flex-1 flex flex-col justify-between transform rotate-0.5 hover:rotate-0 overflow-visible"
            >
              {/* Sticky Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <WashiTape color="green" width="90px" height="20px" rotate={-1} />
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-emerald-950 bg-emerald-200/60 px-2 py-0.5 rounded border border-emerald-300">
                    PROJECT // 04
                  </span>
                  <Leaf className="w-4 h-4 text-emerald-700" />
                </div>

                <h3 className="font-editorial text-lg font-black text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                  {p4.title || "EcoQuest"}
                </h3>

                <p className="font-sans text-xs text-slate-700 leading-relaxed">
                  {p4.summary || "Waste-management and community recycling platform promoting sustainable urban disposal."}
                </p>

                {/* Screenshot Inset */}
                {p4.image && (
                  <div className="rounded-md overflow-hidden border border-[#1A1714] aspect-[16/10] bg-slate-900 relative mt-1">
                    <img
                      src={p4.image}
                      alt={p4.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Bottom Tags */}
              <div className="pt-3 mt-2 border-t border-emerald-300/80 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-950">
                  React.js • Recycling
                </span>
                <span className="w-6 h-6 rounded bg-white border border-[#1A1714] flex items-center justify-center text-slate-800 shadow-xs group-hover:bg-[#1A1714] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>

          {/* ==============================================================
              COLUMN 2 (Center): Project 2 (Wide Top) & Projects 5 + 6 (Bottom)
             ============================================================== */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* PROJECT 2 (Top Center Wide Sticky Note - Sky Blue) */}
            <div
              onClick={() => setActiveProjectModal(p2)}
              className="group relative bg-[#E0F2FE] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-5 flex flex-col justify-between transform -rotate-0.5 hover:rotate-0 overflow-visible"
            >
              {/* Sticky Tape at Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <WashiTape color="blue" width="130px" height="22px" rotate={-1} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-1">
                
                {/* Left Description (7 cols) */}
                <div className="sm:col-span-7 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-sky-950 bg-sky-200/70 px-2.5 py-0.5 rounded border border-sky-300">
                      PROJECT // 02 • AI SIMULATION
                    </span>
                    <Compass className="w-4 h-4 text-sky-700" />
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl font-black text-slate-900 leading-tight group-hover:text-sky-800 transition-colors">
                    {p2.title || "SkyRoute: AI Smart Drone Delivery"}
                  </h3>

                  <p className="font-sans text-xs text-slate-700 leading-relaxed">
                    {p2.summary || "Intelligent drone pathfinding simulation balancing dynamic weather, wind drag vectors, and battery management."}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p2.technologies?.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/80 border border-sky-300 text-sky-950">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Image Inset (5 cols) */}
                <div className="sm:col-span-5">
                  <div className="rounded-md overflow-hidden border border-[#1A1714] aspect-[16/10] bg-slate-950 relative shadow-sm">
                    <img
                      src={p2.image}
                      alt={p2.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-2 text-[10px] font-mono text-cyan-200 font-bold">
                      A* Dynamic Routing
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Footer Strip */}
              <div className="pt-3 mt-3 border-t border-sky-300/80 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-sky-950">
                  Python • Pygame • A* Pathfinding
                </span>
                <span className="text-xs font-bold text-sky-800 flex items-center gap-1 group-hover:underline">
                  Examine Simulation ↗
                </span>
              </div>
            </div>

            {/* BOTTOM CENTER ROW: Projects 5 & 6 (Side-by-side squares) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              
              {/* PROJECT 5 (Peach Sticky Note - Personal Finance Manager) */}
              <div
                onClick={() => setActiveProjectModal(p5)}
                className="group relative bg-[#FFEDD5] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between transform rotate-1 hover:rotate-0 overflow-visible"
              >
                {/* Sticky Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <WashiTape color="coral" width="80px" height="18px" rotate={-2} />
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-orange-950 bg-orange-200/60 px-2 py-0.5 rounded border border-orange-300">
                      PROJECT // 05
                    </span>
                    <Wallet className="w-4 h-4 text-orange-700" />
                  </div>

                  <h3 className="font-editorial text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-orange-800 transition-colors">
                    {p5.title || "Personal Finance Manager"}
                  </h3>

                  <p className="font-sans text-xs text-slate-700 line-clamp-2 leading-relaxed">
                    {p5.summary || "Java-based OOP personal finance ledger tracking expenditures and savings."}
                  </p>

                  {p5.image && (
                    <div className="rounded-md overflow-hidden border border-[#1A1714] aspect-[16/9] bg-slate-900 relative">
                      <img
                        src={p5.image}
                        alt={p5.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="pt-2 mt-2 border-t border-orange-300/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-orange-950">
                    Java • OOP • Ledger
                  </span>
                  <span className="w-6 h-6 rounded bg-white border border-[#1A1714] flex items-center justify-center text-slate-800 shadow-xs group-hover:bg-[#1A1714] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* PROJECT 6 (Soft Rose Sticky Note - Algorithmic Visualizer) */}
              <div
                onClick={() => setActiveProjectModal(p6)}
                className="group relative bg-[#FFE4E6] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between transform -rotate-1 hover:rotate-0 overflow-visible"
              >
                {/* Sticky Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <WashiTape color="pink" width="80px" height="18px" rotate={2} />
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-rose-950 bg-rose-200/60 px-2 py-0.5 rounded border border-rose-300">
                      PROJECT // 06
                    </span>
                    <Cpu className="w-4 h-4 text-rose-700" />
                  </div>

                  <h3 className="font-editorial text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-rose-800 transition-colors">
                    {p6.title || "Algorithmic Graph Visualizer"}
                  </h3>

                  <p className="font-sans text-xs text-slate-700 line-clamp-2 leading-relaxed">
                    {p6.summary || "Interactive traversal engine tracing graph algorithms, trees, and pathfinding states."}
                  </p>

                  {p6.image && (
                    <div className="rounded-md overflow-hidden border border-[#1A1714] aspect-[16/9] bg-slate-900 relative">
                      <img
                        src={p6.image}
                        alt={p6.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1516116211227-bbc3834f8e56?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="pt-2 mt-2 border-t border-rose-300/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-rose-950">
                    JavaScript • DSA
                  </span>
                  <span className="w-6 h-6 rounded bg-white border border-[#1A1714] flex items-center justify-center text-slate-800 shadow-xs group-hover:bg-[#1A1714] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* ==============================================================
              COLUMN 3 (Right): Project 3 (Tall Full-Height Sticky Note)
             ============================================================== */}
          <div className="lg:col-span-3 flex flex-col">
            
            {/* PROJECT 3 (Lavender Tall Sticky Note - StudyForge) */}
            <div
              onClick={() => setActiveProjectModal(p3)}
              className="group relative bg-[#F3E8FF] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-5 h-full flex flex-col justify-between transform rotate-1 hover:rotate-0 overflow-visible"
            >
              {/* Lavender Sticky Tape at Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <WashiTape color="lavender" width="100px" height="20px" rotate={-1} />
              </div>

              {/* Binder Clip on Top Right */}
              <div className="absolute -top-4 right-4 z-20 pointer-events-none hidden sm:block">
                <BinderClip type="lavender" rotate={4} />
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-purple-950 bg-purple-200/70 px-2.5 py-0.5 rounded border border-purple-300">
                    PROJECT // 03 • PLATFORM
                  </span>
                  <BookOpen className="w-4 h-4 text-purple-700" />
                </div>

                <h3 className="font-editorial text-2xl font-black text-slate-900 leading-tight group-hover:text-purple-900 transition-colors">
                  {p3.title || "StudyForge"}
                </h3>

                <p className="font-sans text-xs text-slate-700 leading-relaxed">
                  {p3.summary || "Collaborative learning platform facilitating resource sharing, study rooms, and peer accountability."}
                </p>

                {/* Vertical/Tall Image Inset */}
                {p3.image && (
                  <div className="rounded-md overflow-hidden border border-[#1A1714] aspect-[4/3] bg-slate-900 relative my-2">
                    <img
                      src={p3.image}
                      alt={p3.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-purple-200 font-bold">
                      Collaborative Study Room
                    </div>
                  </div>
                )}

                <div className="p-3 rounded bg-white/70 border border-purple-200 space-y-1 text-xs">
                  <span className="font-mono text-[10px] font-bold text-purple-900 uppercase block">
                    Core Architecture:
                  </span>
                  <ul className="text-[11px] text-slate-700 space-y-1">
                    <li>▸ Modular Subject Hubs</li>
                    <li>▸ Collaborative Workspaces</li>
                    <li>▸ Peer Progress Milestones</li>
                  </ul>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="pt-3 mt-3 border-t border-purple-300/80 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-purple-950">
                  React.js • Web Platform
                </span>
                <span className="w-7 h-7 rounded bg-white border border-[#1A1714] flex items-center justify-center text-slate-800 shadow-xs group-hover:bg-[#1A1714] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
