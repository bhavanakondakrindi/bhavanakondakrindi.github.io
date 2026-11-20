import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Code2, Compass, Lightbulb, BookOpen, CheckCircle2, Bookmark, Award } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp } from '../ui/VintageStamps';
import { GemSticker, SparkleStar } from '../ui/DoodleArrow';

export const AboutSection = () => {
  const { publishedData } = usePortfolio();
  const profile = publishedData?.profile || {};
  const paragraphs = profile.bioParagraphs || [];

  return (
    <section id="about" className="py-20 md:py-28 relative bg-[#FAF7F2] border-b-2 border-[#1A1714]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Editorial Tag */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#BAE6FD] border-2 border-[#1A1714] font-mono text-xs font-bold text-sky-950 uppercase tracking-widest mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-sky-700" />
              <span>Chapter 01 // Field Notes & Journal</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
              About My <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Journey</span>
            </h2>
          </div>

          <div className="hidden sm:block">
            <PostmarkStamp text="FIELD LOG" date="HYDERABAD • 2025" color="#0284C7" rotate={-4} />
          </div>
        </div>

        {/* The Open Spiral Notebook Spread */}
        <div className="relative bg-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl overflow-hidden">
          
          {/* Top Washi Tape fastening notebook */}
          <div className="absolute -top-3 left-1/4 z-30">
            <WashiTape color="yellow" width="140px" height="26px" rotate={-1} />
          </div>
          <div className="absolute -top-3 right-1/4 z-30">
            <WashiTape color="pink" width="130px" height="26px" rotate={2} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 relative">
            
            {/* Left Page: Academic Dossier & Field Record (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FDFBF7] bg-graph-paper-fine border-b-2 lg:border-b-0 lg:border-r-2 border-[#1A1714] flex flex-col justify-between space-y-8 relative">
              
              <div className="space-y-6">
                
                {/* Page Title Stamp */}
                <div className="flex items-center justify-between border-b-2 border-dashed border-[#1A1714]/20 pb-3">
                  <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider">
                    FIELD LOG // ACADEMIC RECORD
                  </span>
                  <span className="font-mono text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                    KLH CSE '27
                  </span>
                </div>

                {/* Stamped University Index Card */}
                <div className="relative bg-white p-5 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook space-y-4">
                  
                  {/* Metal Bulldog Clip at Top */}
                  <div className="absolute -top-4 left-6 z-20">
                    <BinderClip type="metal-black" rotate={-2} />
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-10 h-10 rounded-xl bg-[#FEF08A] border-2 border-[#1A1714] flex items-center justify-center font-editorial font-bold text-lg">
                      KLH
                    </div>
                    <div>
                      <h3 className="font-editorial text-lg font-bold text-slate-900 leading-tight">
                        KLH Deemed to be University
                      </h3>
                      <p className="text-xs font-mono text-slate-500">
                        Hyderabad, Telangana, India
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200 text-xs font-mono text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Undergraduate Program:</span>
                      <span>B.Tech CSE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Year of Study:</span>
                      <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300 font-bold">
                        Second Year (Sophomore)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Academic Standing:</span>
                      <span className="text-rose-700 font-black text-sm">
                        CGPA ~{profile.cgpa || "9.5"} / 10.0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Practical Engineering Snapshot */}
                <div className="bg-[#FEF9C3] p-5 rounded-2xl border-2 border-[#1A1714] shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-amber-950 font-mono text-xs font-bold uppercase">
                    <Award className="w-4 h-4 text-amber-800" />
                    <span>Technical Strengths</span>
                  </div>

                  <ul className="space-y-2 text-xs font-sans text-amber-950/90 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span><strong>Algorithmic Thinking:</strong> Data structures, classical AI pathfinding heuristics, and optimization.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span><strong>Frontend Craftsmanship:</strong> Clean React architecture, responsive state machines, and intuitive UX.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span><strong>Practical Problem Solving:</strong> Creating systems that address real disruptions, logistics, and student collaboration.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Botanical Gem Accent */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1A1714]/10 text-xs font-mono text-slate-500">
                <span>Verified Academic Standing</span>
                <GemSticker type="emerald" size={24} />
              </div>

            </div>

            {/* Right Page: Narrative & Engineering Philosophy (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 bg-white bg-ruled-paper space-y-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                
                {/* Page Title Stamp */}
                <div className="flex items-center justify-between border-b-2 border-dashed border-[#1A1714]/20 pb-3">
                  <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider">
                    ESSAY // PHILOSOPHY & MOTIVATION
                  </span>
                  <span className="font-mono text-[11px] font-bold text-slate-600">
                    ENTRY 01
                  </span>
                </div>

                {/* Editorial Body Text */}
                <div className="space-y-4 font-sans text-slate-800 text-base leading-relaxed">
                  {paragraphs.map((para, idx) => (
                    <p key={idx} className="relative">
                      {idx === 0 ? (
                        <>
                          <span className="float-left font-editorial text-5xl font-black text-[#1A1714] leading-none pr-3 pt-1">
                            {para.charAt(0)}
                          </span>
                          <span>{para.slice(1)}</span>
                        </>
                      ) : (
                        para
                      )}
                    </p>
                  ))}
                </div>

                {/* Pinned Sticky Note: Learning & Building Philosophy */}
                <div className="relative bg-[#FEF9C3] p-5 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook">
                  {/* Pink Binder Clip holding the note */}
                  <div className="absolute -top-4 right-8">
                    <BinderClip type="pink-binder" rotate={6} />
                  </div>

                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-editorial font-bold text-amber-950 text-base">
                        My Approach to Engineering & Learning
                      </h4>
                      <p className="text-xs text-amber-900 mt-1 leading-relaxed font-sans">
                        I focus on building user-centered, working technology rather than purely theoretical exercises. Whether formulating dynamic A* obstacle avoidance in flight corridors or streamlining flight disruption re-accommodations, I bridge analytical computer science foundations with responsive frontend execution.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Interactive Highlight Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-[#1A1714] shadow-xs">
                    <GraduationCap className="w-4 h-4 text-purple-700 mb-1.5" />
                    <div className="font-editorial font-bold text-sm text-slate-900">Foundations</div>
                    <div className="text-[11px] font-mono text-slate-600 mt-0.5">DSA, OOP & Logic</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-[#1A1714] shadow-xs">
                    <Code2 className="w-4 h-4 text-emerald-700 mb-1.5" />
                    <div className="font-editorial font-bold text-sm text-slate-900">Web Systems</div>
                    <div className="text-[11px] font-mono text-slate-600 mt-0.5">React.js, Modern UI</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-[#1A1714] shadow-xs">
                    <Compass className="w-4 h-4 text-rose-700 mb-1.5" />
                    <div className="font-editorial font-bold text-sm text-slate-900">Problem Solving</div>
                    <div className="text-[11px] font-mono text-slate-600 mt-0.5">Python & Algorithms</div>
                  </div>
                </div>

              </div>

              {/* Bottom Page Number & Signoff */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1A1714]/10 text-xs font-mono text-slate-500">
                <span className="font-bold text-[#1A1714]">BHAVANA KONDAKRINDI • DEV JOURNAL</span>
                <span>PAGE 02 OF 05</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
