import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  const calculateScrollProgress = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollableHeight = documentHeight - windowHeight;
    
    if (scrollableHeight <= 0) {
      progressRef.current = 0;
      setScrollProgress(0);
      return;
    }

    // Calculate progress with ease-in-out curve
    const rawProgress = scrollTop / scrollableHeight;
    // Apply ease-in-out easing function
    const easedProgress = rawProgress < 0.5
      ? 2 * rawProgress * rawProgress
      : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
    
    progressRef.current = easedProgress;
    setScrollProgress(easedProgress);
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(calculateScrollProgress);
  }, [calculateScrollProgress]);

  useEffect(() => {
    // Initial calculation
    calculateScrollProgress();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, calculateScrollProgress]);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circle parameters
  const size = 44;
  const center = size / 2;
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  return (
    <motion.a 
      href="#home"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative z-10 block focus:outline-none focus:ring-2 focus:ring-offset-midnight focus:ring-orchid rounded-full group"
    >
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,123,92,0.4)]"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7B5C" /> {/* Ember */}
            <stop offset="100%" stopColor="#E86FFF" /> {/* Violet */}
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background ring (subtle, always visible) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#logoGradient)"
          strokeOpacity="0.2"
          strokeWidth="2.5"
          fill="none"
        />
        
        {/* Progress ring (fills with scroll) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#logoGradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${center} ${center})`}
          style={{
            transition: 'stroke-dashoffset 0.1s ease-out',
            filter: 'url(#glow)',
          }}
          className="group-hover:opacity-100"
        />
      </svg>
    </motion.a>
  );
};

export default Logo;