import React from 'react';

// Postage Cancellation Stamp with circular date and wavy postmark lines
export const PostmarkStamp = ({ text = "KLH UNIVERSITY", date = "HYDERABAD • VERIFIED", rotate = -8, color = "#DC2626", className = "" }) => {
  return (
    <div
      style={{ transform: `rotate(${rotate}deg)`, color }}
      className={`inline-flex items-center gap-2 pointer-events-none select-none opacity-85 ${className}`}
      aria-hidden="true"
    >
      {/* Circular cancellation mark */}
      <div
        style={{ borderColor: color }}
        className="w-14 h-14 rounded-full border-2 border-dashed flex flex-col items-center justify-center p-1 text-center"
      >
        <span className="text-[8px] font-mono font-black uppercase leading-tight tracking-wider">{text}</span>
        <span className="text-[6px] font-mono uppercase mt-0.5">{date}</span>
      </div>

      {/* Wavy cancellation ink lines */}
      <svg width="44" height="24" viewBox="0 0 44 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M0 6C6 2 12 10 18 6C24 2 30 10 36 6C40 3 42 5 44 6" />
        <path d="M0 12C6 8 12 16 18 12C24 8 30 16 36 12C40 9 42 11 44 12" />
        <path d="M0 18C6 14 12 22 18 18C24 14 30 22 36 18C40 15 42 17 44 18" />
      </svg>
    </div>
  );
};

// Editorial Barcode with Issue metadata
export const EditorialBarcode = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2 bg-white px-2.5 py-1 rounded border border-[#1A1714] shadow-xs ${className}`}>
      {/* Barcode lines */}
      <div className="flex items-center gap-0.5 h-6">
        <div className="w-1 h-full bg-[#1A1714]" />
        <div className="w-0.5 h-full bg-[#1A1714]" />
        <div className="w-1.5 h-full bg-[#1A1714]" />
        <div className="w-0.5 h-full bg-[#1A1714]" />
        <div className="w-2 h-full bg-[#1A1714]" />
        <div className="w-0.5 h-full bg-[#1A1714]" />
        <div className="w-1 h-full bg-[#1A1714]" />
        <div className="w-1.5 h-full bg-[#1A1714]" />
        <div className="w-0.5 h-full bg-[#1A1714]" />
        <div className="w-1 h-full bg-[#1A1714]" />
        <div className="w-2 h-full bg-[#1A1714]" />
      </div>
      <div className="text-[9px] font-mono font-bold leading-none text-slate-800 uppercase tracking-tighter">
        <span>ISSUE 02</span>
        <span className="block text-[7px] text-slate-500">VOL. EDITION</span>
      </div>
    </div>
  );
};

// Playful Cherries Sticker (Inspired by Reference 1)
export const CherriesSticker = ({ size = 32, className = "" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
      {/* Stems */}
      <path d="M11 20C11 10 18 4 23 2" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 21C24 12 20 6 23 2" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
      {/* Little green leaf */}
      <path d="M23 2C27 2 30 5 30 7C28 9 24 7 23 2Z" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
      {/* Left Cherry */}
      <circle cx="11" cy="24" r="8" fill="#E11D48" stroke="#9F1239" strokeWidth="1.5" />
      <ellipse cx="9" cy="22" rx="2.5" ry="1.5" fill="#FDA4AF" />
      {/* Right Cherry */}
      <circle cx="25" cy="25" r="8" fill="#E11D48" stroke="#9F1239" strokeWidth="1.5" />
      <ellipse cx="23" cy="23" rx="2.5" ry="1.5" fill="#FDA4AF" />
    </svg>
  );
};

// Red Ribbon Bow (Inspired by Reference 7)
export const RibbonBow = ({ className = "" }) => {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
      {/* Left Loop */}
      <path d="M20 14C14 6 4 8 6 16C8 22 18 16 20 14Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
      <path d="M12 12C8 10 7 14 10 16" stroke="#FECACA" strokeWidth="1" strokeLinecap="round" />
      {/* Right Loop */}
      <path d="M20 14C26 6 36 8 34 16C32 22 22 16 20 14Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
      <path d="M28 12C32 10 33 14 30 16" stroke="#FECACA" strokeWidth="1" strokeLinecap="round" />
      {/* Tails */}
      <path d="M18 16L12 28L16 26L19 18" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
      <path d="M22 16L28 28L24 26L21 18" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
      {/* Center knot */}
      <circle cx="20" cy="14" r="3.5" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1" />
    </svg>
  );
};
