import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowDown, Mail, ExternalLink, Sparkles, Code2, GraduationCap, ArrowUpRight, Compass, Terminal } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp, CherriesSticker, RibbonBow, EditorialBarcode } from '../ui/VintageStamps';
import { SparkleStar, GemSticker, DoodleArrow } from '../ui/DoodleArrow';

export const HeroSection = () => {
  const { publishedData, setIsResumeModalOpen } = usePortfolio();
  const profile = publishedData?.profile || {};

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-graph-paper">
      
      {/* Background Decorative Postmark Stamps & Floating Accents */}
      <div className="absolute top-6 left-6 hidden lg:block opacity-75">
        <PostmarkStamp text="KLH CSE DEPT" date="HYDERABAD • 2025" rotate={-8} color="#DC2626" />
      </div>

      <div className="absolute top-8 right-8 hidden lg:block opacity-85">
        <EditorialBarcode />
      </div>

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
          <div className="absolute -top-6 left-12 hidden sm:block animate-wiggle">
            <CherriesSticker size={42} />
          </div>

          {/* Star sparkle accent */}
          <div className="absolute -top-4 right-16 hidden sm:block animate-float">
            <SparkleStar size={34} color="#FBBF24" />
          </div>

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
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
              <WashiTape color="pink" width="140px" height="26px" rotate={-1} />
            </div>

            {/* Wire Heart Paperclip */}
            <div className="absolute -top-5 left-10 z-30">
              <BinderClip type="heart-clip" rotate={-6} />
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
                      KLH CSE • 2025
                    </p>
                  </div>

                  {/* Ribbon bow accent */}
                  <div className="absolute -bottom-3 -left-3 z-30">
                    <RibbonBow />
                  </div>

                  {/* Gem sticker accent */}
                  <div className="absolute -bottom-2 -right-2 z-30">
                    <GemSticker type="ruby" size={28} />
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

        {/* WAX-SEALED ARCHIVAL RESUME FOLIO CARD (Beautiful, Different & Tactile) */}
        {profile?.resume?.enabled !== false && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl mx-auto mt-8"
          >
            <div
              onClick={() => setIsResumeModalOpen(true)}
              className="group relative bg-[#FFFBEB] hover:bg-white rounded-2xl border-2 border-[#1A1714] shadow-[4px_5px_0px_#1A1714] hover:shadow-[6px_8px_0px_#1A1714] hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 sm:p-5 flex items-center justify-between gap-4 text-left overflow-visible"
            >
              {/* Washi Tape Corner (Uncut) */}
              <div className="absolute -top-3 left-8 pointer-events-none z-20">
                <WashiTape color="lavender" width="90px" height="20px" rotate={-2} />
              </div>

              {/* Left Details */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Golden Wax Seal with BK Monogram */}
                <div className="w-12 h-12 rounded-full bg-[#FEF08A] border-2 border-[#1A1714] shadow-xs flex flex-col items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <span className="font-editorial font-black text-sm text-amber-950 leading-none">BK</span>
                  <span className="text-[6px] font-mono font-bold uppercase text-amber-900">VERIFIED</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-purple-900 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                      OFFICIAL FOLIO // 2025
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 hidden sm:inline">
                      ● Active Record
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg sm:text-xl font-black text-slate-900 group-hover:text-purple-900 transition-colors mt-0.5">
                    {profile.resume?.buttonText || "Curriculum Vitae"}
                  </h3>

                  <p className="text-xs font-sans text-slate-600 line-clamp-1">
                    {profile.resume?.tagline || "B.Tech CSE Sophomore • KLH Deemed to be University • CGPA ~9.5"}
                  </p>
                </div>
              </div>

              {/* Right Action Button */}
              <div className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1A1714] text-white group-hover:bg-purple-900 font-mono text-xs font-bold shadow-xs transition-colors">
                <span className="hidden sm:inline">Inspect Folio</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-yellow-300" />
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Marquee Ribbon Banner Strip */}
      <div className="mt-16 border-y-2 border-[#1A1714] bg-[#FEF08A] py-3.5 overflow-hidden shadow-xs">
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
