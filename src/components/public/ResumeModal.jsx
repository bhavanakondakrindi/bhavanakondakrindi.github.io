import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X,
  Download,
  ExternalLink,
  GraduationCap,
  Award,
  Sparkles,
  FileText,
  Calendar,
  MapPin,
  CheckCircle2,
  Code2,
  BookOpen,
  Mail
} from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';
import { BinderClip } from '../ui/BinderClip';
import { PostmarkStamp, RibbonBow } from '../ui/VintageStamps';
import { GemSticker } from '../ui/DoodleArrow';

export const ResumeModal = () => {
  const { isResumeModalOpen, setIsResumeModalOpen, publishedData } = usePortfolio();
  const profile = publishedData?.profile || {};
  const resume = profile?.resume || {};
  const resumeUrl = resume?.url || profile?.resumeUrl || '';
  const hasFile = Boolean(resumeUrl && resumeUrl !== '#' && resumeUrl.length > 5);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isResumeModalOpen) {
        setIsResumeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResumeModalOpen, setIsResumeModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isResumeModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isResumeModalOpen]);

  return (
    <AnimatePresence>
      {isResumeModalOpen && (
        <div
          key="resume-modal-container"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Silky Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => setIsResumeModalOpen(false)}
            className="fixed inset-0 bg-[#1A1714]/80 backdrop-blur-md z-10"
          />

          {/* Archival Folio Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 30, stiffness: 340 }}
            className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-2xl border-3 border-[#1A1714] shadow-scrapbook-xl overflow-hidden z-20 my-auto max-h-[92vh] flex flex-col"
          >
            {/* Top Washi Tape accent */}
            <div className="absolute -top-3 left-16 z-30 pointer-events-none">
              <WashiTape color="lavender" width="140px" height="26px" rotate={-1} />
            </div>

            {/* Folio Masthead Bar */}
            <div className="relative bg-white border-b-2 border-[#1A1714] px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-wider font-bold px-3 py-1 rounded bg-[#DDD6FE] border-2 border-[#1A1714] text-purple-950 shadow-xs flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-700" />
                  <span>CURRICULUM VITAE // FOLIO 01</span>
                </span>
                <span className="text-xs font-mono text-slate-500 hidden sm:inline font-semibold">
                  KLH University CSE Sophomore
                </span>
              </div>

              {/* Close & Action Controls */}
              <div className="flex items-center gap-2">
                {hasFile && (
                  <a
                    href={resumeUrl}
                    download={resume.fileName || "Bhavana_Kondakrindi_Resume.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-mono font-bold hover:bg-emerald-700 shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                )}

                {hasFile && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border-2 border-[#1A1714] bg-white hover:bg-slate-100 transition-colors shadow-xs"
                    title="Open Full Document in New Tab"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-700" />
                  </a>
                )}

                <button
                  onClick={() => setIsResumeModalOpen(false)}
                  className="p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border-2 border-[#1A1714] transition-colors shadow-xs"
                  title="Close Folio (Escape)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Folio Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 bg-graph-paper-fine">
              
              {/* If user uploaded a document or link, embed it or show launchpad */}
              {hasFile ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border-2 border-[#1A1714] shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#DDD6FE] border border-purple-300 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-800" />
                      </div>
                      <div>
                        <h4 className="font-editorial font-bold text-slate-900 text-base">
                          {resume.fileName || "Bhavana Kondakrindi — Curriculum Vitae"}
                        </h4>
                        <p className="text-xs font-mono text-slate-500">
                          {resume.fileSize ? `${resume.fileSize} • ` : ''}Verified PDF Record
                        </p>
                      </div>
                    </div>

                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#1A1714] text-white font-mono text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Open Full PDF</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Document Viewer Frame */}
                  <div className="rounded-2xl border-2 border-[#1A1714] overflow-hidden bg-slate-900 shadow-scrapbook min-h-[500px] h-[65vh]">
                    <iframe
                      src={resumeUrl}
                      title="Bhavana Kondakrindi Resume"
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>
              ) : (
                /* Fallback Elegant Archival Document Sheet when no PDF has been uploaded yet */
                <div className="relative bg-white rounded-2xl border-2 border-[#1A1714] shadow-scrapbook p-7 sm:p-10 space-y-8">
                  
                  {/* Top Seal Stamp */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1A1714]/15 pb-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-black tracking-widest text-purple-900 block">
                        AUTHENTICATED FOLIO SPECIFICATION
                      </span>
                      <h2 className="font-editorial text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                        Bhavana Kondakrindi
                      </h2>
                      <p className="font-mono text-xs text-slate-600 mt-1">
                        B.Tech Computer Science & Engineering Sophomore • KLH Deemed to be University
                      </p>
                    </div>

                    {/* Stamped Merit Mark */}
                    <div className="shrink-0 flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-[#FEF08A] border-2 border-[#1A1714] shadow-scrapbook flex flex-col items-center justify-center text-center">
                        <span className="font-editorial font-black text-lg text-slate-900 leading-none">
                          {profile.cgpa || "9.5"}
                        </span>
                        <span className="text-[7px] font-mono font-bold text-amber-900 uppercase">
                          CGPA / 10
                        </span>
                      </div>
                      <PostmarkStamp text="MERIT RECORD" date="HYD • 2025" color="#7C3AED" rotate={3} />
                    </div>
                  </div>

                  {/* Summary Narrative */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      Professional Profile:
                    </span>
                    <p className="text-sm font-sans text-slate-800 leading-relaxed">
                      {profile.intro || "Computer Science Engineering undergraduate with a strong analytical foundation in Data Structures, Algorithms, Object-Oriented Software Engineering, and Modern Web Architectures."}
                    </p>
                  </div>

                  {/* Academic Credentials */}
                  <div className="p-5 rounded-xl bg-[#FAF5FF] border border-purple-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-editorial font-bold text-base text-purple-950">
                        KLH Deemed to be University
                      </span>
                      <span className="font-mono text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded">
                        2023 – 2027 (Expected)
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-700">
                      Bachelor of Technology in Computer Science and Engineering • CGPA: ~{profile.cgpa || "9.5"} / 10.0
                    </p>
                  </div>

                  {/* Technical Repertoire Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                      <span className="font-mono text-[10px] font-black uppercase text-amber-900 block">
                        Languages
                      </span>
                      <p className="font-bold text-slate-900">Java, Python, JavaScript</p>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1.5">
                      <span className="font-mono text-[10px] font-black uppercase text-rose-900 block">
                        Web Technologies
                      </span>
                      <p className="font-bold text-slate-900">React.js, HTML5, CSS3 / Tailwind</p>
                    </div>

                    <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 space-y-1.5">
                      <span className="font-mono text-[10px] font-black uppercase text-sky-900 block">
                        CS Foundations
                      </span>
                      <p className="font-bold text-slate-900">DSA, OOP Design, Algorithms</p>
                    </div>
                  </div>

                  {/* Admin Notice */}
                  <div className="p-4 rounded-xl bg-[#FEF9C3] border-2 border-[#1A1714] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-amber-950 font-sans">
                      <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        <strong>Admin Note:</strong> You can upload and replace this with your custom PDF file anytime in the Admin Studio!
                      </span>
                    </div>

                    <a
                      href="#/admin"
                      onClick={() => setIsResumeModalOpen(false)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1A1714] text-white font-mono text-[11px] font-bold hover:bg-slate-800 transition-colors shrink-0 text-center"
                    >
                      Upload PDF in Admin Studio
                    </a>
                  </div>

                </div>
              )}

            </div>

            {/* Footer Bar */}
            <div className="bg-white border-t-2 border-[#1A1714] px-6 py-3.5 flex items-center justify-between shrink-0 text-xs font-mono text-slate-500">
              <span>Bhavana Kondakrindi • Academic Dossier</span>
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-[#1A1714] text-white font-mono text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
              >
                Close Folio
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
