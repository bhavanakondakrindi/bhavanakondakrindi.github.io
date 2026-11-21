import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  GraduationCap,
  Code2,
  Compass,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Award,
  Sparkles,
  Terminal,
  MapPin,
  Calendar,
  Layers,
  Heart
} from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp, RibbonBow } from '../ui/VintageStamps';
import { GemSticker, SparkleStar } from '../ui/DoodleArrow';

export const AboutSection = () => {
  const { publishedData } = usePortfolio();
  const profile = publishedData?.profile || {};
  const paragraphs = profile.bioParagraphs || [];

  return (
    <section id="about" className="py-20 md:py-32 relative bg-[#FAF7F2] border-b-2 border-[#1A1714] bg-graph-paper">
      
      {/* Whimsical Bedazzling Background Accents */}
      <div className="absolute top-12 left-8 pointer-events-none hidden lg:block">
        <GemSticker type="pink-moon" size={36} />
      </div>
      <div className="absolute top-24 right-10 pointer-events-none hidden lg:block">
        <GemSticker type="butterfly" size={34} />
      </div>
      <div className="absolute bottom-16 left-12 pointer-events-none hidden lg:block">
        <GemSticker type="topaz" size={30} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Centered Editorial Masthead */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BAE6FD] border-2 border-[#1A1714] font-mono text-xs font-bold text-sky-950 uppercase tracking-widest mb-3 shadow-xs">
            <Bookmark className="w-3.5 h-3.5 text-sky-700" />
            <span>Chapter 01 // Field Journal & Biography</span>
          </div>

          <div className="relative inline-block">
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
              Behind the <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Journal</span>
            </h2>
            {/* Whimsical bedazzling sparkle */}
            <div className="absolute -top-3 -right-6 pointer-events-none">
              <SparkleStar size={24} color="#FDE047" />
            </div>
          </div>

          <p className="text-slate-600 font-sans text-base mt-2">
            Engineering perspective, academic grounding at KLH Deemed to be University, and my approach to building practical software solutions.
          </p>
        </div>

        {/* =========================================================================
            BESPOKE TWO-PAGE OPEN NOTEBOOK SPREAD (No overflow clipping on stickers!)
           ========================================================================= */}
        <div className="relative rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl bg-white">
          
          {/* Top Washi Tape, Binder Clip & Bow (Positioned freely without overflow-hidden slicing them!) */}
          <div className="absolute -top-3.5 left-12 z-30 pointer-events-none">
            <WashiTape color="pink" width="130px" height="26px" rotate={-2} />
          </div>
          <div className="absolute -top-5 right-12 z-30 hidden sm:block pointer-events-none">
            <RibbonBow rotate={6} />
          </div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden md:block">
            <BinderClip type="black-clip" rotate={-2} />
          </div>

          {/* Inner Content Wrapper with rounded corners for the split background */}
          <div className="rounded-[22px] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#1A1714]/15">
              
              {/* LEFT PAGE: Visual Scrapbook Collage (5 cols) */}
              <div className="lg:col-span-5 p-7 sm:p-10 bg-[#FAF7F2] bg-ruled-paper flex flex-col justify-between space-y-8 relative">
                
                <div className="space-y-6">
                  
                  {/* Field Log Postmark */}
                  <div className="flex items-center justify-between border-b-2 border-dashed border-[#1A1714]/20 pb-3">
                    <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider">
                      PAGE 01 // FIELD IDENTITY
                    </span>
                    <PostmarkStamp text="FIELD LOG" date="HYDERABAD • 2025" color="#0284C7" rotate={-2} />
                  </div>

                  {/* Polaroid Frame of Workspace / Developer Identity */}
                  <div className="relative mx-auto max-w-xs bg-white p-3.5 pb-8 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="absolute -top-3 right-8 z-10 pointer-events-none">
                      <WashiTape color="yellow" width="80px" height="20px" rotate={3} />
                    </div>

                    <div className="aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative">
                      <img
                        src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"}
                        alt="Bhavana Kondakrindi"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/90 font-bold">
                        KLH CAMPUS • HYDERABAD
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <span className="font-editorial text-sm font-bold text-slate-800 block">
                        Bhavana Kondakrindi
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold block">
                        B.Tech Computer Science & Engineering
                      </span>
                    </div>

                    {/* Cute Bedazzling Gem on Polaroid Corner */}
                    <div className="absolute -bottom-2 -right-2 pointer-events-none">
                      <GemSticker type="ruby" size={24} />
                    </div>
                  </div>

                  {/* Tangible University Dossier Slip */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-[#1A1714] shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase">Institution</span>
                      <span className="text-xs font-mono font-bold text-slate-900">KLH University</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase">Degree Standing</span>
                      <span className="text-xs font-mono font-bold text-slate-900">2nd Year (Sophomore)</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase">Academic Merit</span>
                      <span className="font-mono font-black text-xs text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        CGPA ~{profile.cgpa || "9.5"} / 10.0
                      </span>
                    </div>
                  </div>

                </div>

                {/* Bottom Quote Snippet */}
                <div className="pt-4 border-t border-dashed border-[#1A1714]/20 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-bold text-[#1A1714]">CONFIDENTIAL FIELD NOTES</span>
                  <span>BK // 2025</span>
                </div>

              </div>

              {/* RIGHT PAGE: Editorial Essay & Philosophy (7 cols) */}
              <div className="lg:col-span-7 p-7 sm:p-10 bg-white flex flex-col justify-between space-y-8">
                
                <div className="space-y-6">
                  
                  {/* Page Masthead */}
                  <div className="flex items-center justify-between border-b-2 border-dashed border-[#1A1714]/15 pb-3">
                    <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider">
                      PAGE 02 // ESSAY & PRINCIPLES
                    </span>
                    <div className="flex items-center gap-2">
                      <GemSticker type="amethyst" size={20} />
                      <span className="font-mono text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                        SOPHOMORE PERSPECTIVE
                      </span>
                    </div>
                  </div>

                  {/* Oversized Quote Callout */}
                  <div className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                    "I believe the most rewarding engineering happens at the intersection of robust data structures and thoughtful human interaction."
                  </div>

                  {/* Narrative Paragraphs with Drop-Cap */}
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

                  {/* Sticky Note: How I Approach Building */}
                  <div className="relative bg-[#FEF9C3] p-5 rounded-2xl border-2 border-[#1A1714] shadow-xs mt-6">
                    <div className="absolute -top-3.5 right-6 pointer-events-none">
                      <BinderClip type="pink-binder" rotate={4} />
                    </div>

                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-editorial font-bold text-amber-950 text-base">
                          My Engineering Philosophy
                        </h4>
                        <p className="text-xs text-amber-900 mt-1 leading-relaxed font-sans">
                          Rather than stopping at conceptual design, I value building complete, working prototypes—whether modeling flight disruption re-accommodations, implementing A* drone pathfinding under variable weather, or writing clean OOP financial ledgers.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Engineering Pillars Strip */}
                <div className="pt-6 border-t-2 border-[#1A1714]/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                    <Code2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="text-xs font-mono font-bold text-slate-800">Clean Code & OOP</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="text-xs font-mono font-bold text-slate-800">Algorithmic Problem-Solving</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-mono font-bold text-slate-800">User-Focused Applications</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
