import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowDown, Mail, ExternalLink, Sparkles, Terminal, Code2, ArrowUpRight } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp, CherriesSticker, RibbonBow } from '../ui/VintageStamps';
import { SparkleStar, GemSticker, DoodleArrow } from '../ui/DoodleArrow';

export const HeroSection = () => {
  const { publishedData } = usePortfolio();
  const profile = publishedData?.profile || {};

  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-graph-paper">
      
      {/* Background Postage Stamp & Cherries (Reference 1 & 5) */}
      <div className="absolute top-8 right-12 hidden lg:block opacity-90 animate-float-slow">
        <PostmarkStamp text="KLH CSE DEPT" date="HYDERABAD • 2025" rotate={6} color="#DC2626" />
      </div>

      <div className="absolute top-16 left-8 hidden xl:block">
        <CherriesSticker size={42} className="animate-wiggle" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-[#1A1714]/15 mb-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1A1714] shadow-scrapbook text-xs font-mono font-bold text-slate-900">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>KLH Deemed to be University • CSE Sophomore</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-600">
            <span className="px-2.5 py-1 rounded bg-[#FEF08A] border border-amber-300 font-bold text-amber-950">
              ★ CGPA ~{profile.cgpa || "9.5"} / 10.0
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline font-semibold">Specialization: Software & Systems</span>
          </div>
        </div>

        {/* Main Collage Grid: Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Magazine Cover Typography & Intro Deck (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Expressive Layered Typography */}
            <div className="relative">
              
              {/* Handwritten sub-heading annotation */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-handwriting text-xl text-rose-600 font-bold -rotate-2">
                  hello world! I am —
                </span>
                <DoodleArrow rotate={-10} color="#E11D48" className="w-10 h-6" />
              </div>

              {/* Massive Editorial Display */}
              <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-black tracking-tight text-[#1A1714] leading-[0.92]">
                Bhavana <br />
                <span className="relative inline-block font-serif italic font-normal text-slate-900 mt-2">
                  <span className="relative z-10">Kondakrindi</span>
                  {/* Highlighter tape stroke behind name (Reference 1) */}
                  <span className="absolute -bottom-1 -left-2 -right-3 h-8 sm:h-10 bg-[#FBCFE8]/90 -rotate-1 rounded-sm -z-0" />
                </span>
              </h1>

              {/* Little Star Annotation */}
              <div className="absolute -top-3 right-6 hidden sm:block animate-float">
                <SparkleStar size={34} color="#FBBF24" />
              </div>
            </div>

            {/* Editorial Deck / Tagline */}
            <p className="font-display text-lg sm:text-xl font-semibold text-slate-800 max-w-xl leading-relaxed">
              {profile.tagline || "Exploring code, designing interactive software & solving practical problems."}
            </p>

            {/* Fact-Based Introduction Paragraph */}
            <div className="relative p-5 rounded-2xl bg-white border-2 border-[#1A1714] shadow-scrapbook max-w-xl">
              {/* Top washi tape on card */}
              <div className="absolute -top-3 left-8">
                <WashiTape color="yellow" width="90px" height="22px" rotate={-2} />
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans pt-1">
                {profile.intro}
              </p>
            </div>

            {/* Interactive Focus Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                "Airline Operations Dashboards",
                "AI Pathfinding Simulations",
                "Object-Oriented Architecture",
                "React Frontend Systems"
              ].map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white border border-[#1A1714]/30 text-slate-800 shadow-xs hover:border-[#1A1714] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#1A1714] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Explore Curated Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-yellow-300" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border-2 border-[#1A1714] text-slate-900 font-mono font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:bg-slate-50 hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-4 h-4 text-rose-500" />
                <span>Get in Touch</span>
              </a>
            </div>

          </motion.div>

          {/* Right Column: Multi-Layered Collage Composition (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center relative pt-4"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Layer 1: Blueprint Grid Scrap (Reference 7) */}
              <div className="absolute -top-6 -left-6 w-48 h-56 bg-slate-900 bg-blueprint-grid rounded-2xl border-2 border-[#1A1714] shadow-scrapbook transform -rotate-6 -z-20 p-3 text-sky-400 font-mono text-[9px]">
                <div className="flex items-center justify-between border-b border-sky-400/30 pb-1">
                  <span>GRID // 2025</span>
                  <span>A* PATH</span>
                </div>
                <div className="mt-2 text-[8px] text-sky-300/80 leading-tight">
                  X: 124.5<br />
                  Y: 48.2<br />
                  SYS: PYTHON/REACT
                </div>
              </div>

              {/* Layer 2: Airmail Craft Card (Reference 5) */}
              <div className="absolute -bottom-8 -right-6 w-52 h-44 bg-[#FEF9C3] rounded-2xl border-2 border-[#1A1714] shadow-scrapbook transform rotate-6 -z-10 p-3 overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-amber-300 pb-1 font-mono text-[10px] font-bold text-amber-900">
                  <span>DISPATCH LOG</span>
                  <span>KLH CSE</span>
                </div>
                <div className="text-[11px] font-handwriting text-slate-800 leading-tight">
                  "Second-year computer science student exploring algorithms, reactive interfaces & drone delivery simulations."
                </div>
                <div className="text-[9px] font-mono font-bold text-rose-700 uppercase">
                  ✓ Verified Academic Record
                </div>
              </div>

              {/* Main Centerpiece: Polaroid Photo Frame with Paperclip & Tape */}
              <div className="relative bg-white p-4 pb-8 rounded-2xl border-3 border-[#1A1714] shadow-scrapbook-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                
                {/* Heart wire clip at top (Reference 6) */}
                <div className="absolute -top-5 left-10 z-30">
                  <BinderClip type="heart-clip" rotate={-6} />
                </div>

                {/* Corner Washi Tape */}
                <div className="absolute -top-3 right-6 z-20">
                  <WashiTape color="pink" width="110px" height="24px" rotate={4} />
                </div>

                {/* Photo Inset with High-Res Frame */}
                <div className="relative overflow-hidden rounded-xl bg-slate-100 aspect-[4/5] border-2 border-[#1A1714]/20">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                    }}
                  />

                  {/* Corner Badge */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-white px-2.5 py-0.5 rounded font-mono text-[10px] font-bold">
                    KLH CSE • SOPHOMORE
                  </div>
                </div>

                {/* Polaroid Handwritten Caption */}
                <div className="mt-3.5 text-center">
                  <p className="font-handwriting text-2xl text-[#1A1714] font-bold leading-tight">
                    {profile.avatarCaption || "Bhavana Kondakrindi • CSE @ KLH"}
                  </p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-1">
                    KLH Deemed to be University
                  </p>
                </div>

                {/* Red Ribbon Bow sticker at corner (Reference 7) */}
                <div className="absolute -bottom-4 -left-4 z-30">
                  <RibbonBow />
                </div>

                {/* Gem sticker on photo corner (Reference 4) */}
                <div className="absolute -bottom-3 -right-3 z-30 animate-wiggle">
                  <GemSticker type="ruby" size={36} />
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Ribbon Marquee Divider */}
      <div className="mt-16 border-y-2 border-[#1A1714] bg-[#FEF08A] py-3 overflow-hidden shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono font-bold tracking-widest text-[#1A1714] uppercase">
            <span>★ COMPUTER SCIENCE ENGINEERING</span>
            <span>•</span>
            <span>KLH DEEMED TO BE UNIVERSITY</span>
            <span>•</span>
            <span>ACADEMIC CGPA ~9.5</span>
            <span>•</span>
            <span>REACT.JS FRONTEND ARCHITECTURE</span>
            <span>•</span>
            <span>PYTHON & CLASSICAL AI SIMULATION</span>
            <span>•</span>
            <span>JAVA OBJECT-ORIENTED SYSTEMS</span>
            <span>•</span>
            <span>DATA STRUCTURES & PROBLEM SOLVING</span>
            <span>•</span>
          </div>
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono font-bold tracking-widest text-[#1A1714] uppercase pl-8">
            <span>★ COMPUTER SCIENCE ENGINEERING</span>
            <span>•</span>
            <span>KLH DEEMED TO BE UNIVERSITY</span>
            <span>•</span>
            <span>ACADEMIC CGPA ~9.5</span>
            <span>•</span>
            <span>REACT.JS FRONTEND ARCHITECTURE</span>
            <span>•</span>
            <span>PYTHON & CLASSICAL AI SIMULATION</span>
            <span>•</span>
            <span>JAVA OBJECT-ORIENTED SYSTEMS</span>
            <span>•</span>
            <span>DATA STRUCTURES & PROBLEM SOLVING</span>
            <span>•</span>
          </div>
        </div>
      </div>

    </section>
  );
};
