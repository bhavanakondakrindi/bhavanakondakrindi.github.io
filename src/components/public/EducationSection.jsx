import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  CheckCircle2,
  Bookmark,
  Sparkles,
  School,
  Star
} from 'lucide-react';
import { DynamicSticker } from '../ui/DynamicSticker';

export const EducationSection = () => {
  const { publishedData } = usePortfolio();
  const headings = publishedData?.sectionHeadings || {};
  const education = publishedData?.education || [];
  const achievements = publishedData?.achievements || [];
  const certifications = publishedData?.certifications || [];
  const profile = publishedData?.profile || {};

  return (
    <section
      id="education"
      className="py-20 md:py-32 relative border-b-2 border-[#1A1714] bg-ruled-paper transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary, #FAF7F2)' }}
    >
      
      {/* Whimsical Bedazzling Gems in Background */}
      <DynamicSticker id="edu_gem_topaz" className="absolute top-16 right-16 pointer-events-none hidden lg:block" />
      <DynamicSticker id="edu_gem_amethyst" className="absolute bottom-20 left-10 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDD6FE] border-2 border-[#1A1714] font-mono text-xs font-bold text-purple-950 uppercase tracking-widest mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-purple-700" />
              <span>{headings.educationBadge || "Chapter 04 // Academics & Milestones"}</span>
            </div>
            <div className="relative inline-block">
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
                {headings.educationTitleMain || "Academic"}{' '}
                <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">
                  {headings.educationTitleAccent || "Standing"}
                </span>
              </h2>
              <div className="absolute -top-3 -right-6 pointer-events-none">
                <DynamicSticker id="edu_sparkle" />
              </div>
            </div>
            <p className="text-slate-600 font-sans text-base max-w-xl mt-2">
              {headings.educationSubtitle || "Formal degree progression at KLH Deemed to be University, core foundational coursework, and verified milestones."}
            </p>
          </div>

          <div className="hidden sm:block">
            <DynamicSticker id="edu_postmark" />
          </div>
        </div>

        {/* =========================================================================
            UNIVERSITY DIPLOMA & ACADEMIC LEDGER SPREAD (No overflow-hidden clipping!)
           ========================================================================= */}
        {education.map((edu, idx) => (
          <div
            key={edu.id || idx}
            className="relative bg-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl p-7 sm:p-10 mb-12 overflow-visible"
          >
            {/* Washi Tape & Bow Header (Sitting proud on top, completely uncut!) */}
            <div className="absolute -top-3.5 left-12 z-20 pointer-events-none">
              <DynamicSticker id="edu_tape_diploma" />
            </div>

            <div className="absolute -top-5 right-10 z-20 hidden sm:block pointer-events-none">
              <DynamicSticker id="edu_ribbon_diploma" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Degree & Institutional Identity (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#DDD6FE] text-purple-950 border border-purple-300 uppercase tracking-wider">
                    UNDERGRADUATE DEGREE PROGRESSION
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ● Ongoing 2nd Year (Sophomore)
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                    {edu.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-slate-700 mt-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <GraduationCap className="w-5 h-5 text-rose-600" />
                      {edu.institution}
                    </span>
                    {edu.location && (
                      <span className="text-slate-500 font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-sans text-slate-700 text-sm leading-relaxed">
                  Engaged in rigorous undergraduate study covering algorithmic thinking, object-oriented software engineering, database management, and modern interactive applications.
                </p>

                {/* Coursework Tags */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    Core Foundational Coursework:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Data Structures & Algorithms',
                      'Object-Oriented Programming (Java)',
                      'Database Management Systems',
                      'Computer Organization & Architecture',
                      'Operating Systems Principles',
                      'Web Technologies'
                    ].map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-xs font-mono font-bold text-purple-950"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Stamped CGPA Wax Seal & Standing Plaque (5 cols) */}
              <div className="lg:col-span-5 bg-[#FAF5FF] p-6 sm:p-8 rounded-3xl border-2 border-[#1A1714] shadow-scrapbook space-y-6 text-center sm:text-left relative">
                
                <div className="flex items-center justify-between border-b-2 border-purple-200 pb-3">
                  <span className="font-mono text-xs font-bold text-purple-900 uppercase tracking-wider">
                    ACADEMIC MERIT SEAL
                  </span>
                  <Award className="w-5 h-5 text-purple-700" />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-[#FEF08A] border-3 border-[#1A1714] shadow-scrapbook flex flex-col items-center justify-center shrink-0">
                    <span className="font-editorial font-black text-2xl text-slate-900 leading-none">
                      {profile.cgpa || "9.5"}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-900 uppercase">
                      CGPA / 10
                    </span>
                  </div>

                  <div>
                    <span className="font-editorial text-lg font-bold text-slate-900 block">
                      Distinction Standing
                    </span>
                    <p className="text-xs font-sans text-slate-600 mt-0.5">
                      Consistent academic rigor maintained across all engineering semesters at KLH Deemed to be University.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-purple-200 text-xs font-mono text-slate-700 flex items-center justify-between">
                  <span>RECORD ENROLLED:</span>
                  <span className="font-bold text-purple-950">2023 – 2027 (EXPECTED)</span>
                </div>

              </div>

            </div>
          </div>
        ))}

        {/* =========================================================================
            ACCOMPLISHMENTS & MILESTONE CLIPPINGS (With Whimsical Stickers)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Achievements Card */}
          <div className="relative bg-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl p-7 sm:p-8 space-y-6 overflow-visible">
            <div className="absolute -top-3 left-10 pointer-events-none">
              <DynamicSticker id="edu_tape_achievements" />
            </div>

            <div className="flex items-center justify-between border-b-2 border-[#1A1714]/15 pb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="font-editorial text-2xl font-bold text-slate-900">
                  Key Achievements
                </h3>
              </div>
              <span className="font-mono text-xs font-bold text-slate-500">
                MERIT LOG
              </span>
            </div>

            <div className="space-y-4">
              {achievements.length > 0 ? (
                achievements.map((ach, aIdx) => (
                  <div key={ach.id || aIdx} className="p-4 rounded-2xl bg-[#FEF9C3]/50 border border-amber-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-editorial font-bold text-sm text-amber-950">
                        {ach.title}
                      </span>
                      {ach.year && (
                        <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          {ach.year}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-sans text-amber-900 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-600">
                  Academic distinctions and project accolades maintained continuously throughout the CSE undergraduate program.
                </div>
              )}
            </div>
          </div>

          {/* Certifications & Practical Badges */}
          <div className="relative bg-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl p-7 sm:p-8 space-y-6 overflow-visible">
            <div className="absolute -top-3 right-10 pointer-events-none">
              <DynamicSticker id="edu_tape_certifications" />
            </div>

            <div className="flex items-center justify-between border-b-2 border-[#1A1714]/15 pb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <h3 className="font-editorial text-2xl font-bold text-slate-900">
                  Continuous Learning
                </h3>
              </div>
              <span className="font-mono text-xs font-bold text-slate-500">
                ACTIVE
              </span>
            </div>

            <div className="space-y-4">
              {certifications.length > 0 ? (
                certifications.map((cert, cIdx) => (
                  <div key={cert.id || cIdx} className="p-4 rounded-2xl bg-[#DCFCE7]/40 border border-emerald-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-editorial font-bold text-sm text-emerald-950">
                        {cert.title}
                      </span>
                      {cert.issuer && (
                        <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {cert.issuer}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-sans text-emerald-900 leading-relaxed">
                      {cert.date || 'Coursework & Skill Verification'}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-600">
                  Actively pursuing coursework certifications and technical mastery across Java OOP, Python algorithmic simulation, and modern React.js web engineering.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
