import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const CustomCursor = () => {
  const { publishedData } = usePortfolio();
  const enabled = publishedData?.appearance?.customCursorEnabled !== false;

  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check for touch device or reduced motion
    const checkTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
        setIsTouch(true);
      }
    };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    checkTouch();

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .clickable');
      setIsHovered(Boolean(isInteractive));
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  // Smooth trail animation via requestAnimationFrame
  useEffect(() => {
    if (isTouch || !enabled) return;

    let animId;
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.22,
          y: prev.y + dy * 0.22,
        };
      });
      animId = requestAnimationFrame(updateTrail);
    };

    animId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animId);
  }, [pos, isTouch, enabled]);

  if (isTouch || !enabled || !isVisible) return null;

  return (
    <div className={`pointer-events-none fixed inset-0 z-[999999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Small precise dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[transform,background-color] duration-150 ease-out z-[99999]"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${isHovered ? 0.7 : 1})`,
          backgroundColor: isHovered ? '#F43F5E' : '#1E1E24',
        }}
      />

      {/* Delicate trailing ring */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 border border-slate-700/40 transition-[width,height,border-color,background-color] duration-200 ease-out z-[99998]"
        style={{
          transform: `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%)`,
          width: isHovered ? '38px' : '24px',
          height: isHovered ? '38px' : '24px',
          borderColor: isHovered ? '#F43F5E' : 'rgba(30, 30, 36, 0.45)',
          backgroundColor: isHovered ? 'rgba(244, 63, 94, 0.08)' : 'transparent',
        }}
      />
    </div>
  );
};
