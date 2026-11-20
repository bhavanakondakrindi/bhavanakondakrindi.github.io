import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Layers,
  Sparkles,
  Target,
  Wrench,
  BookOpen,
  FolderOpen,
  Calendar
} from 'lucide-react';
import { Github } from '../ui/BrandIcons';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp } from '../ui/VintageStamps';

export const ProjectDetailModal = () => {
  const { activeProjectModal, setActiveProjectModal, publishedData } = usePortfolio();
  const projects = publishedData?.projects || [];
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'features' | 'tech' | 'challenges'

  const currentIndex = projects.findIndex(p => p.id === activeProjectModal?.id);

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setActiveProjectModal(projects[currentIndex - 1]);
    } else {
      setActiveProjectModal(projects[projects.length - 1]);
    }
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (currentIndex < projects.length - 1) {
      setActiveProjectModal(projects[currentIndex + 1]);
    } else {
      setActiveProjectModal(projects[0]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeProjectModal) return;
      if (e.key === 'Escape') {
        setActiveProjectModal(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectModal, currentIndex, projects]);

  useEffect(() => {
    if (activeProjectModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeProjectModal]);

  if (!activeProjectModal) return null;

  const project = activeProjectModal;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop blur with deep vintage tint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveProjectModal(null)}
          className="fixed inset-0 bg-[#1A1714]/75 backdrop-blur-md z-10"
        />

        {/* Expanding Project Dossier Container */}
        <motion.div
          layoutId={`project-card-${project.id}`}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl overflow-hidden z-20 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Dossier Masthead */}
          <div className="relative bg-white border-b-2 border-[#1A1714] px-6 py-4 flex items-center justify-between shrink-0">
            
            {/* Washi tape header */}
            <div className="absolute -top-3 left-12">
              <WashiTape color="yellow" width="130px" height="26px" rotate={-1} />
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider font-bold px-3 py-1 rounded bg-[#FEF08A] border-2 border-[#1A1714] text-amber-950 shadow-xs">
                CASE FILE #{currentIndex + 1} OF {projects.length}
              </span>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline font-semibold">
                {project.category}
              </span>
            </div>

            {/* Navigation & Close Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl border-2 border-[#1A1714] bg-white hover:bg-slate-100 transition-colors shadow-xs"
                title="Previous Project (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl border-2 border-[#1A1714] bg-white hover:bg-slate-100 transition-colors shadow-xs"
                title="Next Project (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="ml-2 p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border-2 border-[#1A1714] transition-colors shadow-xs"
                title="Close Dossier (Escape)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dossier Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8 bg-graph-paper-fine">
            
            {/* Title & Eyebrow */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#BBF7D0] border border-emerald-400 text-emerald-950">
                  {project.category}
                </span>
                {project.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FBCFE8] border border-pink-400 text-pink-950">
                    ★ {project.badge}
                  </span>
                )}
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                {project.title}
              </h2>
              <p className="font-display text-base sm:text-lg text-slate-700 font-semibold">
                {project.subtitle}
              </p>
            </div>

            {/* Screenshot & Architecture Inset */}
            {project.image && (
              <div className="relative rounded-2xl overflow-hidden border-3 border-[#1A1714] shadow-scrapbook bg-slate-900 aspect-video max-h-80">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-xs font-mono px-3 py-1 rounded-md border border-white/20 font-bold">
                  System Architecture & Interactive Simulation
                </div>
              </div>
            )}

            {/* Quick Action Bar: GitHub & Tech Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border-2 border-[#1A1714] shadow-scrapbook">
              <div className="flex flex-wrap items-center gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1714] text-white text-xs font-mono font-bold shadow-xs hover:bg-slate-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-slate-400 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
                    GitHub Link Pending
                  </span>
                )}

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-mono font-bold shadow-xs hover:bg-emerald-700 transition-colors"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-slate-600 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Local Simulation / Academic Prototype</span>
                  </span>
                )}
              </div>

              {/* Technologies Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-100 border border-slate-300 font-bold text-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Problem Statement & Objectives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-2">
                <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Engineering Problem</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed font-sans">
                  {project.problemStatement || project.summary}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4" />
                  <span>Key Project Objectives</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 font-sans">
                  {project.objectives?.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">▸</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Implemented Features Breakdown */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
              <div className="flex items-center gap-2 text-purple-700 font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Verified Features & Architecture</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features?.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 font-sans leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Details & Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.implementationDetails && (
                <div className="bg-[#FEF9C3] p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-2">
                  <div className="flex items-center gap-2 text-amber-950 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                    <Wrench className="w-4 h-4 text-amber-800" />
                    <span>Implementation Details</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed font-sans">
                    {project.implementationDetails}
                  </p>
                </div>
              )}

              {project.challenges && (
                <div className="bg-[#FBCFE8] p-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-2">
                  <div className="flex items-center gap-2 text-pink-950 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                    <BookOpen className="w-4 h-4 text-pink-800" />
                    <span>Challenges & Learning Outcomes</span>
                  </div>
                  <p className="text-xs text-pink-950 leading-relaxed font-sans">
                    {project.challenges}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Footer Bar */}
          <div className="bg-white border-t-2 border-[#1A1714] px-6 py-4 flex items-center justify-between shrink-0">
            <span className="text-xs font-mono text-slate-500">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-bold text-slate-800">Esc</kbd> to close or <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-bold text-slate-800">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-bold text-slate-800">→</kbd> to browse
            </span>

            <button
              onClick={() => setActiveProjectModal(null)}
              className="px-5 py-2 rounded-xl bg-[#1A1714] text-white text-xs font-mono font-bold hover:bg-slate-800 transition-colors shadow-xs"
            >
              Close Dossier
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
