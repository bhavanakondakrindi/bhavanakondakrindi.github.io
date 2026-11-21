import React from 'react';

export const DoodleArrow = ({ className = '', color = '#1E1E24', rotate = 0 }) => {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      width="64"
      height="44"
      viewBox="0 0 64 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 28C18 36 34 32 54 12M54 12L42 10M54 12L52 24"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SparkleStar = ({ size = 24, color = '#FDE047', className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="#1E1E24"
      strokeWidth="1.5"
      className={`pointer-events-none select-none inline-block drop-shadow-xs ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
};

// Rich collection of whimsical bedazzling gem stickers (Inspired by Reference 4)
export const GemSticker = ({ type = 'diamond', size = 32, className = '' }) => {
  if (type === 'ruby') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
        <polygon points="10,4 22,4 28,12 16,28 4,12" fill="#F43F5E" stroke="#881337" strokeWidth="1.5" />
        <polygon points="10,4 22,4 20,12 12,12" fill="#FDA4AF" opacity="0.8" />
        <polygon points="12,12 20,12 16,28" fill="#BE123C" />
        {/* Sparkle glint */}
        <circle cx="12" cy="8" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  if (type === 'emerald') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
        <polygon points="16,2 30,16 16,30 2,16" fill="#10B981" stroke="#065F46" strokeWidth="1.5" />
        <polygon points="16,6 26,16 16,26 6,16" fill="#6EE7B7" opacity="0.8" />
        <polygon points="16,10 22,16 16,22 10,16" fill="#A7F3D0" />
        <circle cx="14" cy="10" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  if (type === 'amethyst') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
        {/* Heart shaped gem */}
        <path
          d="M16 28L6 17C2 13 4 6 10 6C13 6 15 8 16 10C17 8 19 6 22 6C28 6 30 13 26 17L16 28Z"
          fill="#A855F7"
          stroke="#581C87"
          strokeWidth="1.5"
        />
        <path d="M10 9C7 9 5 12 7 15L16 24L25 15C27 12 25 9 22 9C20 9 18 10 16 12C14 10 12 9 10 9Z" fill="#D8B4FE" opacity="0.7" />
        <circle cx="11" cy="11" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  if (type === 'topaz') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
        {/* Golden Octagon */}
        <polygon points="10,2 22,2 30,10 30,22 22,30 10,30 2,22 2,10" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
        <polygon points="12,6 20,6 26,12 26,20 20,26 12,26 6,20 6,12" fill="#FDE68A" opacity="0.8" />
        <circle cx="12" cy="8" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  if (type === 'pink-moon') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
        <path
          d="M24 6C16 7 10 14 11 22C12 26 15 29 18 30C10 30 4 23 4 15C4 7 10 1 18 1C20 1 22 2 24 6Z"
          fill="#EC4899"
          stroke="#831843"
          strokeWidth="1.5"
        />
        <circle cx="9" cy="14" r="1.5" fill="#FBCFE8" />
        <circle cx="14" cy="22" r="1" fill="#FFFFFF" />
      </svg>
    );
  }

  if (type === 'butterfly') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
        {/* Wings */}
        <path d="M16 16C12 8 4 6 4 14C4 18 10 20 16 16Z" fill="#10B981" stroke="#065F46" strokeWidth="1.2" />
        <path d="M16 16C20 8 28 6 28 14C28 18 22 20 16 16Z" fill="#10B981" stroke="#065F46" strokeWidth="1.2" />
        <path d="M16 16C12 22 6 24 8 28C10 30 14 26 16 16Z" fill="#34D399" stroke="#065F46" strokeWidth="1.2" />
        <path d="M16 16C20 22 26 24 24 28C22 30 18 26 16 16Z" fill="#34D399" stroke="#065F46" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="2" fill="#047857" />
      </svg>
    );
  }

  // Default Diamond Star (Cyan / Sky)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
      <polygon points="16,2 20,12 30,16 20,20 16,30 12,20 2,16 12,12" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
      <polygon points="16,6 19,13 26,16 19,19 16,26 13,19 6,16 13,13" fill="#38BDF8" />
      <circle cx="15" cy="11" r="1.5" fill="#FFFFFF" />
    </svg>
  );
};
