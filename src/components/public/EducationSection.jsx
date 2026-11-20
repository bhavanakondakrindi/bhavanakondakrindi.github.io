import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, PlusCircle, CheckCircle2, Bookmark } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp } from '../ui/VintageStamps';
import { GemSticker } from '../ui/DoodleArrow';

export const EducationSection = () => {
  const { publishedData } = usePortfolio();
  const education = publishedData?.education || [];
  const achievements = publishedData?.achievements || [];
  const certifications = publishedData?.certifications || [];
  const profile = publishedData?.profile || {};

  return (
    <section id="education" className="py-20 md:py-28 relative bg-[#FAF7F2] border-b-2 border-[#1A1714] bg-ruled-paper">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#DDD6FE] border-2 border-[#1A1714] font-mono text-xs font-bold text-purple-950 uppercase tracking-widest mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-purple-700" />
              <span>Chapter 04 // Academics & Milestones</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
              Education & <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Milestones</span>
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-xl mt-2">
              Academic timeline at KLH Deemed to be University, core foundational coursework, and verified accomplishment logs.
            </p>
          </div>

          <div className="hidden sm:block">
            <PostmarkStamp text="ACADEMIC MERIT" date="KLH CSE • 2025" color="#7C3AED" rotate={3} />
          </div>
        </div>

        {/* Timeline & Scrapbook Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: University Degree & Coursework Case (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {education.map((edu, idx) => (
              <div
                key={edu.id || idx}
                className="relative bg-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-lg p-6 sm:p-9 space-y-6"
              >
                {/* Washi Tape Header */}
                <div className="absolute -top-3.5 left-10 z-20">
                  <WashiTape color="lavender" width="130px" height="26px" rotate={-2} />
                </div>

                {/* Top Badge Strip */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1A1714]/15 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[#DDD6FE] text-purple-950 border border-purple-300">
                      Undergraduate Degree
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period || "Present"}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ● Ongoing Second Year
                  </span>
                </div>

                {/* Degree & University Details */}
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                    {edu.degree}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-700 mt-2.5">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-rose-600" />
                      {edu.institution}
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-1 text-slate-500 font-semibold">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stamped CGPA Merit Seal */}
                <div className="p-4 rounded-2xl bg-[#FEF9C3] border-2 border-[#1A1714] shadow-scrapbook flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-950 uppercase tracking-wider block">
                      Academic Performance
                    </span>
                    <span className="text-xs font-sans text-amber-900 mt-0.5 block">
                      KLH Deemed to be University • Computer Science & Engineering
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border-2 border-[#1A1714] shadow-xs shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-600">CGPA:</span>
                    <span className="font-mono font-black text-lg text-rose-700">
                      ~{profile.cgpa || edu.cgpa || "9.5"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">/ 10.0</span>
                  </div>
                </div>

                {/* Coursework Index Pills */}
                {edu.coursework && (
                  <div className="pt-2 border-t-2 border-[#1A1714]/15">
                    <h4 className="font-editorial text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-700" />
                      <span>Foundational Coursework & Systems</span>
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-50 border-2 border-[#1A1714]/20 text-slate-800 font-bold hover:border-[#1A1714] transition-colors"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ))}

          </div>

          {/* Right Column: Accomplishments & Empty Certification Slots (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Accomplishments Card */}
            <div className="relative bg-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-lg p-6 sm:p-7 space-y-5">
              
              {/* Binder Clip on top right */}
              <div className="absolute -top-4 right-8 z-20">
                <BinderClip type="pink-binder" rotate={6} />
              </div>

              <div className="flex items-center gap-2.5 pb-3 border-b-2 border-[#1A1714]/15">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="font-editorial text-2xl font-black text-slate-900">
                  Accomplishments
                </h3>
              </div>

              <div className="space-y-3.5">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-4 rounded-2xl bg-slate-50 border-2 border-[#1A1714]/20 hover:border-[#1A1714] hover:shadow-xs transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-editorial font-bold text-base text-slate-900">
                        {ach.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black border border-emerald-300">
                        {ach.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Reserved Empty Slots for Certifications / Hackathons */}
              <div className="pt-4 border-t-2 border-dashed border-[#1A1714]/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-500">
                    Certifications & Events
                  </h4>
                  <a
                    href="#/admin"
                    className="text-[11px] font-mono text-rose-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Manage in Admin</span>
                  </a>
                </div>

                {certifications.length === 0 ? (
                  <div className="p-5 rounded-2xl border-2 border-dashed border-[#1A1714]/30 text-center bg-slate-50/70 space-y-2">
                    <p className="text-xs font-mono text-slate-600">
                      Empty space reserved for upcoming certifications, hackathons, and technical event participations.
                    </p>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
                      [SLOT RESERVED // EDITABLE IN ADMIN]
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {certifications.map((cert, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border-2 border-[#1A1714]/20 text-xs font-mono font-bold">
                        <span>{cert.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gem sticker accent */}
              <div className="flex justify-end pt-2">
                <GemSticker type="diamond" size={26} />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
