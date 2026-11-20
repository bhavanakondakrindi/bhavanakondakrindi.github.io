import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { ChevronLeft, ChevronRight, ArrowUpRight, FolderOpen, ExternalLink, Sparkles } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PaperStamp } from '../ui/PaperStamp';

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
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative bg-[#FAF7F2] border-b-2 border-[#1E1E24]/10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FEF08A] border border-amber-400 font-mono text-xs font-bold text-amber-950 uppercase tracking-widest mb-3">
              <span>Chapter 03</span>
              <span>•</span>
              <span>Engineering Artifacts</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl font-black text-[#1E1E24] tracking-tight">
              Selected <span className="italic font-serif font-normal text-rose-600">Projects</span>
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-xl mt-2">
              A curated collection of practical systems, simulations, and platforms. Click any card to expand its full engineering dossier.
            </p>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              Swipe or use arrows
            </span>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border-2 border-[#1E1E24] bg-white shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all ${
                !canScrollLeft ? 'opacity-40 cursor-not-allowed' : 'text-[#1E1E24]'
              }`}
              aria-label="Previous Projects"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border-2 border-[#1E1E24] bg-white shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all ${
                !canScrollRight ? 'opacity-40 cursor-not-allowed' : 'text-[#1E1E24]'
              }`}
              aria-label="Next Projects"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Horizontally Scrollable Project Cards Carousel */}
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-10 pt-4 px-4 sm:px-8 max-w-7xl mx-auto scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              layoutId={`project-card-${project.id}`}
              onClick={() => setActiveProjectModal(project)}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="group relative shrink-0 w-[340px] sm:w-[380px] bg-white rounded-3xl border-3 border-[#1E1E24] shadow-scrapbook hover:shadow-scrapbook-xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden snap-start"
              style={{
                backgroundColor: project.color || '#FFFFFF',
              }}
            >
              {/* Folder Tab Header */}
              <div className="relative p-5 pb-3 bg-white/70 border-b-2 border-[#1E1E24]/10">
                {/* Washi Tape */}
                <div className="absolute -top-3 left-6 z-10">
                  <WashiTape
                    color={idx % 2 === 0 ? 'yellow' : 'pink'}
                    width="100px"
                    height="22px"
                    rotate={idx % 2 === 0 ? -2 : 1.5}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-white border border-[#1E1E24]/20 text-slate-800">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-700 font-bold">
                      {project.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-editorial text-2xl font-bold text-slate-900 mt-3 group-hover:text-rose-600 transition-colors leading-snug">
                  {project.title}
                </h3>
              </div>

              {/* Card Thumbnail / Preview */}
              <div className="relative mx-5 my-3 rounded-xl overflow-hidden border-2 border-[#1E1E24] aspect-[16/10] bg-slate-900 shadow-xs">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                  <span>Dossier #{idx + 1}</span>
                  <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                    Expand <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Card Summary & Highlights */}
              <div className="p-5 pt-1 space-y-4">
                <p className="text-xs text-slate-700 font-sans line-clamp-2 leading-relaxed">
                  {project.summary}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.technologies?.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/90 border border-black/15 text-slate-800 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="text-[10px] font-mono text-slate-500">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Open Dossier CTA Bar */}
                <div className="pt-3 border-t border-[#1E1E24]/10 flex items-center justify-between text-xs font-mono font-bold text-[#1E1E24]">
                  <span className="group-hover:underline">View System Dossier</span>
                  <div className="w-8 h-8 rounded-full bg-white border border-[#1E1E24] shadow-xs flex items-center justify-center group-hover:bg-[#1E1E24] group-hover:text-white transition-all">
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
