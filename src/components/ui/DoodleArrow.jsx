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
      className={`pointer-events-none select-none inline-block ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
};

export const GemSticker = ({ type = 'diamond', size = 32, className = '' }) => {
  if (type === 'ruby') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
        <polygon points="10,4 22,4 28,12 16,28 4,12" fill="#F43F5E" stroke="#881337" strokeWidth="1.5" />
        <polygon points="10,4 22,4 20,12 12,12" fill="#FDA4AF" opacity="0.6" />
        <polygon points="12,12 20,12 16,28" fill="#BE123C" />
      </svg>
    );
  }

  if (type === 'emerald') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
        <polygon points="16,2 30,16 16,30 2,16" fill="#10B981" stroke="#065F46" strokeWidth="1.5" />
        <polygon points="16,6 26,16 16,26 6,16" fill="#6EE7B7" opacity="0.7" />
      </svg>
    );
  }

  // Diamond Star
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`pointer-events-none select-none drop-shadow-sm ${className}`} aria-hidden="true">
      <polygon points="16,2 20,12 30,16 20,20 16,30 12,20 2,16 12,12" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.5" />
      <polygon points="16,7 18,13 24,16 18,19 16,25 14,19 8,16 14,13" fill="#BAE6FD" />
    </svg>
  );
};
