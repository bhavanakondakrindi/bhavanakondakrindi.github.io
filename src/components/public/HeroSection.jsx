import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowDown, Mail, ExternalLink, Sparkles, Code2, GraduationCap, ArrowUpRight } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp, CherriesSticker, RibbonBow } from '../ui/VintageStamps';
import { SparkleStar, GemSticker, DoodleArrow } from '../ui/DoodleArrow';

export const HeroSection = () => {
  const { publishedData } = usePortfolio();
  const profile = publishedData?.profile || {};

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-graph-paper">
      
      {/* Subtle Floating Stamp in Background (Non-intrusive, elegantly placed) */}
      <div className="absolute top-8 right-12 hidden xl:block opacity-85">
        <PostmarkStamp text="KLH CSE DEPT" date="HYDERABAD • 2025" rotate={4} color="#DC2626" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header Eyebrow Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1A1714]/20 mb-12">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#1A1714] shadow-scrapbook text-xs font-mono font-bold text-slate-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>KLH Deemed to be University</span>
            </span>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline font-semibold">
              B.Tech Computer Science & Engineering
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-[#FEF08A] border-2 border-[#1A1714] font-black text-amber-950 shadow-xs">
              ★ CGPA ~{profile.cgpa || "9.5"} / 10.0
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-600 font-bold hidden sm:inline">Sophomore (2nd Year)</span>
          </div>
        </div>

        {/* Main Hero Spread: Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Typography, Story & Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Cursive greeting label */}
            <div className="flex items-center gap-2">
              <span className="font-handwriting text-2xl text-rose-600 font-bold -rotate-1">
                developer portfolio & creative journal
              </span>
              <DoodleArrow rotate={-5} color="#E11D48" className="w-8 h-5" />
            </div>

            {/* Oversized High-Contrast Editorial Display */}
            <div>
              <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#1A1714] leading-[0.94]">
                Bhavana <br />
                <span className="relative inline-block font-serif italic font-normal text-slate-900 mt-1">
                  <span className="relative z-10">Kondakrindi</span>
                  {/* Soft organic highlighter stroke */}
                  <span className="absolute -bottom-1 -left-1 -right-2 h-7 sm:h-9 bg-[#FBCFE8]/80 -rotate-0.5 rounded-sm -z-0" />
                </span>
              </h1>
            </div>

            {/* Deck / Mission */}
            <p className="font-display text-lg sm:text-xl font-semibold text-slate-800 max-w-xl leading-relaxed pt-1">
              {profile.tagline || "Exploring code, designing interactive software & solving practical problems."}
            </p>

            {/* Factual Intro Note Card */}
            <div className="relative p-6 rounded-2xl bg-white border-2 border-[#1A1714] shadow-scrapbook max-w-xl">
              {/* Corner washi tape */}
              <div className="absolute -top-3 left-8 z-10">
                <WashiTape color="yellow" width="100px" height="24px" rotate={-1} />
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans pt-1">
                {profile.intro}
              </p>
            </div>

            {/* Practical Focus Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                "Airline Disruption Management",
                "A* Drone Routing AI",
                "React Frontend Systems",
                "Java & Classical OOP"
              ].map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-white border border-[#1A1714]/25 text-slate-800 shadow-xs hover:border-[#1A1714] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#1A1714] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Explore Curated Projects</span>
                <ArrowDown className="w-4 h-4 text-yellow-300 group-hover:translate-y-1 transition-transform" />
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

          {/* Right Column: Art-Directed Portrait Presentation (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              
              {/* Backing Craft Paper Mount */}
              <div className="absolute -inset-3 bg-[#FEF9C3] rounded-3xl border-2 border-[#1A1714] shadow-scrapbook transform rotate-1 -z-10" />

              {/* Main Polaroid Card Container */}
              <div className="relative bg-white p-4 pb-8 rounded-2xl border-3 border-[#1A1714] shadow-scrapbook-lg transform -rotate-0.5 hover:rotate-0 transition-transform duration-300">
                
                {/* Washi Tape fastening top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <WashiTape color="pink" width="120px" height="26px" rotate={-1} />
                </div>

                {/* Wire Heart Paperclip (Reference 6) */}
                <div className="absolute -top-5 left-6 z-30">
                  <BinderClip type="heart-clip" rotate={-4} />
                </div>

                {/* Photo Inset */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 border-2 border-[#1A1714]/20 shadow-inner">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                    }}
                  />

                  {/* Corner Label */}
                  <div className="absolute bottom-3 left-3 bg-[#1A1714]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded font-mono text-[10px] font-bold">
                    KLH CSE • 2025
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div className="mt-4 text-center">
                  <p className="font-handwriting text-2xl text-[#1A1714] font-bold leading-tight">
                    {profile.avatarCaption || "Bhavana Kondakrindi • CSE @ KLH"}
                  </p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-1 font-semibold">
                    KLH Deemed to be University
                  </p>
                </div>

                {/* Red Ribbon Bow sticker at corner */}
                <div className="absolute -bottom-4 -left-4 z-30">
                  <RibbonBow />
                </div>

                {/* Ruby Gem Sticker at corner */}
                <div className="absolute -bottom-3 -right-3 z-30">
                  <GemSticker type="ruby" size={32} />
                </div>

              </div>

            </div>
          </motion.div>

        </div>

      </div>

      {/* Marquee Ticker Strip Divider */}
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
