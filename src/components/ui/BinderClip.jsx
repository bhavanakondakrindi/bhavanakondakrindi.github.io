import React from 'react';

// Clip types: 'metal-black', 'pink-binder', 'heart-clip', 'silver-clip'
export const BinderClip = ({ type = 'metal-black', className = '', rotate = 0 }) => {
  if (type === 'heart-clip') {
    return (
      <svg
        className={`pointer-events-none select-none drop-shadow-md ${className}`}
        style={{ transform: `rotate(${rotate}deg)` }}
        width="34"
        height="38"
        viewBox="0 0 34 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M17 32C17 32 4 23 4 12C4 6.5 8.5 2 14 2C15.8 2 17 3 17 3C17 3 18.2 2 20 2C25.5 2 30 6.5 30 12C30 23 17 32 17 32Z"
          stroke="#F43F5E"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 26C17 26 8 19 8 11.5C8 7.5 11 4.5 15 4.5C16.2 4.5 17 5.2 17 5.2C17 5.2 17.8 4.5 19 4.5C23 4.5 26 7.5 26 11.5C26 19 17 26 17 26Z"
          stroke="#FDA4AF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'pink-binder') {
    return (
      <svg
        className={`pointer-events-none select-none drop-shadow-md ${className}`}
        style={{ transform: `rotate(${rotate}deg)` }}
        width="44"
        height="36"
        viewBox="0 0 44 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Silver wire arms */}
        <path
          d="M14 18V6C14 3.8 15.8 2 18 2H26C28.2 2 30 3.8 30 6V18"
          stroke="#94A3B8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Pink Foldback Body */}
        <rect x="6" y="16" width="32" height="18" rx="2" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
        <rect x="10" y="19" width="24" height="2" fill="#FBCFE8" />
      </svg>
    );
  }

  // Default: metal black bulldog clip
  return (
    <svg
      className={`pointer-events-none select-none drop-shadow-md ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      width="44"
      height="38"
      viewBox="0 0 44 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Silver wire loops */}
      <path
        d="M13 20V8C13 4.7 15.7 2 19 2H25C28.3 2 31 4.7 31 8V20"
        stroke="#CBD5E1"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Black triangular binder body */}
      <polygon
        points="4,36 40,36 34,18 10,18"
        fill="#1E1E24"
        stroke="#0F172A"
        strokeWidth="1.5"
      />
      <line x1="8" y1="21" x2="36" y2="21" stroke="#475569" strokeWidth="1.5" />
    </svg>
  );
};
