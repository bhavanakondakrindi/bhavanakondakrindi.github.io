import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import { Palette, Lock, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { WashiTape } from '../ui/WashiTape';

export const Navbar = ({ onOpenAuth }) => {
  const { publishedData, activeThemeId, setActiveThemeId } = usePortfolio();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteDropdownOpen, setPaletteDropdownOpen] = useState(false);

  const themes = publishedData?.appearance?.themes || [];

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b-2 border-[#1E1E24]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Scrapbook Tag */}
        <a href="#" className="group flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-white border-2 border-[#1E1E24] shadow-scrapbook rounded-lg flex items-center justify-center font-editorial font-bold text-xl text-[#1E1E24] group-hover:-rotate-3 transition-transform">
              BK
            </div>
            <div className="absolute -top-2 -right-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
            </div>
          </div>
          <div>
            <span className="font-editorial text-xl font-bold tracking-tight text-[#1E1E24] block leading-none">
              Bhavana K.
            </span>
            <span className="text-xs font-mono text-slate-500 tracking-wider">
              CSE • Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-sm font-semibold text-slate-700 hover:text-[#1E1E24] hover:bg-black/5 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls: Theme Switcher & Admin Access */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Palette Switcher */}
          <div className="relative">
            <button
              onClick={() => setPaletteDropdownOpen(!paletteDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium bg-white/80 border border-slate-300 rounded-full shadow-xs hover:border-[#1E1E24] transition-all"
              title="Change visual theme palette"
            >
              <Palette className="w-3.5 h-3.5 text-rose-500" />
              <span>Palette</span>
            </button>

            {paletteDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-[#1E1E24] shadow-scrapbook rounded-xl p-2 z-50">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 px-2 py-1">
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
                        ? 'bg-slate-100 text-[#1E1E24] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: t.bgPrimary }}
                      />
                      <span>{t.name}</span>
                    </div>
                    {t.tag && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-600 font-mono">
                        {t.tag}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Admin Access Discreet Link */}
          <a
            href="#/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-full bg-[#1E1E24] text-white hover:bg-slate-800 transition-all shadow-xs"
            title="Private Full-Page Admin CMS"
          >
            <Lock className="w-3 h-3 text-yellow-300" />
            <span>Admin</span>
            {isAdmin && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="#/admin"
            className="p-2 text-slate-700 hover:text-black rounded-lg"
            title="Admin Login"
          >
            <Lock className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF7F2] border-b-2 border-[#1E1E24] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-800 rounded-lg hover:bg-black/5"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-3 border-t border-slate-200">
            <p className="text-xs font-mono text-slate-500 uppercase mb-2">Color Palettes</p>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveThemeId(t.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium border ${
                    activeThemeId === t.id ? 'border-[#1E1E24] bg-white font-bold' : 'border-slate-200'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: t.bgPrimary }} />
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
