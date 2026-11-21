import React, { useEffect, useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const CustomCursor = () => {
  const { publishedData } = usePortfolio();
  const enabled = publishedData?.appearance?.customCursorEnabled !== false;

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Smooth trail position with lerp
  const trailPos = useRef({ x: -100, y: -100 });
  const trailElementRef = useRef(null);
  const dotElementRef = useRef(null);

  useEffect(() => {
    // Detect touch device or reduced motion
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

      // Instant positioning on the center core dot with zero latency
      if (dotElementRef.current) {
        dotElementRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      // Check interactive hover target
      const target = e.target;
      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, .clickable, [tabindex="0"], label');
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

  // Silky smooth interpolation loop for the outer blue ring aura
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
      className={`pointer-events-none fixed inset-0 z-[999999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Blue Orb (Slightly bigger, vibrant blue, silky glint) */}
      <div
        ref={dotElementRef}
        className="fixed top-0 left-0 w-3.5 h-3.5 rounded-full pointer-events-none z-[99999] transition-transform duration-75 ease-out shadow-[0_0_12px_rgba(14,165,233,0.7)]"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #7DD3FC 0%, #0284C7 60%, #0369A1 100%)',
          willChange: 'transform',
        }}
      />

      {/* Silky Outer Trailing Blue Ring Aura */}
      <div
        ref={trailElementRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] transition-[width,height,border-color,background-color] duration-200 ease-out shadow-[0_0_16px_rgba(56,189,248,0.2)]"
        style={{
          width: isHovered ? '50px' : '36px',
          height: isHovered ? '50px' : '36px',
          border: isHovered ? '2px solid #0284C7' : '1.5px solid rgba(14, 165, 233, 0.65)',
          backgroundColor: isHovered ? 'rgba(14, 165, 233, 0.16)' : 'rgba(56, 189, 248, 0.08)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};
