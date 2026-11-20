import React from 'react';

// Renders an authentic physical notebook spiral binding coil with punched holes and wire loops
export const SpiralSpine = ({ count = 12, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-between pointer-events-none select-none py-4 ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="relative flex items-center justify-center my-2">
          {/* Punched paper hole */}
          <div className="w-3.5 h-3.5 rounded-full bg-[#1A1714] shadow-inner" />
          
          {/* Chrome metal wire double loop */}
          <div className="absolute w-8 h-3 rounded-full border-2 border-slate-400 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 shadow-sm transform -rotate-12" />
        </div>
      ))}
    </div>
  );
};
