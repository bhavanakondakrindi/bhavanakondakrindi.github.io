import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Code2, Compass, Lightbulb, BookOpen, CheckCircle2, Bookmark } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp } from '../ui/VintageStamps';
import { GemSticker, SparkleStar } from '../ui/DoodleArrow';
import { SpiralSpine } from '../ui/SpiralSpine';

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

        {/* The Open Spiral Notebook Spread (Double-Page Composition) */}
        <div className="relative bg-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl overflow-hidden">
          
          {/* Top Washi Tape fastening notebook */}
          <div className="absolute -top-3 left-1/4 z-30">
            <WashiTape color="yellow" width="140px" height="26px" rotate={-1} />
          </div>
          <div className="absolute -top-3 right-1/4 z-30">
            <WashiTape color="pink" width="130px" height="26px" rotate={2} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 relative">
            
            {/* Left Page: Field Notes, Identity & Academic Log (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FDFBF7] bg-graph-paper-fine border-b-2 lg:border-b-0 lg:border-r-2 border-[#1A1714] flex flex-col justify-between space-y-8 relative">
              
              <div className="space-y-6">
                
                {/* Page Title Stamp */}
                <div className="flex items-center justify-between border-b-2 border-dashed border-[#1A1714]/20 pb-3">
                  <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider">
                    PAGE 01 // IDENTITY
                  </span>
                  <span className="font-mono text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    CSE SOPHOMORE
                  </span>
                </div>

                {/* Polaroid of Bhavana with Handwritten Note */}
                <div className="relative bg-white p-3 pb-6 rounded-xl border-2 border-[#1A1714] shadow-scrapbook transform -rotate-1 hover:rotate-0 transition-transform">
                  
                  {/* Metal Bulldog Clip at Top (Reference 6) */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <BinderClip type="metal-black" rotate={2} />
                  </div>

                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>

                  <div className="mt-3 text-center">
                    <p className="font-handwriting text-lg text-slate-900 font-bold leading-tight">
                      Bhavana Kondakrindi
                    </p>
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
                      KLH Deemed to be University
                    </p>
                  </div>
                </div>

                {/* Academic Snapshot Card */}
                <div className="bg-[#FEF08A] p-5 rounded-2xl border-2 border-[#1A1714] shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-950 font-mono text-xs font-bold uppercase">
                    <GraduationCap className="w-4 h-4 text-amber-800" />
                    <span>Academic Standing</span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-editorial text-2xl font-black text-slate-900">
                      CGPA ~{profile.cgpa || "9.5"}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-900">
                      2nd Year B.Tech CSE
                    </span>
                  </div>

                  <p className="text-xs font-sans text-amber-950/80 leading-relaxed pt-1">
                    Maintaining high academic rigor while actively developing practical software systems and algorithmic simulations.
                  </p>
                </div>

              </div>

              {/* Bottom Botanical Gem Accent */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1A1714]/10 text-xs font-mono text-slate-500">
                <span>Field Log: Hyderabad, India</span>
                <GemSticker type="emerald" size={24} />
              </div>

            </div>

            {/* Right Page: Narrative & Engineering Philosophy (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 bg-white bg-ruled-paper space-y-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                
                {/* Page Title Stamp */}
                <div className="flex items-center justify-between border-b-2 border-dashed border-[#1A1714]/20 pb-3">
                  <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider">
                    PAGE 02 // ESSAY & PRACTICAL CRAFT
                  </span>
                  <span className="font-mono text-[11px] font-bold text-slate-600">
                    SOURCE OF TRUTH
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

                {/* Pinned Sticky Note: Learning & Building Philosophy (Reference 5 & 8) */}
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
                <span className="font-bold text-[#1A1714]">BK. DIGITAL JOURNAL • VOL. 2025</span>
                <span>ENTRY 01 / 05</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
