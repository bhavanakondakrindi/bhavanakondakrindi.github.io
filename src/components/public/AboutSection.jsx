import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Code, Compass, Lightbulb, BookOpen, CheckCircle2 } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PaperStamp } from '../ui/PaperStamp';
import { GemSticker } from '../ui/DoodleArrow';

export const AboutSection = () => {
  const { publishedData } = usePortfolio();
  const profile = publishedData?.profile || {};
  const paragraphs = profile.bioParagraphs || [];

  return (
    <section id="about" className="py-20 md:py-28 relative bg-[#FDFBF7] border-b-2 border-[#1E1E24]/10">
      
      {/* Background Subtle Lined Paper Accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Editorial Badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#BAE6FD] border border-sky-400 font-mono text-xs font-bold text-sky-950 uppercase tracking-widest mb-3">
              <span>Chapter 01</span>
              <span>•</span>
              <span>Field Notes & Background</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl font-black text-[#1E1E24] tracking-tight">
              About My <span className="italic font-serif font-normal text-rose-600">Journey</span>
            </h2>
          </div>
          
          <div className="hidden sm:block">
            <PaperStamp text="KLH CSE" subtext="CLASS OF '27" color="#0284C7" rotate={4} />
          </div>
        </div>

        {/* Notebook Double-Page Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Journal Editorial Story (8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Scrapbook Journal Card */}
            <div className="relative bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook bg-lined-paper">
              
              {/* Binder Clip at Top Left */}
              <div className="absolute -top-4 left-8 z-20">
                <BinderClip type="metal-black" rotate={-3} />
              </div>

              {/* Washi Tape on corner */}
              <div className="absolute -top-3 right-6 z-20">
                <WashiTape color="pink" width="100px" height="24px" rotate={3} />
              </div>

              <div className="pt-2 space-y-4">
                <h3 className="font-editorial text-2xl font-bold text-slate-900 leading-snug">
                  Computer Science, Systematic Engineering & Practical Innovation
                </h3>

                {paragraphs.map((para, idx) => (
                  <p key={idx} className="text-slate-700 leading-relaxed font-sans text-base">
                    {para}
                  </p>
                ))}

                {/* Highlight callout box */}
                <div className="mt-6 p-4 rounded-xl bg-[#FEF9C3] border-2 border-dashed border-amber-400/80">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-editorial font-bold text-amber-950 text-sm">
                        Learning & Building Philosophy
                      </h4>
                      <p className="text-xs text-amber-900 mt-1 leading-normal font-sans">
                        I believe in learning by constructing complete, working prototypes—whether modeling flight disruption re-accommodations or simulating autonomous drone route optimization under volatile weather.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Skills & Academic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#FEF08A] p-4 rounded-xl border-2 border-[#1E1E24] shadow-scrapbook hover:-translate-y-1 transition-transform">
                <GraduationCap className="w-5 h-5 text-amber-900 mb-2" />
                <h4 className="font-editorial font-bold text-sm text-[#1E1E24]">Academic Focus</h4>
                <p className="text-xs text-slate-800 mt-1">
                  B.Tech CSE Sophomore at KLH Deemed to be University, CGPA ~{profile.cgpa || "9.5"}.
                </p>
              </div>

              <div className="bg-[#BBF7D0] p-4 rounded-xl border-2 border-[#1E1E24] shadow-scrapbook hover:-translate-y-1 transition-transform">
                <Code className="w-5 h-5 text-emerald-900 mb-2" />
                <h4 className="font-editorial font-bold text-sm text-[#1E1E24]">Software Craft</h4>
                <p className="text-xs text-slate-800 mt-1">
                  Strong foundations in Java, Python, and modern React frontend architectures.
                </p>
              </div>

              <div className="bg-[#FBCFE8] p-4 rounded-xl border-2 border-[#1E1E24] shadow-scrapbook hover:-translate-y-1 transition-transform">
                <Compass className="w-5 h-5 text-pink-900 mb-2" />
                <h4 className="font-editorial font-bold text-sm text-[#1E1E24]">Problem Solving</h4>
                <p className="text-xs text-slate-800 mt-1">
                  Data Structures, algorithms, and practical operational logic implementation.
                </p>
              </div>
            </div>

          </div>

          {/* Right Side: Scrapbook Index Cards & Mementos (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Sticky Note 1: University Snapshot */}
            <div className="relative bg-[#FEF08A] p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook transform rotate-1 hover:rotate-0 transition-transform">
              
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <WashiTape color="mint" width="110px" height="24px" rotate={-2} />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-amber-800" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900">
                  University Snapshot
                </span>
              </div>

              <h4 className="font-editorial text-xl font-bold text-slate-900">
                KLH Deemed to be University
              </h4>
              <p className="text-xs font-mono text-slate-700 mt-1">
                Department of Computer Science & Engineering
              </p>

              <div className="mt-4 pt-3 border-t border-amber-300/80 space-y-2 text-xs text-slate-800 font-sans">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Current Level:</span>
                  <span className="font-mono bg-white/70 px-2 py-0.5 rounded border border-amber-300">
                    2nd Year (Undergraduate)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Current CGPA:</span>
                  <span className="font-mono bg-white/70 px-2 py-0.5 rounded border border-amber-300 font-bold text-rose-700">
                    ~{profile.cgpa || "9.5"} / 10.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Core Focus:</span>
                  <span className="font-mono bg-white/70 px-2 py-0.5 rounded border border-amber-300">
                    DSA & OOP Systems
                  </span>
                </div>
              </div>
            </div>

            {/* Sticky Note 2: What I Love Working On */}
            <div className="relative bg-white p-6 rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook transform -rotate-1 hover:rotate-0 transition-transform">
              
              <div className="absolute -top-4 right-6">
                <BinderClip type="heart-clip" rotate={12} />
              </div>

              <h4 className="font-editorial text-lg font-bold text-slate-900 mb-3">
                Current Technical Pursuits
              </h4>

              <ul className="space-y-2.5 text-xs text-slate-700 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Building robust React dashboards with responsive operational state.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Exploring classical AI pathfinding and intelligent heuristic algorithms in Python.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Deepening understanding of Data Structures & Object-Oriented design patterns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Collaborating on student platforms and community-centric applications.</span>
                </li>
              </ul>

              {/* Decorative Gem Sticker */}
              <div className="absolute -bottom-3 -right-2">
                <GemSticker type="emerald" size={28} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
