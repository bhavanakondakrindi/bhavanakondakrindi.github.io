import React, { useRef, useState, useEffect, useCallback } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { initialPortfolioData } from '../../data/initialPortfolioData';
import {
  ArrowUpRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  Sliders,
  Compass,
  Code2,
  FolderGit2,
  Eye,
  Grid3X3,
  Columns
} from 'lucide-react';
import { Github } from '../ui/BrandIcons';
import { DynamicSticker } from '../ui/DynamicSticker';

// Curated pastel sticky note palettes for authentic scrapbook aesthetic
const STICKY_PALETTES = [
  {
    bg: '#FEF9C3', // Canary Yellow
    tapeBg: 'rgba(254, 240, 138, 0.9)',
    border: '#1A1714',
    tagBg: 'rgba(254, 240, 138, 0.75)',
    tagText: '#713F12',
    accentText: '#854D0E',
    shadow: '4px 6px 0px #1A1714'
  },
  {
    bg: '#E0F2FE', // Sky Blue
    tapeBg: 'rgba(186, 230, 253, 0.9)',
    border: '#1A1714',
    tagBg: 'rgba(186, 230, 253, 0.75)',
    tagText: '#075985',
    accentText: '#0369A1',
    shadow: '4px 6px 0px #1A1714'
  },
  {
    bg: '#F3E8FF', // Lavender Lilac
    tapeBg: 'rgba(233, 213, 255, 0.9)',
    border: '#1A1714',
    tagBg: 'rgba(233, 213, 255, 0.75)',
    tagText: '#581C87',
    accentText: '#6B21A8',
    shadow: '4px 6px 0px #1A1714'
  },
  {
    bg: '#DCFCE7', // Mint Sage
    tapeBg: 'rgba(187, 247, 208, 0.9)',
    border: '#1A1714',
    tagBg: 'rgba(187, 247, 208, 0.75)',
    tagText: '#14532D',
    accentText: '#15803D',
    shadow: '4px 6px 0px #1A1714'
  },
  {
    bg: '#FFE4E6', // Blush Rose
    tapeBg: 'rgba(254, 205, 211, 0.9)',
    border: '#1A1714',
    tagBg: 'rgba(254, 205, 211, 0.75)',
    tagText: '#881337',
    accentText: '#BE123C',
    shadow: '4px 6px 0px #1A1714'
  },
  {
    bg: '#FFEDD5', // Warm Peach
    tapeBg: 'rgba(254, 215, 170, 0.9)',
    border: '#1A1714',
    tagBg: 'rgba(254, 215, 170, 0.75)',
    tagText: '#7C2D12',
    accentText: '#C2410C',
    shadow: '4px 6px 0px #1A1714'
  }
];

export const ProjectsSection = () => {
  const { publishedData, setActiveProjectModal } = usePortfolio();

  // Dynamically load ALL projects - ensuring all added projects are displayed!
  const allProjects = (publishedData?.projects && publishedData.projects.length > 0)
    ? publishedData.projects
    : initialPortfolioData.projects;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('runway'); // 'runway' (3D Sideways Scroll) | 'grid' (Collage Desk)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const runwayRef = useRef(null);
  const cardRefs = useRef([]);

  // Extract unique categories for filter tabs
  const categories = ['All', ...new Set(allProjects.map(p => p.category).filter(Boolean))];

  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory);

  // Smooth 3D depth computation during horizontal scroll
  const update3DTransforms = useCallback(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    const runwayRect = runway.getBoundingClientRect();
    const runwayWidth = runwayRect.width;
    const runwayLeft = runwayRect.left;

    // Calculate overall scroll progress (0 to 100)
    const maxScroll = runway.scrollWidth - runway.clientWidth;
    if (maxScroll > 0) {
      const progress = Math.min(100, Math.max(0, (runway.scrollLeft / maxScroll) * 100));
      setScrollProgress(progress);
      setCanScrollLeft(runway.scrollLeft > 10);
      setCanScrollRight(runway.scrollLeft < maxScroll - 10);
    }

    // 3D Depth calculation for each card
    cardRefs.current.forEach((cardEl) => {
      if (!cardEl) return;
      const cardRect = cardEl.getBoundingClientRect();

      // Card position relative to runway's left edge
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distFromRunwayLeft = cardCenter - runwayLeft;
      const normalizedLeft = distFromRunwayLeft / runwayWidth;

      // When the card is on the left side of the screen / runway (normalizedLeft < 0.35)
      // It smoothly recedes into the screen:
      if (normalizedLeft < 0.35) {
        // As it moves further left, recede into the screen
        const recedeRatio = Math.max(0, Math.min(1, (0.35 - normalizedLeft) / 0.35));
        
        // Depth scale: down to 0.85
        const scale = 1 - recedeRatio * 0.15;
        // Z translation into screen: down to -90px
        const translateZ = -recedeRatio * 90;
        // 3D Y rotation outward: tilts away as it recedes
        const rotateY = recedeRatio * 12;
        // Soft opacity fade: down to 0.45
        const opacity = 1 - recedeRatio * 0.55;

        cardEl.style.transform = `perspective(1200px) translate3d(0, 0, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`;
        cardEl.style.opacity = `${opacity}`;
        cardEl.style.zIndex = Math.round((1 - recedeRatio) * 10);
      } else if (normalizedLeft > 0.85) {
        // Entering from the right
        const enterRatio = Math.max(0, Math.min(1, (normalizedLeft - 0.85) / 0.35));
        const scale = 1 - enterRatio * 0.06;
        const rotateY = -enterRatio * 6;
        const opacity = 1 - enterRatio * 0.25;

        cardEl.style.transform = `perspective(1200px) translate3d(0, 0, 0px) scale(${scale}) rotateY(${rotateY}deg)`;
        cardEl.style.opacity = `${opacity}`;
        cardEl.style.zIndex = 5;
      } else {
        // Focused central reading area: Full prominence and crisp elevation
        cardEl.style.transform = 'perspective(1200px) translate3d(0, 0, 0px) scale(1) rotateY(0deg)';
        cardEl.style.opacity = '1';
        cardEl.style.zIndex = 20;
      }
    });
  }, []);

  // Listen to runway scroll with requestAnimationFrame for 60fps buttery smoothness
  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway || viewMode !== 'runway') return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update3DTransforms();
          ticking = false;
        });
        ticking = true;
      }
    };

    runway.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation
    update3DTransforms();

    return () => {
      runway.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [update3DTransforms, viewMode, filteredProjects.length]);

  // Convert vertical mouse wheel into smooth sideways scrolling over the runway
  const handleWheel = (e) => {
    const runway = runwayRef.current;
    if (!runway || viewMode !== 'runway') return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
      // Natural horizontal scrolling without page jump
      runway.scrollLeft += e.deltaY * 0.85;
    }
  };

  // Nav Arrow buttons for stepping horizontally
  const scrollStep = (direction) => {
    const runway = runwayRef.current;
    if (!runway) return;
    const stepAmount = runway.clientWidth * 0.75;
    runway.scrollBy({
      left: direction === 'left' ? -stepAmount : stepAmount,
      behavior: 'smooth'
    });
  };

  // Interactive scrubber click
  const handleScrubberClick = (e) => {
    const runway = runwayRef.current;
    if (!runway) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const maxScroll = runway.scrollWidth - runway.clientWidth;
    runway.scrollTo({
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
        
        {/* Section Masthead Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF08A] border-2 border-[#1A1714] font-mono text-xs font-bold text-amber-950 uppercase tracking-widest mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-amber-700" />
              <span>Chapter 03 // Interactive Project Runway</span>
            </div>
            
            <div className="relative inline-block">
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
                Selected <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Works</span>
              </h2>
              <div className="absolute -top-3 -right-6 pointer-events-none">
                <DynamicSticker id="proj_sparkle" />
              </div>
            </div>

            <p className="text-slate-600 font-sans text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
              Explore my technical creations. As you scroll sideways, projects on the left recede into the depth of the screen while new works glide in. Click any sticky note to inspect full architectural dossiers.
            </p>
          </div>

          {/* Controls: Counter, View Toggle, Navigation Arrows */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-800 bg-white px-3.5 py-2 rounded-xl border-2 border-[#1A1714] shadow-scrapbook">
              📌 {allProjects.length} Verified Dossiers
            </span>

            {/* View Mode Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-white border-2 border-[#1A1714] shadow-xs">
              <button
                onClick={() => setViewMode('runway')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  viewMode === 'runway'
                    ? 'bg-[#1A1714] text-white shadow-xs'
                    : 'text-slate-600 hover:text-black'
                }`}
                title="3D Sideways Scroll Runway"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3D Runway</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#1A1714] text-white shadow-xs'
                    : 'text-slate-600 hover:text-black'
                }`}
                title="Collage Desk Grid View"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid Desk</span>
              </button>
            </div>

            {/* Runway Left / Right Stepping Arrows */}
            {viewMode === 'runway' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollStep('left')}
                  disabled={!canScrollLeft}
                  className="w-9 h-9 rounded-xl border-2 border-[#1A1714] bg-white shadow-scrapbook flex items-center justify-center text-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition-all"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollStep('right')}
                  disabled={!canScrollRight}
                  className="w-9 h-9 rounded-xl border-2 border-[#1A1714] bg-white shadow-scrapbook flex items-center justify-center text-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition-all"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mr-1 font-bold">
              Filter by:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold border-2 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A1714] text-white border-[#1A1714] shadow-scrapbook'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-[#1A1714]'
                }`}
              >
                {cat} {cat === 'All' ? `(${allProjects.length})` : ''}
              </button>
            ))}
          </div>
        )}

        {/* =========================================================================
            EXPERIENCE A: 3D SIDEWAYS SCROLL RUNWAY (Requested 3D Transition)
            - As user scrolls right-to-left:
            - Left cards recede into screen (translateZ, rotateY, scale down, soft fade)
            - Center cards are crisp and prominent
            - Right cards smoothly slide in with zero jitter
           ========================================================================= */}
        {viewMode === 'runway' && (
          <div className="relative my-4">
            
            {/* The Horizontal Runway */}
            <div
              ref={runwayRef}
              onWheel={handleWheel}
              className="runway-perspective overflow-x-auto hide-scrollbar scroll-smooth flex gap-6 sm:gap-8 items-stretch py-8 px-4 sm:px-6 overscroll-x-contain cursor-grab active:cursor-grabbing select-none"
              style={{
                perspective: '1200px',
                perspectiveOrigin: '25% 50%',
                scrollSnapType: 'none', // Smooth continuous movement without jumpy snapping
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {filteredProjects.map((project, idx) => {
                const palette = STICKY_PALETTES[idx % STICKY_PALETTES.length];
                const projectNum = String(idx + 1).padStart(2, '0');

                return (
                  <div
                    key={project.id || idx}
                    ref={(el) => (cardRefs.current[idx] = el)}
                    onClick={() => setActiveProjectModal(project)}
                    className="group relative flex-shrink-0 w-[310px] sm:w-[380px] rounded-lg border-2 border-[#1A1714] p-5 flex flex-col justify-between cursor-pointer transition-transform duration-200 ease-out will-change-transform"
                    style={{
                      backgroundColor: palette.bg,
                      boxShadow: palette.shadow,
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.28s ease, box-shadow 0.28s ease'
                    }}
                  >
                    {/* Authentic Washi Tape Pinned Across Top Center */}
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 pointer-events-none z-30 shadow-xs"
                      style={{
                        backgroundColor: palette.tapeBg,
                        clipPath: 'polygon(0% 2px, 3% 0, 7% 3px, 12% 0, 88% 0, 93% 3px, 97% 0, 100% 2px, 100% calc(100% - 2px), 96% 100%, 91% calc(100% - 3px), 10% 100%, 4% calc(100% - 2px), 0% 100%)'
                      }}
                    />

                    {/* Top Meta Strip: Number & Category */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <span
                          className="font-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border border-[#1A1714]/20"
                          style={{ backgroundColor: palette.tagBg, color: palette.tagText }}
                        >
                          PROJECT // {projectNum}
                        </span>

                        <span className="font-mono text-[11px] font-bold text-slate-600 flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate max-w-[140px]">{project.category || 'Software'}</span>
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-editorial text-xl sm:text-2xl font-black text-slate-900 leading-tight group-hover:text-rose-600 transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Subtitle / Field */}
                      {project.subtitle && (
                        <p className="font-mono text-xs text-slate-700 font-semibold line-clamp-1">
                          {project.subtitle}
                        </p>
                      )}

                      {/* Project Preview Image Inset */}
                      {project.image && (
                        <div className="rounded-md overflow-hidden border-2 border-[#1A1714] aspect-[16/10] bg-slate-900 relative shadow-inner my-2">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                          {project.badge && (
                            <div className="absolute bottom-2 left-2 text-[10px] font-mono font-bold bg-[#1A1714]/80 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                              {project.badge}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Problem / Summary */}
                      <p className="font-sans text-xs text-slate-700 leading-relaxed line-clamp-3">
                        {project.summary || project.problemStatement}
                      </p>

                      {/* Tech Chips */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.technologies.slice(0, 4).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/80 border border-[#1A1714]/20 text-slate-800"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/50 text-slate-600">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 mt-4 border-t border-[#1A1714]/20 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded bg-white border border-[#1A1714] text-slate-800 hover:bg-[#1A1714] hover:text-white transition-colors"
                            title="View Source on GitHub"
                          >
                            <Github className="w-3.5 h-3.5 fill-current" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded bg-white border border-[#1A1714] text-slate-800 hover:bg-[#1A1714] hover:text-white transition-colors"
                            title="Launch Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProjectModal(project);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1714] text-white font-bold hover:bg-rose-600 transition-colors shadow-xs"
                      >
                        <span>Inspect Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Scrapbook Scrubber Track at Bottom */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 font-bold">
                <span>◀ Slide or wheel horizontally</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-800">{Math.round(scrollProgress)}% viewed</span>
              </div>

              {/* Clickable / Draggable Track */}
              <div
                onClick={handleScrubberClick}
                className="w-full sm:w-64 h-3 bg-white border-2 border-[#1A1714] rounded-full overflow-hidden p-0.5 cursor-pointer relative shadow-inner"
                title="Click anywhere to scrub runway"
              >
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-150"
                  style={{ width: `${Math.max(8, scrollProgress)}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollStep('left')}
                  disabled={!canScrollLeft}
                  className="px-2.5 py-1 text-xs font-mono font-bold bg-white border border-[#1A1714] rounded hover:bg-slate-100 disabled:opacity-30"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => scrollStep('right')}
                  disabled={!canScrollRight}
                  className="px-2.5 py-1 text-xs font-mono font-bold bg-white border border-[#1A1714] rounded hover:bg-slate-100 disabled:opacity-30"
                >
                  Next →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            EXPERIENCE B: COLLAGE DESK GRID (Responsive Multi-Column Scrapbook)
            - Renders ALL projects (not just 6!)
            - Responsive 1, 2, or 3 columns with varied sticky note tones
           ========================================================================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6 items-stretch">
            {filteredProjects.map((project, idx) => {
              const palette = STICKY_PALETTES[idx % STICKY_PALETTES.length];
              const projectNum = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={project.id || idx}
                  onClick={() => setActiveProjectModal(project)}
                  className="group relative rounded-lg border-2 border-[#1A1714] p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1"
                  style={{
                    backgroundColor: palette.bg,
                    boxShadow: palette.shadow
                  }}
                >
                  {/* Tape pinned at top */}
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 pointer-events-none z-20 shadow-xs"
                    style={{
                      backgroundColor: palette.tapeBg,
                      clipPath: 'polygon(0% 2px, 3% 0, 7% 3px, 12% 0, 88% 0, 93% 3px, 97% 0, 100% 2px, 100% calc(100% - 2px), 96% 100%, 91% calc(100% - 3px), 10% 100%, 4% calc(100% - 2px), 0% 100%)'
                    }}
                  />

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-[#1A1714]/20"
                        style={{ backgroundColor: palette.tagBg, color: palette.tagText }}
                      >
                        PROJECT // {projectNum}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-600 truncate max-w-[130px]">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl font-black text-slate-900 leading-snug group-hover:text-rose-600 transition-colors">
                      {project.title}
                    </h3>

                    {project.image && (
                      <div className="rounded-md overflow-hidden border border-[#1A1714] aspect-[16/10] bg-slate-900 relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      </div>
                    )}

                    <p className="font-sans text-xs text-slate-700 leading-relaxed line-clamp-3">
                      {project.summary || project.problemStatement}
                    </p>

                    {project.technologies && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/80 border border-[#1A1714]/20 text-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-4 border-t border-[#1A1714]/20 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-700">Click to examine</span>
                    <span className="w-7 h-7 rounded bg-white border border-[#1A1714] flex items-center justify-center text-slate-800 shadow-xs group-hover:bg-[#1A1714] group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
