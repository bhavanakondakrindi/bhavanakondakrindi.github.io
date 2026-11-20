import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, PlusCircle, CheckCircle } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PaperStamp } from '../ui/PaperStamp';

export const EducationSection = () => {
  const { publishedData } = usePortfolio();
  const education = publishedData?.education || [];
  const achievements = publishedData?.achievements || [];
  const certifications = publishedData?.certifications || [];
  const profile = publishedData?.profile || {};

  return (
    <section id="education" className="py-20 md:py-28 relative bg-[#FDFBF7] border-b-2 border-[#1E1E24]/10 bg-lined-paper">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#DDD6FE] border border-purple-400 font-mono text-xs font-bold text-purple-950 uppercase tracking-widest mb-3">
              <span>Chapter 04</span>
              <span>•</span>
              <span>Academics & Milestones</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl font-black text-[#1E1E24] tracking-tight">
              Education & <span className="italic font-serif font-normal text-rose-600">Achievements</span>
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-xl mt-2">
              Academic timeline at KLH Deemed to be University, core coursework, and curated accomplishment logs.
            </p>
          </div>

          <div className="hidden sm:block">
            <PaperStamp text="CGPA" subtext={`~${profile.cgpa || "9.5"} / 10`} color="#7C3AED" rotate={-3} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {education.map((edu, idx) => (
              <div
                key={edu.id || idx}
                className="relative bg-white rounded-3xl border-2 border-[#1E1E24] shadow-scrapbook p-6 sm:p-8"
              >
                {/* Washi tape on top */}
                <div className="absolute -top-3 left-10">
                  <WashiTape color="lavender" width="110px" height="24px" rotate={-2} />
                </div>

                <div className="pt-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider font-bold px-2.5 py-0.5 rounded bg-[#DDD6FE] text-purple-950 border border-purple-300">
                      Undergraduate Degree
                    </span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period || "Present"}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                    {edu.degree}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 mt-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <GraduationCap className="w-4 h-4 text-rose-600" />
                      {edu.institution}
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    )}
                  </div>

                  {/* CGPA Badge */}
                  <div className="mt-4 p-3 rounded-xl bg-[#FEF9C3] border-2 border-dashed border-amber-400 inline-flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-amber-950 uppercase tracking-wider">
                      Academic Standing:
                    </span>
                    <span className="font-mono font-extrabold text-base text-rose-700 bg-white px-2.5 py-0.5 rounded border border-amber-300">
                      CGPA ~{profile.cgpa || edu.cgpa || "9.5"}
                    </span>
                    <span className="text-[11px] font-mono text-amber-800 hidden sm:inline">
                      (2nd Year Ongoing)
                    </span>
                  </div>

                  {/* Coursework & Foundations */}
                  {edu.coursework && (
                    <div className="mt-6 pt-5 border-t border-slate-200">
                      <h4 className="font-editorial text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                        <span>Core Coursework & Foundations</span>
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-700"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}

          </div>

          {/* Right Column: Achievements & Editable Empty Slots (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Achievements Card */}
            <div className="relative bg-white rounded-3xl border-2 border-[#1E1E24] shadow-scrapbook p-6">
              
              <div className="absolute -top-4 right-8">
                <BinderClip type="pink-binder" rotate={8} />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="font-editorial text-xl font-bold text-slate-900">
                  Accomplishments
                </h3>
              </div>

              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-editorial font-bold text-sm text-slate-900">
                        {ach.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        {ach.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-sans mt-1">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Editable Slots for Certifications / Hackathons */}
              <div className="mt-6 pt-5 border-t border-dashed border-slate-300">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-500">
                    Certifications & Events
                  </h4>
                  <a
                    href="#/admin"
                    className="text-[11px] font-mono text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <PlusCircle className="w-3 h-3" />
                    <span>Add New</span>
                  </a>
                </div>

                {certifications.length === 0 ? (
                  <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 text-center bg-slate-50/70">
                    <p className="text-xs font-mono text-slate-500">
                      Empty space reserved for upcoming certifications, hackathons, and technical event participations.
                    </p>
                    <a
                      href="#/admin"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E1E24] hover:text-rose-600"
                    >
                      <span>Manage in Admin CMS →</span>
                    </a>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {certifications.map((cert, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                        <span className="font-bold text-slate-800">{cert.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
