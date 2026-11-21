import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import { Palette, Lock, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { EditorialBarcode } from '../ui/VintageStamps';

export const Navbar = () => {
  const { publishedData, activeThemeId, setActiveThemeId } = usePortfolio();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteDropdownOpen, setPaletteDropdownOpen] = useState(false);

  const themes = publishedData?.appearance?.themes || [];

  const navLinks = [
    { num: '01', name: 'About', href: '#about' },
    { num: '02', name: 'Skills', href: '#skills' },
    { num: '03', name: 'Projects', href: '#projects' },
    { num: '04', name: 'Education', href: '#education' },
    { num: '05', name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b-2 border-[#1A1714] transition-colors">
      
      {/* Top Editorial Masthead Ticker Strip */}
      <div className="bg-[#1A1714] text-white px-4 py-1 text-[10px] font-mono tracking-widest uppercase flex items-center justify-between border-b border-black">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
          <span>DEV JOURNAL // VOL. 2025</span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="hidden sm:inline opacity-80">KLH DEEMED TO BE UNIVERSITY</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span className="hidden md:inline">CSE 2ND YEAR • CGPA ~9.5</span>
          <a
            href="#/admin"
            className="text-amber-300 hover:text-white flex items-center gap-1 font-bold transition-colors"
            title="Administrator Portal"
          >
            <Lock className="w-2.5 h-2.5" />
            <span>Admin</span>
            {isAdmin && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </a>
        </div>
      </div>

      {/* Main Masthead Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Brand Scrapbook Stamp */}
        <a href="#" className="group flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 bg-white border-2 border-[#1A1714] shadow-scrapbook rounded-md flex items-center justify-center font-editorial font-bold text-lg text-[#1A1714] group-hover:-rotate-3 transition-transform">
              BK
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#FEF08A] border border-[#1A1714] rounded-full flex items-center justify-center text-[7px] font-black">
              ★
            </div>
          </div>
          <div>
            <span className="font-editorial text-lg sm:text-xl font-black tracking-tight text-[#1A1714] block leading-none group-hover:text-rose-600 transition-colors">
              Bhavana Kondakrindi
            </span>
            <span className="text-[11px] font-mono text-slate-500 tracking-wider">
              Creative Developer Portfolio
            </span>
          </div>
        </a>

        {/* Center: Editorial Barcode (Desktop) */}
        <div className="hidden xl:block opacity-90 hover:opacity-100 transition-opacity">
          <EditorialBarcode />
        </div>

        {/* Desktop Navigation Links with Editorial Numbers */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-700 hover:text-[#1A1714] hover:bg-black/5 transition-all flex items-center gap-1.5"
            >
              <span className="text-[9px] text-slate-400 group-hover:text-rose-600 font-bold">
                [{link.num}]
              </span>
              <span>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Actions: Palette Quick Switcher & Mobile Menu */}
        <div className="flex items-center gap-2.5">
          {/* Palette Switcher */}
          <div className="relative">
            <button
              onClick={() => setPaletteDropdownOpen(!paletteDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold bg-white border-2 border-[#1A1714] rounded-full shadow-scrapbook hover:bg-slate-50 transition-all"
              title="Curated Visual Palettes"
            >
              <Palette className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline">Palette</span>
            </button>

            {paletteDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-[#1A1714] shadow-scrapbook-lg rounded-xl p-2 z-50">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 px-2 py-1 border-b border-slate-100 mb-1">
                  Flexible Palettes
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveThemeId(t.id);
                      setPaletteDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                      activeThemeId === t.id
                        ? 'bg-[#1A1714] text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/30"
                        style={{ backgroundColor: t.bgPrimary }}
                      />
                      <span className="truncate">{t.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-900 border-2 border-[#1A1714] rounded-lg bg-white shadow-xs"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-t-2 border-[#1A1714] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-mono font-bold text-slate-800 rounded-lg hover:bg-black/5"
            >
              <span>{link.name}</span>
              <span className="text-xs text-rose-600 font-bold">[{link.num}]</span>
            </a>
          ))}

          <div className="pt-3 border-t border-slate-300">
            <a
              href="#/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#1A1714] text-white text-xs font-mono font-bold"
            >
              <Lock className="w-3.5 h-3.5 text-yellow-300" />
              <span>Open Admin Studio</span>
            </a>
          </div>
        </div>
      )}

      {/* Decorative dashed deckle ruler line */}
      <div className="h-[2px] w-full border-b border-dashed border-[#1A1714]/30" />
    </header>
  );
};
