import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import { Heart, Lock, ArrowUp, Sparkles } from 'lucide-react';
import { Github, Linkedin } from '../ui/BrandIcons';
import { PaperStamp } from '../ui/PaperStamp';

export const Footer = () => {
  const { publishedData } = usePortfolio();
  const { isAdmin } = useAuth();
  const profile = publishedData?.profile || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white border-t-2 border-[#1E1E24] py-14 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#1E1E24]/10">
          
          {/* Brand info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-editorial text-2xl font-black text-[#1E1E24]">
                Bhavana Kondakrindi
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#FEF08A] text-amber-950 font-bold border border-amber-300">
                CSE 2nd Year
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500 max-w-sm">
              KLH Deemed to be University • Creative Developer Portfolio & Digital Journal
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/bhavanakondakrindi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border-2 border-[#1E1E24] shadow-scrapbook bg-white hover:-translate-y-0.5 transition-transform text-slate-800"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/bhavana-kondakrindi-26bb57379"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border-2 border-[#1E1E24] shadow-scrapbook bg-white hover:-translate-y-0.5 transition-transform text-slate-800"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full border-2 border-[#1E1E24] shadow-scrapbook bg-[#FEF08A] hover:-translate-y-0.5 transition-transform text-slate-800 font-bold"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Discreet Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p className="flex items-center gap-1.5">
            <span>Designed & Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>• Bhavana Kondakrindi © {new Date().getFullYear()}</span>
          </p>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:underline">About</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#contact" className="hover:underline">Contact</a>

            {/* Discreet Admin Portal Link */}
            <a
              href="#/admin"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-rose-600 font-bold transition-colors"
              title="Admin Content Management Dashboard"
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Admin Portal</span>
              {isAdmin && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Authenticated as Admin" />
              )}
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
};
