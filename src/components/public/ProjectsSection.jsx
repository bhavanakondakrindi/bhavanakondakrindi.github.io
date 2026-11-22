import React, { useRef, useState, useEffect, useCallback } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { initialPortfolioData } from '../../data/initialPortfolioData';
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
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  Sliders
} from 'lucide-react';
import { Github } from '../ui/BrandIcons';
import { DynamicSticker } from '../ui/DynamicSticker';

export const ProjectsSection = () => {
  const { publishedData, setActiveProjectModal } = usePortfolio();
  const headings = publishedData?.sectionHeadings || {};
  
  // All projects from publishedData (ensuring all user-added projects 7, 8+ are included!)
  const rawProjects = publishedData?.projects && publishedData.projects.length > 0
    ? publishedData.projects
    : initialPortfolioData.projects;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const gridContainerRef = useRef(null);
  const cardsRef = useRef([]);

  // Projects for the primary 6-project sketch layout
  const p1 = rawProjects[0] || {};
  const p2 = rawProjects[1] || {};
  const p3 = rawProjects[2] || {};
  const p4 = rawProjects[3] || {};
  const p5 = rawProjects[4] || {};
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

  // Additional projects (e.g. Project 7, Project 8, Project 9...) added in Admin
  const extraProjects = rawProjects.slice(6);

  // Group extra projects into 2-card vertical columns and 3-card clusters matching the sketch rhythm
  const extraColumns = [];
  for (let i = 0; i < extraProjects.length; i += 2) {
    extraColumns.push({
      top: extraProjects[i],
      bottom: extraProjects[i + 1] || null,
      colIndex: Math.floor(i / 2) + 4
    });
  }

  // Smooth 3D depth computation during horizontal right-to-left motion
  const update3DTransforms = useCallback(() => {
    const container = gridContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerWidth = containerRect.width;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll > 10) {
      const progress = Math.min(100, Math.max(0, (container.scrollLeft / maxScroll) * 100));
      setScrollProgress(progress);
      setCanScrollLeft(container.scrollLeft > 15);
      setCanScrollRight(container.scrollLeft < maxScroll - 15);
    } else {
      setScrollProgress(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }

    // Apply continuous 3D receding transform as cards move toward the left edge
    cardsRef.current.forEach((cardEl) => {
      if (!cardEl) return;
      const cardRect = cardEl.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distFromLeft = cardCenter - containerLeft;
      const normalizedLeft = distFromLeft / containerWidth;

      // When card reaches the left side of the screen/desk (normalizedLeft < 0.28)
      if (normalizedLeft < 0.28) {
        const recedeRatio = Math.max(0, Math.min(1, (0.28 - normalizedLeft) / 0.28));
        const scale = 1 - recedeRatio * 0.14;  // scales down to 0.86
        const translateZ = -recedeRatio * 80;   // sinks into screen to -80px
        const rotateY = recedeRatio * 10;       // gentle 3D tilt
        const opacity = 1 - recedeRatio * 0.55; // softens to 0.45

        cardEl.style.transform = `perspective(1200px) translate3d(0, 0, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`;
        cardEl.style.opacity = `${opacity}`;
      } else {
        // Focused prominence
        cardEl.style.transform = 'perspective(1200px) translate3d(0, 0, 0px) scale(1) rotateY(0deg)';
        cardEl.style.opacity = '1';
      }
    });
  }, []);

  // Set up passive scroll and resize listeners with requestAnimationFrame
  useEffect(() => {
    const container = gridContainerRef.current;
    if (!container) return;

    let ticking = false;
    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update3DTransforms();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Initial calculation
    update3DTransforms();

    return () => {
      container.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [update3DTransforms, rawProjects.length]);

  // Convert vertical mouse wheel into smooth sideways scrolling without jumping
  const handleWheel = (e) => {
    const container = gridContainerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 5) return; // If all columns fit on screen, let vertical scroll pass through

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
      container.scrollLeft += e.deltaY * 0.85;
    }
  };

  // Stepping navigation arrows
  const scrollStep = (direction) => {
    const container = gridContainerRef.current;
    if (!container) return;
    const stepAmount = container.clientWidth * 0.65;
    container.scrollBy({
      left: direction === 'left' ? -stepAmount : stepAmount,
      behavior: 'smooth'
    });
  };

  // Clickable scrubber slider track
  const handleScrubberClick = (e) => {
    const container = gridContainerRef.current;
    if (!container) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({
      left: clickRatio * maxScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="projects"
      className="py-16 md:py-24 relative border-b-2 border-[#1A1714] bg-graph-paper overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary, #FAF7F2)' }}
    >
      {/* Whimsical Bedazzling Background Accents */}
      <DynamicSticker id="proj_gem_diamond" className="absolute top-10 left-6 pointer-events-none hidden lg:block" />
      <DynamicSticker id="proj_gem_moon" className="absolute top-16 right-10 pointer-events-none hidden lg:block" />
      <DynamicSticker id="proj_gem_butterfly" className="absolute bottom-12 left-10 pointer-events-none hidden lg:block" />
      <DynamicSticker id="proj_gem_topaz" className="absolute bottom-16 right-8 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF08A] border-2 border-[#1A1714] font-mono text-xs font-bold text-amber-950 uppercase tracking-widest mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-amber-700" />
              <span>{headings.projectsBadge || "Chapter 03 // Sticky Note Project Desk"}</span>
            </div>
            
            <div className="relative inline-block">
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
                {headings.projectsTitleMain || "Selected"}{' '}
                <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">
                  {headings.projectsTitleAccent || "Works"}
                </span>
              </h2>
              <div className="absolute -top-3 -right-6 pointer-events-none">
                <DynamicSticker id="proj_sparkle" />
              </div>
            </div>

            <p className="text-slate-600 font-sans text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
              {headings.projectsSubtitle || "Tactile project mosaic arranged as a personal workspace desk. Click any sticky note to inspect full architecture diagrams and problem dossiers."}
            </p>
          </div>

          {/* Right Header Controls: Dynamic Count & Smooth Steppers */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-800 bg-white px-3.5 py-2 rounded-xl border-2 border-[#1A1714] shadow-scrapbook">
              📌 {rawProjects.length} Interactive Dossiers
            </span>

            {/* Stepper buttons (active whenever grid has scrollable horizontal width) */}
            {(canScrollLeft || canScrollRight || extraProjects.length > 0) && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollStep('left')}
                  disabled={!canScrollLeft}
                  className="w-9 h-9 rounded-xl border-2 border-[#1A1714] bg-white shadow-scrapbook flex items-center justify-center text-slate-800 hover:bg-slate-100 disabled:opacity-35 transition-all"
                  aria-label="Previous projects"
                  title="Move projects right"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollStep('right')}
                  disabled={!canScrollRight}
                  className="w-9 h-9 rounded-xl border-2 border-[#1A1714] bg-white shadow-scrapbook flex items-center justify-center text-slate-800 hover:bg-slate-100 disabled:opacity-35 transition-all"
                  aria-label="Next projects"
                  title="Move projects left"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="hidden sm:block">
              <DynamicSticker id="proj_postmark" />
            </div>
          </div>
        </div>

        {/* =========================================================================
            STICKY NOTE GRID MOSAIC (Exact Layout From Hand-Drawn Sketch)
            - Column 1: Project 1 (top) + Project 4 (bottom)
            - Column 2: Project 2 (top wide) + Project 5 & Project 6 (bottom side-by-side)
            - Column 3: Project 3 (tall full-height right column)
            - Additional Columns: New added projects (P7, P8, etc.) sit in grid rhythm
            - As you move/scroll from right to left, cards on the left edge smoothly recede
              into the screen with 3D depth, and new projects glide in without any jumps!
           ========================================================================= */}
        <div
          ref={gridContainerRef}
          onWheel={handleWheel}
          className="runway-perspective overflow-x-auto hide-scrollbar scroll-smooth flex items-stretch gap-5 py-4 px-1 overscroll-x-contain cursor-grab active:cursor-grabbing select-none"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '20% 50%',
            WebkitOverflowScrolling: 'touch'
          }}
        >

          {/* ==============================================================
              COLUMN 1 (Left in Sketch): Project 1 & Project 4
             ============================================================== */}
          <div className="w-[300px] sm:w-[320px] lg:w-[26%] flex-shrink-0 flex flex-col gap-5">
            
            {/* PROJECT 1 (Top Left Sticky Note - Canary Yellow) */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              onClick={() => setActiveProjectModal(p1)}
              className="group relative bg-[#FEF9C3] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between transform -rotate-1 hover:rotate-0 overflow-visible will-change-transform"
              style={{
                transition: 'transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.28s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Sticky Tape at Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <DynamicSticker id="proj_tape_p1" />
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
              ref={(el) => (cardsRef.current[3] = el)}
              onClick={() => setActiveProjectModal(p4)}
              className="group relative bg-[#DCFCE7] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 flex-1 flex flex-col justify-between transform rotate-0.5 hover:rotate-0 overflow-visible will-change-transform"
              style={{
                transition: 'transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.28s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Sticky Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <DynamicSticker id="proj_tape_p4" />
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
              COLUMN 2 (Center in Sketch): Project 2 (Wide Top) & Projects 5 + 6 (Bottom)
             ============================================================== */}
          <div className="w-[500px] sm:w-[580px] lg:w-[48%] flex-shrink-0 flex flex-col gap-5">
            
            {/* PROJECT 2 (Top Center Wide Sticky Note - Sky Blue) */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              onClick={() => setActiveProjectModal(p2)}
              className="group relative bg-[#E0F2FE] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-5 flex flex-col justify-between transform -rotate-0.5 hover:rotate-0 overflow-visible will-change-transform"
              style={{
                transition: 'transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.28s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Sticky Tape at Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <DynamicSticker id="proj_tape_p2" />
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
                ref={(el) => (cardsRef.current[4] = el)}
                onClick={() => setActiveProjectModal(p5)}
                className="group relative bg-[#FFEDD5] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between transform rotate-1 hover:rotate-0 overflow-visible will-change-transform"
                style={{
                  transition: 'transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.28s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Sticky Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <DynamicSticker id="proj_tape_p5" />
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
                ref={(el) => (cardsRef.current[5] = el)}
                onClick={() => setActiveProjectModal(p6)}
                className="group relative bg-[#FFE4E6] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between transform -rotate-1 hover:rotate-0 overflow-visible will-change-transform"
                style={{
                  transition: 'transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.28s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Sticky Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <DynamicSticker id="proj_tape_p6" />
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
              COLUMN 3 (Right in Sketch): Project 3 (Tall Full-Height Sticky Note)
             ============================================================== */}
          <div className="w-[300px] sm:w-[320px] lg:w-[26%] flex-shrink-0 flex flex-col">
            
            {/* PROJECT 3 (Lavender Tall Sticky Note - StudyForge) */}
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              onClick={() => setActiveProjectModal(p3)}
              className="group relative bg-[#F3E8FF] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-5 h-full flex flex-col justify-between transform rotate-1 hover:rotate-0 overflow-visible will-change-transform"
              style={{
                transition: 'transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.28s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Lavender Sticky Tape at Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <DynamicSticker id="proj_tape_p3" />
              </div>

              {/* Binder Clip on Top Right */}
              <div className="absolute -top-4 right-4 z-20 pointer-events-none hidden sm:block">
                <DynamicSticker id="proj_clip_p3" />
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

          {/* ==============================================================
              ADDITIONAL GRID COLUMNS (For New User-Added Projects 7, 8, etc.)
              - The grid stays in the exact same rhythm!
              - If user adds projects, they are appended in the grid to the right
              - When moving from right to left, they smoothly glide in!
             ============================================================== */}
          {extraColumns.map((colGroup, gIdx) => {
            const topProj = colGroup.top;
            const bottomProj = colGroup.bottom;
            const topNum = String(6 + gIdx * 2 + 1).padStart(2, '0');
            const bottomNum = String(6 + gIdx * 2 + 2).padStart(2, '0');

            return (
              <div
                key={`extra-col-${gIdx}`}
                className="w-[300px] sm:w-[320px] lg:w-[26%] flex-shrink-0 flex flex-col gap-5"
              >
                {/* Top Card of Extra Column */}
                {topProj && (
                  <div
                    ref={(el) => (cardsRef.current[6 + gIdx * 2] = el)}
                    onClick={() => setActiveProjectModal(topProj)}
                    className="group relative bg-[#FEF9C3] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between transform -rotate-1 hover:rotate-0 overflow-visible will-change-transform"
                    style={{
                      transition: 'transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.28s ease, box-shadow 0.2s ease'
                    }}
                  >
                    {/* Washi Tape Header */}
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 pointer-events-none z-20 shadow-xs"
                      style={{
                        backgroundColor: 'rgba(254, 240, 138, 0.9)',
                        clipPath: 'polygon(0% 2px, 3% 0, 7% 3px, 12% 0, 88% 0, 93% 3px, 97% 0, 100% 2px, 100% calc(100% - 2px), 96% 100%, 91% calc(100% - 3px), 10% 100%, 4% calc(100% - 2px), 0% 100%)'
                      }}
                    />

                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded border border-amber-300">
                          PROJECT // {topNum}
                        </span>
                        <Code2 className="w-4 h-4 text-amber-700" />
                      </div>

                      <h3 className="font-editorial text-lg font-black text-slate-900 leading-snug group-hover:text-rose-700 transition-colors">
                        {topProj.title}
                      </h3>

                      <p className="font-sans text-xs text-slate-700 line-clamp-2 leading-relaxed">
                        {topProj.summary || topProj.problemStatement}
                      </p>

                      {topProj.image && (
                        <div className="rounded-md overflow-hidden border border-[#1A1714] aspect-[16/9] bg-slate-900 relative mt-1">
                          <img
                            src={topProj.image}
                            alt={topProj.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                    </div>

                    <div className="pt-3 mt-2 border-t border-amber-300/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-950 truncate max-w-[170px]">
                        {topProj.technologies?.slice(0, 3).join(' • ') || topProj.category}
                      </span>
                      <span className="w-6 h-6 rounded bg-white border border-[#1A1714] flex items-center justify-center text-slate-800 shadow-xs group-hover:bg-[#1A1714] group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                )}

                {/* Bottom Card of Extra Column */}
                {bottomProj && (
                  <div
                    ref={(el) => (cardsRef.current[6 + gIdx * 2 + 1] = el)}
                    onClick={() => setActiveProjectModal(bottomProj)}
                    className="group relative bg-[#DCFCE7] rounded-lg border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 flex-1 flex flex-col justify-between transform rotate-0.5 hover:rotate-0 overflow-visible will-change-transform"
                    style={{
                      transition: 'transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.28s ease, box-shadow 0.2s ease'
                    }}
                  >
                    {/* Washi Tape Header */}
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 pointer-events-none z-20 shadow-xs"
                      style={{
                        backgroundColor: 'rgba(187, 247, 208, 0.9)',
                        clipPath: 'polygon(0% 2px, 3% 0, 7% 3px, 12% 0, 88% 0, 93% 3px, 97% 0, 100% 2px, 100% calc(100% - 2px), 96% 100%, 91% calc(100% - 3px), 10% 100%, 4% calc(100% - 2px), 0% 100%)'
                      }}
                    />

                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-black uppercase tracking-wider text-emerald-950 bg-emerald-200/60 px-2 py-0.5 rounded border border-emerald-300">
                          PROJECT // {bottomNum}
                        </span>
                        <Layers className="w-4 h-4 text-emerald-700" />
                      </div>

                      <h3 className="font-editorial text-lg font-black text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                        {bottomProj.title}
                      </h3>

                      <p className="font-sans text-xs text-slate-700 leading-relaxed">
                        {bottomProj.summary || bottomProj.problemStatement}
                      </p>

                      {bottomProj.image && (
                        <div className="rounded-md overflow-hidden border border-[#1A1714] aspect-[16/10] bg-slate-900 relative mt-1">
                          <img
                            src={bottomProj.image}
                            alt={bottomProj.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                    </div>

                    <div className="pt-3 mt-2 border-t border-emerald-300/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-950 truncate max-w-[170px]">
                        {bottomProj.technologies?.slice(0, 3).join(' • ') || bottomProj.category}
                      </span>
                      <span className="w-6 h-6 rounded bg-white border border-[#1A1714] flex items-center justify-center text-slate-800 shadow-xs group-hover:bg-[#1A1714] group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Footer Glide Track: Visible when additional projects exist or on mobile/tablet */}
        {(canScrollLeft || canScrollRight || extraProjects.length > 0) && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 px-2 border-t border-[#1A1714]/10 pt-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 font-bold">
              <span>◀ Move or wheel horizontally to glide across grid</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-800">{Math.round(scrollProgress)}% viewed</span>
            </div>

            {/* Clickable Scrubber Slider Track */}
            <div
              onClick={handleScrubberClick}
              className="w-full sm:w-64 h-3 bg-white border-2 border-[#1A1714] rounded-full overflow-hidden p-0.5 cursor-pointer relative shadow-inner"
              title="Click anywhere to scrub desk"
            >
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-150"
                style={{ width: `${Math.max(10, scrollProgress)}%` }}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollStep('left')}
                disabled={!canScrollLeft}
                className="px-3 py-1 text-xs font-mono font-bold bg-white border border-[#1A1714] rounded hover:bg-slate-100 disabled:opacity-30"
              >
                ← Prev
              </button>
              <button
                onClick={() => scrollStep('right')}
                disabled={!canScrollRight}
                className="px-3 py-1 text-xs font-mono font-bold bg-white border border-[#1A1714] rounded hover:bg-slate-100 disabled:opacity-30"
              >
                Next Projects →
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
