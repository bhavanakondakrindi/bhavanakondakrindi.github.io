import React, { useEffect, useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const CustomCursor = () => {
  const { publishedData } = usePortfolio();
  const enabled = publishedData?.appearance?.customCursorEnabled !== false;

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTextTarget, setIsTextTarget] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Smooth trail position
  const trailPos = useRef({ x: -100, y: -100 });
  const trailElementRef = useRef(null);
  const dotElementRef = useRef(null);

  useEffect(() => {
    // Detect touch device or accessibility preference
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePos({ x, y });

      if (!isVisible) setIsVisible(true);

      // Instantly position the center dot with ZERO lag
      if (dotElementRef.current) {
        dotElementRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      // Check target type
      const target = e.target;
      const isInput = target.closest('input, textarea, select, [contenteditable="true"]');
      setIsTextTarget(Boolean(isInput));

      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, .clickable, [tabindex="0"]');
      setIsHovered(Boolean(isInteractive) && !isInput);
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

  // Silky smooth interpolation loop for the outer ring aura
  useEffect(() => {
    if (isTouch || !enabled) return;

    let animId;
    const animateTrail = () => {
      const dx = mousePos.x - trailPos.current.x;
      const dy = mousePos.y - trailPos.current.y;
      
      trailPos.current.x += dx * 0.28;
      trailPos.current.y += dy * 0.28;

      if (trailElementRef.current) {
        trailElementRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(animateTrail);
    };

    animId = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(animId);
  }, [mousePos, isTouch, enabled]);

  if (isTouch || !enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] transition-opacity duration-300 ${
        isVisible && !isTextTarget ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Instant Pointer Dot (Zero Latency) */}
      <div
        ref={dotElementRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] transition-[background-color,transform] duration-150 ease-out"
        style={{
          backgroundColor: isHovered ? '#E11D48' : '#1A1714',
          willChange: 'transform',
        }}
      />

      {/* Silky Outer Ring Aura */}
      <div
        ref={trailElementRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{
          width: isHovered ? '36px' : '22px',
          height: isHovered ? '36px' : '22px',
          border: isHovered ? '1.5px solid #E11D48' : '1px solid rgba(26, 23, 20, 0.4)',
          backgroundColor: isHovered ? 'rgba(225, 29, 72, 0.08)' : 'transparent',
          willChange: 'transform',
        }}
      />
    </div>
  );
};
