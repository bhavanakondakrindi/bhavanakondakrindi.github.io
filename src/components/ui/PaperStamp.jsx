import React from 'react';

export const PaperStamp = ({
  text = 'KLH CSE',
  subtext = 'VERIFIED',
  color = '#F43F5E',
  className = '',
  rotate = -8,
}) => {
  return (
    <div
      style={{
        transform: `rotate(${rotate}deg)`,
        borderColor: color,
        color: color,
      }}
      className={`inline-flex flex-col items-center justify-center p-2 px-3 border-2 border-dashed rounded-lg uppercase tracking-widest font-mono text-xs select-none pointer-events-none opacity-90 shadow-sm ${className}`}
      aria-hidden="true"
    >
      <span className="font-bold text-[11px] leading-tight">{text}</span>
      {subtext && <span className="text-[9px] opacity-80">{subtext}</span>}
    </div>
  );
};

export const ScallopedSeal = ({
  label = "OFFICIAL",
  sub = "PORTFOLIO",
  bg = "#FEF08A",
  text = "#1E1E24",
  rotate = 6,
  className = ""
}) => {
  return (
    <div
      style={{
        transform: `rotate(${rotate}deg)`,
        backgroundColor: bg,
        color: text,
      }}
      className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 border-[#1E1E24] shadow-scrapbook text-center font-display select-none pointer-events-none p-1 ${className}`}
      aria-hidden="true"
    >
      <span className="text-[9px] font-bold tracking-wider uppercase leading-tight">{label}</span>
      <span className="text-[14px] font-extrabold leading-none my-0.5">★</span>
      <span className="text-[8px] font-semibold tracking-widest uppercase">{sub}</span>
    </div>
  );
};
