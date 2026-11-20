import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import { Heart, Lock, ArrowUp, Sparkles } from 'lucide-react';
import { Github, Linkedin } from '../ui/BrandIcons';
import { PostmarkStamp, EditorialBarcode } from '../ui/VintageStamps';

export const Footer = () => {
  const { publishedData } = usePortfolio();
  const { isAdmin } = useAuth();
  const profile = publishedData?.profile || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white border-t-3 border-[#1A1714] py-16 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b-2 border-[#1A1714]/15 items-center">
          
          {/* Left: Magazine Colophon Brand (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-3xl font-black text-[#1A1714] tracking-tight">
                Bhavana Kondakrindi
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-amber-950 font-black border border-amber-300">
                CSE 2ND YR
              </span>
            </div>

            <p className="text-xs font-mono text-slate-600 max-w-md leading-relaxed">
              COLOPHON: Designed as a bespoke digital scrapbook and editorial magazine. Typeset in Fraunces, Playfair Display & Plus Jakarta Sans. Built with React, Tailwind CSS, Framer Motion & Supabase.
            </p>

            <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              KLH Deemed to be University • Hyderabad, India
            </div>
          </div>

          {/* Middle: Editorial Barcode (3 cols) */}
          <div className="md:col-span-3 flex justify-start md:justify-center">
            <EditorialBarcode />
          </div>

          {/* Right: Social & Scroll to Top (3 cols) */}
          <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-3">
            <a
              href="https://github.com/bhavanakondakrindi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook bg-white hover:-translate-y-0.5 transition-transform text-slate-900"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/bhavana-kondakrindi-26bb57379"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook bg-white hover:-translate-y-0.5 transition-transform text-slate-900"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-2xl border-2 border-[#1A1714] shadow-scrapbook bg-[#FEF08A] hover:-translate-y-0.5 transition-transform text-slate-900 font-bold"
              title="Return to Cover / Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Metadata & Admin Entry */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p className="flex items-center gap-1.5">
            <span>Authored & Engineered with craft</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>• Bhavana Kondakrindi © {new Date().getFullYear()}</span>
          </p>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:underline font-bold">About</a>
            <a href="#skills" className="hover:underline font-bold">Skills</a>
            <a href="#projects" className="hover:underline font-bold">Projects</a>
            <a href="#education" className="hover:underline font-bold">Education</a>
            <a href="#contact" className="hover:underline font-bold">Contact</a>

            {/* Discreet Admin Portal Link */}
            <a
              href="#/admin"
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-rose-600 font-black transition-colors bg-slate-100 px-3 py-1 rounded-full border border-slate-300"
              title="Full-Page Admin CMS Studio"
            >
              <Lock className="w-3 h-3 text-amber-600" />
              <span>Admin Studio</span>
              {isAdmin && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Admin Authenticated" />
              )}
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
};
