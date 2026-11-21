import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Mail,
  CheckCircle2,
  Copy,
  ExternalLink,
  Bookmark,
  Sparkles,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { Github, Linkedin } from '../ui/BrandIcons';
import { DynamicSticker } from '../ui/DynamicSticker';

export const ContactSection = () => {
  const { publishedData } = usePortfolio();
  const contact = publishedData?.contactInfo || {};
  const profile = publishedData?.profile || {};

  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.socialLinks?.email || 'bhavanakondakrindi@example.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 relative border-b-2 border-[#1A1714] bg-graph-paper transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary, #FAF7F2)' }}
    >
      
      {/* Whimsical Bedazzling Gem Background Accents */}
      <DynamicSticker id="contact_gem_diamond" className="absolute top-16 left-12 pointer-events-none hidden lg:block" />
      <DynamicSticker id="contact_gem_butterfly" className="absolute bottom-16 right-16 pointer-events-none hidden lg:block" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDA4AF] border-2 border-[#1A1714] font-mono text-xs font-bold text-rose-950 uppercase tracking-widest mb-3 shadow-xs">
            <Bookmark className="w-3.5 h-3.5 text-rose-700" />
            <span>Chapter 05 // Air-Mail Dispatch & Direct Channels</span>
          </div>

          <div className="relative inline-block">
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
              Get In <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Touch</span>
            </h2>
            <div className="absolute -top-3 -right-6 pointer-events-none">
              <DynamicSticker id="contact_sparkle" />
            </div>
          </div>

          <p className="text-slate-600 font-sans text-base mt-2">
            {contact.subheading || "Whether you have questions about my projects, want to collaborate on engineering initiatives, or just say hello—reach out directly!"}
          </p>
        </div>

        {/* Vintage Air-Mail Dispatch Parcel (Form completely removed, zero clipping on stickers!) */}
        <div className="relative bg-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl overflow-visible">
          
          {/* Top Washi Tape (Positioned freely without clipping!) */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <DynamicSticker id="contact_tape_top" />
          </div>

          {/* Inner Content with Rounded Corners */}
          <div className="rounded-[22px] overflow-hidden">
            {/* Top Air-Mail Strip */}
            <div className="airmail-strip w-full border-b-2 border-[#1A1714]" />

            <div className="p-6 sm:p-12 space-y-8 bg-[#FDFBF7]">
              
              {/* Top Return Address & Postmark Strip */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#1A1714]/15">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                    RETURN DISPATCH // SENDER
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    Bhavana Kondakrindi
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 font-bold">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-rose-600" />
                      KLH Deemed to be University
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      Hyderabad, India
                    </span>
                  </div>
                </div>

                {/* Cancellation Postmark */}
                <div className="shrink-0">
                  <DynamicSticker id="contact_postmark" />
                </div>
              </div>

              {/* Direct Channels Cards (Centered & Balanced Layout) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* GitHub Card */}
                <a
                  href="https://github.com/bhavanakondakrindi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl bg-white border-2 border-[#1A1714] shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#1A1714] text-white flex items-center justify-center shadow-xs">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-black tracking-widest text-slate-400 block">
                        SOURCE CODE & WORK
                      </span>
                      <span className="font-editorial font-bold text-lg text-slate-900 block group-hover:text-rose-600 transition-colors">
                        GitHub Profile
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">
                        @bhavanakondakrindi
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center group-hover:bg-[#1A1714] group-hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>

                {/* LinkedIn Card */}
                <a
                  href="https://linkedin.com/in/bhavana-kondakrindi-26bb57379"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl bg-white border-2 border-[#1A1714] shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#0077B5] text-white flex items-center justify-center shadow-xs">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-black tracking-widest text-slate-400 block">
                        PROFESSIONAL NETWORK
                      </span>
                      <span className="font-editorial font-bold text-lg text-slate-900 block group-hover:text-blue-600 transition-colors">
                        LinkedIn Profile
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">
                        bhavana-kondakrindi
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center group-hover:bg-[#0077B5] group-hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>

              </div>

              {/* Direct Email Card (Prominent & User-Friendly) */}
              <div className="p-6 rounded-2xl bg-[#FEF9C3] border-2 border-[#1A1714] shadow-scrapbook flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1A1714] flex items-center justify-center shadow-xs shrink-0">
                    <Mail className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-black tracking-widest text-amber-950 block">
                      DIRECT EMAIL DISPATCH
                    </span>
                    <p className="font-mono text-sm sm:text-base font-black text-slate-900 break-all select-all">
                      {profile.socialLinks?.email || 'bhavanakondakrindi@example.com'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={copyEmailToClipboard}
                  className="px-5 py-2.5 rounded-xl bg-white border-2 border-[#1A1714] text-xs font-mono font-bold text-[#1A1714] shadow-xs hover:bg-slate-50 flex items-center justify-center gap-2 shrink-0 transition-all"
                >
                  {copiedEmail ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-black">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-600" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Friendly Handwritten Sign-off */}
              <div className="pt-6 border-t-2 border-[#1A1714]/15 text-center relative">
                <div className="max-w-md mx-auto space-y-2">
                  <p className="font-handwriting text-2xl text-slate-900 font-bold leading-relaxed">
                    "{contact.closingMessage || "Thank you for flipping through my digital scrapbook & developer journal! Built with care, code, and curiosity."}"
                  </p>
                  <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                    — Bhavana Kondakrindi • CSE Sophomore
                  </p>
                </div>

                {/* Red Ribbon Bow Sticker */}
                <div className="absolute bottom-0 left-4 hidden sm:block pointer-events-none">
                  <DynamicSticker id="contact_ribbon_bottom" />
                </div>

                {/* Gem Sticker */}
                <div className="absolute bottom-0 right-4 hidden sm:block pointer-events-none">
                  <DynamicSticker id="contact_gem_ruby" />
                </div>
              </div>

            </div>

            {/* Bottom Air-Mail Strip */}
            <div className="airmail-strip w-full border-t-2 border-[#1A1714]" />
          </div>
        </div>

      </div>
    </section>
  );
};
