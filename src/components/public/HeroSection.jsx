import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowDown, Mail, ExternalLink, Sparkles, Terminal, Code2 } from 'lucide-react';
import { PolaroidFrame } from '../ui/PolaroidFrame';
import { WashiTape } from '../ui/WashiTape';
import { PaperStamp, ScallopedSeal } from '../ui/PaperStamp';
import { SparkleStar, GemSticker, DoodleArrow } from '../ui/DoodleArrow';

export const HeroSection = () => {
  const { publishedData } = usePortfolio();
  const profile = publishedData?.profile || {};

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-graph-paper">
      
      {/* Decorative Scrapbook Elements in Background */}
      <div className="absolute top-8 left-8 hidden lg:block opacity-75">
        <PaperStamp text="KLH CSE" subtext="2ND YEAR" rotate={-12} color="#E11D48" />
      </div>

      <div className="absolute top-12 right-12 hidden lg:block animate-float">
        <ScallopedSeal label="DEV JOURNAL" sub="BHAVANA" bg="#FEF08A" rotate={8} />
      </div>

      <div className="absolute bottom-16 left-12 hidden md:block">
        <GemSticker type="diamond" size={36} className="animate-wiggle" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Magazine Cover Typography & Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Top Scrapbook Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1E1E24] shadow-scrapbook text-xs font-mono font-semibold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>KLH Deemed to be University • CSE Sophomore</span>
            </div>

            {/* Oversized Editorial Typography */}
            <div className="relative">
              <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1E1E24] leading-[0.98]">
                Bhavana <br />
                <span className="italic font-normal font-serif text-rose-600 underline decoration-wavy decoration-rose-300 decoration-2">
                  Kondakrindi
                </span>
              </h1>

              {/* Little Star Annotation */}
              <div className="absolute -top-4 right-10 hidden sm:block animate-float-slow">
                <SparkleStar size={32} color="#FBBF24" />
              </div>
            </div>

            {/* Subheading / Deck */}
            <p className="font-display text-lg sm:text-xl font-medium text-slate-700 max-w-2xl leading-relaxed">
              {profile.tagline || "Exploring code, designing interactive software & solving practical problems."}
            </p>

            {/* Polished Professional Fact-Based Intro */}
            <p className="text-base text-slate-600 max-w-xl leading-relaxed font-sans">
              {profile.intro}
            </p>

            {/* Action Buttons & Quick CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1E1E24] text-white font-semibold text-sm shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Explore Selected Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border-2 border-[#1E1E24] text-slate-900 font-semibold text-sm shadow-scrapbook hover:bg-slate-50 hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-4 h-4 text-rose-500" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Quick Meta Stats / Scrapbook Note */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600">
              <div className="px-3 py-1.5 rounded-md bg-[#FEF9C3] border border-amber-300 text-amber-900 font-bold">
                ★ Academic Standing: CGPA ~{profile.cgpa || "9.5"}
              </div>
              <div className="px-3 py-1.5 rounded-md bg-[#FBCFE8] border border-pink-300 text-pink-900 font-bold">
                ✎ Focus: Software & Web Systems
              </div>
            </div>
          </motion.div>

          {/* Right Column: Layered Scrapbook Photo Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Backing Scrapbook Layer 1: Pink Note Card */}
              <div className="absolute -inset-2 bg-[#FBCFE8] rounded-2xl border-2 border-[#1E1E24] transform rotate-3 shadow-scrapbook -z-10"></div>
              
              {/* Backing Scrapbook Layer 2: Grid Paper Note */}
              <div className="absolute -inset-1 bg-white bg-graph-paper-fine rounded-2xl border-2 border-[#1E1E24] transform -rotate-2 -z-5"></div>

              {/* Main Polaroid Photo Container */}
              <div className="relative bg-white p-4 pb-8 rounded-xl border-2 border-[#1E1E24] shadow-scrapbook-lg">
                
                {/* Washi Tape holding photo */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <WashiTape color="yellow" width="130px" height="26px" rotate={-2} />
                </div>

                {/* Hand-drawn Doodle Arrow pointing to photo */}
                <div className="absolute -bottom-8 -left-12 hidden sm:block">
                  <DoodleArrow rotate={15} color="#E11D48" />
                  <span className="font-handwriting text-base font-bold text-rose-600 absolute -bottom-4 left-2">
                    hello! 👋
                  </span>
                </div>

                {/* Photo Inset */}
                <div className="relative overflow-hidden rounded-lg bg-slate-100 aspect-[4/5] border border-slate-300">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover select-none"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                    }}
                  />

                  {/* Corner Stamp */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-black/30 font-mono text-[10px] font-bold text-slate-800">
                    B.Tech CSE '27
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div className="mt-4 text-center">
                  <p className="font-handwriting text-xl text-slate-800 font-bold leading-tight">
                    {profile.avatarCaption || "Bhavana Kondakrindi • CSE @ KLH"}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 mt-1 uppercase tracking-wider">
                    KLH Deemed to be University
                  </p>
                </div>
              </div>

              {/* Gem Sticker on photo corner */}
              <div className="absolute -bottom-3 -right-3 z-30 animate-wiggle">
                <GemSticker type="ruby" size={34} />
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Ribbon Marquee Ticker */}
      <div className="mt-16 border-y-2 border-[#1E1E24] bg-[#FEF08A] py-3 overflow-hidden shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono font-bold tracking-widest text-[#1E1E24] uppercase">
            <span>★ Computer Science Engineering</span>
            <span>•</span>
            <span>KLH Deemed to be University</span>
            <span>•</span>
            <span>CGPA ~9.5</span>
            <span>•</span>
            <span>React.js & Frontend Architecture</span>
            <span>•</span>
            <span>Python & Classical AI Simulation</span>
            <span>•</span>
            <span>Java & OOP Systems</span>
            <span>•</span>
            <span>Problem Solving & Data Structures</span>
            <span>•</span>
            <span>Interactive Web Development</span>
            <span>•</span>
          </div>
          <div className="flex items-center gap-8 text-xs sm:text-sm font-mono font-bold tracking-widest text-[#1E1E24] uppercase pl-8">
            <span>★ Computer Science Engineering</span>
            <span>•</span>
            <span>KLH Deemed to be University</span>
            <span>•</span>
            <span>CGPA ~9.5</span>
            <span>•</span>
            <span>React.js & Frontend Architecture</span>
            <span>•</span>
            <span>Python & Classical AI Simulation</span>
            <span>•</span>
            <span>Java & OOP Systems</span>
            <span>•</span>
            <span>Problem Solving & Data Structures</span>
            <span>•</span>
            <span>Interactive Web Development</span>
            <span>•</span>
          </div>
        </div>
      </div>

    </section>
  );
};
