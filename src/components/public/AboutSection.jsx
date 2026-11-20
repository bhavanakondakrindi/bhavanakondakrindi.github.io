import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Code2, Compass, Lightbulb, BookOpen, CheckCircle2, Bookmark, Award, Sparkles, Terminal } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp } from '../ui/VintageStamps';
import { GemSticker } from '../ui/DoodleArrow';

export const AboutSection = () => {
  const { publishedData } = usePortfolio();
  const profile = publishedData?.profile || {};
  const paragraphs = profile.bioParagraphs || [];

  return (
    <section id="about" className="py-20 md:py-28 relative bg-[#FAF7F2] border-b-2 border-[#1A1714]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left-Aligned Editorial Stamp */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BAE6FD] border-2 border-[#1A1714] font-mono text-xs font-bold text-sky-950 uppercase tracking-widest mb-3 shadow-xs">
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

        {/* Feature Quote Strip (Editorial Magazine Style) */}
        <div className="relative mb-12 p-6 sm:p-8 rounded-3xl bg-[#FEF9C3] border-3 border-[#1A1714] shadow-scrapbook">
          <div className="absolute -top-3 left-10">
            <WashiTape color="pink" width="120px" height="24px" rotate={-2} />
          </div>
          <div className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
            "I am drawn to technology that bridges core analytical computer science with intuitive, user-centered execution."
          </div>
          <p className="text-xs font-mono text-amber-900 mt-2 font-bold uppercase tracking-wider">
            — Bhavana Kondakrindi • B.Tech CSE Sophomore @ KLH Deemed to be University
          </p>
        </div>

        {/* Asymmetrical Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Area: Narrative Essay with Drop Cap (7 cols) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-lg bg-ruled-paper space-y-6">
            
            <div className="flex items-center justify-between border-b-2 border-dashed border-[#1A1714]/20 pb-3">
              <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider">
                ESSAY // PHILOSOPHY & PERSPECTIVE
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border">
                KLH SOPHOMORE
              </span>
            </div>

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

            {/* Sticky Note: Learning & Building Philosophy */}
            <div className="relative bg-[#FEF9C3] p-5 rounded-2xl border-2 border-[#1A1714] shadow-xs mt-6">
              <div className="absolute -top-4 right-8">
                <BinderClip type="pink-binder" rotate={6} />
              </div>

              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-editorial font-bold text-amber-950 text-base">
                    How I Approach Learning & Engineering
                  </h4>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed font-sans">
                    I believe in learning by constructing complete, working prototypes—whether modeling flight disruption re-accommodations or simulating autonomous drone route optimization under volatile weather.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#1A1714]/10 text-xs font-mono text-slate-500">
              <span className="font-bold text-[#1A1714]">BHAVANA KONDAKRINDI • CSE JOURNAL</span>
              <span>ENTRY 01 / 05</span>
            </div>

          </div>

          {/* Right Area: Academic Dossier & Pillars (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Academic Snapshot Dossier Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border-3 border-[#1A1714] shadow-scrapbook space-y-4">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
                <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider">
                  INSTITUTIONAL RECORD
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-editorial text-2xl font-black text-slate-900">
                  KLH Deemed to be University
                </h3>
                <p className="text-xs font-mono text-slate-600">
                  Department of Computer Science & Engineering
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FEF9C3] border-2 border-[#1A1714] shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-950">Level of Study:</span>
                  <span className="text-xs font-mono font-bold text-slate-800">2nd Year (Undergraduate)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-950">Current Standing:</span>
                  <span className="font-mono font-black text-base text-rose-700 bg-white px-2 py-0.5 rounded border border-amber-300">
                    CGPA ~{profile.cgpa || "9.5"} / 10.0
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Focusing on core computer science foundations including Data Structures & Algorithms, Object-Oriented Programming, Database Systems, and Modern Web Architectures.
              </p>
            </div>

            {/* 3 Tangible Engineering Pillar Badges */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border-2 border-[#1A1714] shadow-xs flex items-center gap-3.5 hover:shadow-scrapbook transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <h4 className="font-editorial font-bold text-sm text-slate-900">Core Foundations</h4>
                  <p className="text-xs text-slate-600 font-sans">Data Structures, Algorithms & OOP in Java.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-[#1A1714] shadow-xs flex items-center gap-3.5 hover:shadow-scrapbook transition-all">
                <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5 text-rose-700" />
                </div>
                <div>
                  <h4 className="font-editorial font-bold text-sm text-slate-900">Frontend Engineering</h4>
                  <p className="text-xs text-slate-600 font-sans">React.js, responsive component architecture & interactive state.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-[#1A1714] shadow-xs flex items-center gap-3.5 hover:shadow-scrapbook transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Terminal className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-editorial font-bold text-sm text-slate-900">Simulation & Python</h4>
                  <p className="text-xs text-slate-600 font-sans">Classical AI pathfinding, heuristic models & Pygame simulations.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
