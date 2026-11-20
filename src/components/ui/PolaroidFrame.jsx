import React from 'react';
import { WashiTape } from './WashiTape';
import { BinderClip } from './BinderClip';

export const PolaroidFrame = ({
  src,
  alt = "Scrapbook photo",
  caption = "",
  date = "",
  rotate = -2,
  tapeColor = "yellow",
  clipType = null, // 'metal-black', 'pink-binder', 'heart-clip'
  className = "",
  imageClassName = "h-72",
}) => {
  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`relative inline-block bg-white p-3 pb-8 rounded-sm shadow-polaroid border border-slate-200/90 transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] ${className}`}
    >
      {/* Top Clip or Washi Tape */}
      {clipType ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <BinderClip type={clipType} rotate={-2} />
        </div>
      ) : tapeColor ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <WashiTape color={tapeColor} width="110px" height="24px" rotate={-1} />
        </div>
      ) : null}

      {/* Photo Inset */}
      <div className={`overflow-hidden rounded-xs bg-slate-100 border border-slate-200/60 ${imageClassName}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Elegant placeholder fallback if image fails to load
            e.currentTarget.src = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80";
          }}
        />
      </div>

      {/* Caption & Date Area */}
      {(caption || date) && (
        <div className="mt-3 px-1 text-center font-handwriting">
          {caption && <p className="text-lg text-slate-800 font-bold leading-tight">{caption}</p>}
          {date && <p className="text-xs text-slate-500 font-mono tracking-wider mt-0.5">{date}</p>}
        </div>
      )}
    </div>
  );
};
