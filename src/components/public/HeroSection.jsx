import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowDown, Mail, ExternalLink, Sparkles, Code2, GraduationCap, ArrowUpRight, Compass, Terminal } from 'lucide-react';
import { DynamicSticker } from '../ui/DynamicSticker';

export const HeroSection = () => {
  const { publishedData } = usePortfolio();
  const profile = publishedData?.profile || {};
  const marquee = publishedData?.marqueeBanner || {
    enabled: true,
    bgColor: "#FEF08A",
    textColor: "#1A1714",
    speed: "normal",
    separator: "•",
    starPrefix: "★",
    items: [
      "COMPUTER SCIENCE ENGINEERING",
      "KLH DEEMED TO BE UNIVERSITY",
      "ACADEMIC CGPA ~9.5",
      "REACT.JS FRONTEND ARCHITECTURE",
      "PYTHON & CLASSICAL AI SIMULATION",
      "JAVA OBJECT-ORIENTED SYSTEMS",
      "DATA STRUCTURES & PROBLEM SOLVING"
    ]
  };

  const marqueeItems = marquee.items && marquee.items.length > 0
    ? marquee.items
    : [
        "COMPUTER SCIENCE ENGINEERING",
        "KLH DEEMED TO BE UNIVERSITY",
        "ACADEMIC CGPA ~9.5",
        "REACT.JS FRONTEND ARCHITECTURE",
        "PYTHON & CLASSICAL AI SIMULATION",
        "JAVA OBJECT-ORIENTED SYSTEMS",
        "DATA STRUCTURES & PROBLEM SOLVING"
      ];

  const speedDuration = marquee.speed === 'slow' ? '36s' : marquee.speed === 'fast' ? '14s' : '22s';

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-graph-paper">
      
      {/* Background Decorative Postmark Stamps & Floating Accents */}
      <DynamicSticker id="hero_postmark" className="absolute top-6 left-6 hidden lg:block opacity-75" />
      <DynamicSticker id="hero_barcode" className="absolute top-8 right-8 hidden lg:block opacity-85" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Editorial Issue Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border-2 border-[#1A1714] shadow-scrapbook text-xs font-mono font-bold text-slate-900 mb-8"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>KLH Deemed to be University • Computer Science & Engineering</span>
          <span className="text-slate-300">•</span>
          <span className="text-rose-600 font-black">CGPA ~{profile.cgpa || "9.5"}</span>
        </motion.div>

        {/* MASSIVE CENTERED EDITORIAL MASTHEAD */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative max-w-5xl mx-auto mb-6"
        >
          {/* Cherries sticker floating over title */}
          <DynamicSticker id="hero_cherries" className="absolute -top-6 left-12 hidden sm:block animate-wiggle" />

          {/* Star sparkle accent */}
          <DynamicSticker id="hero_sparkle" className="absolute -top-4 right-16 hidden sm:block animate-float" />

          <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#1A1714] leading-[0.9] select-none">
            Bhavana <br />
            <span className="relative inline-block font-serif italic font-normal text-slate-900 mt-2">
              <span className="relative z-10">Kondakrindi</span>
              {/* Soft highlighter brush stroke */}
              <span className="absolute -bottom-1 -left-3 -right-3 h-8 sm:h-12 bg-[#FBCFE8]/80 -rotate-0.5 rounded-sm -z-0" />
            </span>
          </h1>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="font-handwriting text-2xl text-rose-600 font-bold -rotate-1">
              creative developer portfolio & digital sketchbook
            </span>
          </div>
        </motion.div>

        {/* ART-DIRECTED CENTRAL COLLAGE EXHIBITION (Front & Center) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-2xl mx-auto my-12"
        >
          {/* Backing warm craft paper frame */}
          <div className="relative bg-[#FEF9C3] p-4 sm:p-6 rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl">
            
            {/* Top Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <DynamicSticker id="hero_polaroid_tape" />
            </div>

            {/* Wire Heart Paperclip */}
            <div className="absolute -top-5 left-10 z-30 pointer-events-none">
              <DynamicSticker id="hero_polaroid_clip" fallback={{ category: "clip", type: "heart-clip", rotate: -6 }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Note: Academic Merit & Facts */}
              <div className="md:col-span-4 text-left space-y-3 order-2 md:order-1">
                <div className="bg-white p-3.5 rounded-xl border-2 border-[#1A1714] shadow-xs transform -rotate-1 hover:rotate-0 transition-transform">
                  <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                    ACADEMIC LOG
                  </span>
                  <div className="font-editorial font-bold text-sm text-slate-900 mt-0.5">
                    KLH University
                  </div>
                  <p className="text-[11px] font-mono text-slate-600 mt-0.5">
                    CSE Sophomore (2nd Yr)
                  </p>
                  <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold">
                    <span>CGPA:</span>
                    <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                      ~{profile.cgpa || "9.5"} / 10
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border-2 border-[#1A1714] shadow-xs hidden sm:block">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800">
                    <Code2 className="w-3.5 h-3.5 text-purple-700" />
                    <span>Focus: Systems & Web</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans mt-1 leading-normal">
                    React.js dashboards, Python AI simulations & Java OOP.
                  </p>
                </div>
              </div>

              {/* Centerpiece: Bhavana's Polaroid Photo */}
              <div className="md:col-span-4 flex justify-center order-1 md:order-2">
                <div className="relative bg-white p-3 pb-6 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook transform rotate-1 hover:rotate-0 transition-transform duration-300 w-full max-w-[220px]">
                  
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover select-none"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>

                  <div className="mt-2.5 text-center">
                    <p className="font-handwriting text-xl text-[#1A1714] font-bold leading-tight">
                      {profile.avatarCaption || "Bhavana Kondakrindi"}
                    </p>
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
                      KLH CSE • SOPHOMORE
                    </p>
                  </div>

                  {/* Ribbon bow accent */}
                  <div className="absolute -bottom-3 -left-3 z-30 pointer-events-none">
                    <DynamicSticker id="hero_polaroid_bow" />
                  </div>

                  {/* Gem sticker accent */}
                  <div className="absolute -bottom-2 -right-2 z-30 pointer-events-none">
                    <DynamicSticker id="hero_polaroid_gem" />
                  </div>
                </div>
              </div>

              {/* Right Note: Engineering Philosophy */}
              <div className="md:col-span-4 text-left space-y-3 order-3">
                <div className="bg-white p-3.5 rounded-xl border-2 border-[#1A1714] shadow-xs transform rotate-1 hover:rotate-0 transition-transform">
                  <span className="font-mono text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                    CORE PHILOSOPHY
                  </span>
                  <div className="font-editorial font-bold text-sm text-slate-900 mt-0.5">
                    Practical Technology
                  </div>
                  <p className="text-[11px] font-sans text-slate-600 mt-1 leading-normal">
                    "I believe in building working, user-centered software that solves real-world challenges."
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border-2 border-[#1A1714] shadow-xs hidden sm:block">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800">
                    <Terminal className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Algorithmic Thinking</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans mt-1 leading-normal">
                    Classical algorithms, data structures & pathfinding models.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Narrative Deck & Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto space-y-4 mb-8"
        >
          <p className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {profile.tagline || "Exploring code, designing interactive software & solving practical problems."}
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
            {profile.intro}
          </p>
        </motion.div>

        {/* CTAs & Quick Focus Tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#1A1714] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <span>Explore Selected Projects</span>
            <ArrowDown className="w-4 h-4 text-yellow-300 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white border-2 border-[#1A1714] text-slate-900 font-mono font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:bg-slate-50 hover:-translate-y-0.5 transition-all"
          >
            <Mail className="w-4 h-4 text-rose-500" />
            <span>Send a Direct Note</span>
          </a>
        </motion.div>

      </div>

      {/* Marquee Ribbon Banner Strip */}
      {marquee.enabled !== false && (
        <div
          style={{
            backgroundColor: marquee.bgColor || '#FEF08A',
            color: marquee.textColor || '#1A1714'
          }}
          className="mt-16 border-y-2 border-[#1A1714] py-3.5 overflow-hidden shadow-xs transition-colors"
        >
          <div
            className="flex whitespace-nowrap animate-marquee"
            style={{ animationDuration: speedDuration }}
          >
            <div className="flex items-center gap-8 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase">
              {marqueeItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span>
                    {marquee.starPrefix || '★'} {item}
                  </span>
                  <span>{marquee.separator || '•'}</span>
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-8 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase pl-8">
              {marqueeItems.map((item, idx) => (
                <React.Fragment key={`dup-${idx}`}>
                  <span>
                    {marquee.starPrefix || '★'} {item}
                  </span>
                  <span>{marquee.separator || '•'}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
