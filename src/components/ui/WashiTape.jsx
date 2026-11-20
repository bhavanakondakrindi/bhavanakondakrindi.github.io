import React from 'react';

export const WashiTape = ({
  color = 'yellow', // 'yellow', 'pink', 'mint', 'blue', 'lavender', or custom rgba
  className = '',
  rotate = 0,
  width = '120px',
  height = '28px',
}) => {
  const colorMap = {
    yellow: 'rgba(254, 240, 138, 0.88)',
    pink: 'rgba(251, 207, 232, 0.85)',
    mint: 'rgba(187, 247, 208, 0.85)',
    blue: 'rgba(186, 230, 253, 0.85)',
    lavender: 'rgba(221, 214, 254, 0.85)',
    coral: 'rgba(254, 215, 170, 0.85)',
  };

  const bg = colorMap[color] || color;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: bg,
        transform: `rotate(${rotate}deg)`,
      }}
      className={`washi-tape pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
