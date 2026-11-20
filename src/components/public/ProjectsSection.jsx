import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Bookmark, Layers, Plane, Compass, BookOpen, Leaf, Wallet } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp } from '../ui/VintageStamps';

export const ProjectsSection = () => {
  const { publishedData, setActiveProjectModal } = usePortfolio();
  const projects = publishedData?.projects || [];
  const scrollContainerRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [projects]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  const projectSpecificIcons = {
    'proj-airline-disruption': <Plane className="w-4 h-4 text-amber-700" />,
    'proj-skyroute-drone': <Compass className="w-4 h-4 text-emerald-700" />,
    'proj-studyforge': <BookOpen className="w-4 h-4 text-purple-700" />,
    'proj-ecoquest': <Leaf className="w-4 h-4 text-sky-700" />,
    'proj-personal-finance': <Wallet className="w-4 h-4 text-orange-700" />,
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative bg-[#FAF7F2] border-b-2 border-[#1A1714] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FEF08A] border-2 border-[#1A1714] font-mono text-xs font-bold text-amber-950 uppercase tracking-widest mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-amber-800" />
              <span>Chapter 03 // Engineering Artifacts</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
              Selected <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Projects</span>
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-xl mt-2">
              A curated exhibition of operational platforms, algorithmic simulations, and practical software. Click any dossier card to open its complete engineering specification.
            </p>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 hidden sm:inline font-semibold">
              Drag to explore dossiers
            </span>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-3.5 rounded-full border-2 border-[#1A1714] bg-white shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all ${
                !canScrollLeft ? 'opacity-40 cursor-not-allowed' : 'text-[#1A1714]'
              }`}
              aria-label="Previous Projects"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-3.5 rounded-full border-2 border-[#1A1714] bg-white shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all ${
                !canScrollRight ? 'opacity-40 cursor-not-allowed' : 'text-[#1A1714]'
              }`}
              aria-label="Next Projects"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Horizontally Draggable Collection */}
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto pb-12 pt-4 px-4 sm:px-8 max-w-7xl mx-auto scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              layoutId={`project-card-${project.id}`}
              onClick={() => setActiveProjectModal(project)}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="group relative shrink-0 w-[360px] sm:w-[420px] rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-lg hover:shadow-scrapbook-xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden snap-start"
              style={{
                backgroundColor: project.color || '#FFFFFF',
              }}
            >
              {/* Dossier Header Bar */}
              <div className="relative p-6 pb-4 bg-white/80 border-b-2 border-[#1A1714]/15">
                
                {/* Washi Tape strip holding top of dossier */}
                <div className="absolute -top-3 left-8 z-10">
                  <WashiTape
                    color={idx % 2 === 0 ? 'yellow' : 'pink'}
                    width="110px"
                    height="24px"
                    rotate={idx % 2 === 0 ? -2 : 2}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-white border border-[#1A1714]/30">
                      {projectSpecificIcons[project.id] || <Layers className="w-3.5 h-3.5 text-slate-700" />}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-slate-800">
                      {project.category}
                    </span>
                  </div>

                  {project.badge && (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-700 font-black tracking-wide">
                      ★ {project.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-black text-slate-900 mt-3 group-hover:text-rose-600 transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="font-sans text-xs text-slate-600 mt-1 font-medium line-clamp-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Large Image-Led Project Preview */}
              <div className="relative mx-6 my-4 rounded-2xl overflow-hidden border-2 border-[#1A1714] aspect-[16/10] bg-slate-900 shadow-sm">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                  <span className="font-bold">DOSSIER // #{idx + 1}</span>
                  <span className="bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 font-semibold border border-white/20">
                    Expand Case File <ArrowUpRight className="w-3 h-3 text-yellow-300" />
                  </span>
                </div>
              </div>

              {/* Summary & Feature Tags */}
              <div className="p-6 pt-1 space-y-4">
                <p className="text-xs text-slate-700 font-sans leading-relaxed line-clamp-2">
                  {project.summary}
                </p>

                {/* Technology Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.technologies?.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white border border-[#1A1714]/20 text-slate-800 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-4 border-t-2 border-[#1A1714]/15 flex items-center justify-between text-xs font-mono font-bold text-[#1A1714]">
                  <span className="group-hover:underline">Open System Dossier</span>
                  <div className="w-9 h-9 rounded-full bg-white border-2 border-[#1A1714] shadow-xs flex items-center justify-center group-hover:bg-[#1A1714] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};
