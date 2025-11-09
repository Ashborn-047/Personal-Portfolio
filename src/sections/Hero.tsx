import React, { useState, useEffect } from 'react';

// Hero background image path - using base URL for GitHub Pages
const HERO_BG_PATH = `${(import.meta as any).env?.BASE_URL || '/Personal-Portfolio/'}hero-bg.png`;

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      className="relative h-screen min-h-[30rem] w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG_PATH})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'right center' : 'center', // Show glowing object on mobile
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Responsive dark overlay - lighter on mobile to show visual elements */}
      <div className="absolute inset-0 bg-[rgba(11,0,20,0.15)] md:bg-[rgba(11,0,20,0.3)] z-[5] pointer-events-none"></div>
      
      {/* Responsive vignette effect - less intense on mobile */}
      <div 
        className="absolute inset-0 z-[6] pointer-events-none"
        style={{
          background: isMobile 
            ? 'radial-gradient(ellipse at center, transparent 0%, rgba(11,0,20,0.15) 70%, rgba(11,0,20,0.4) 100%)'
            : 'radial-gradient(ellipse at center, transparent 0%, rgba(11,0,20,0.4) 70%, rgba(11,0,20,0.8) 100%)',
        }}
      ></div>
      
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center w-full px-4 text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <div className="mb-2 text-[#EDE8F6]">
            Exploring Ideas.
          </div>
          <div className="text-gradient">
            Engineering Tomorrow.
          </div>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#EDE8F6]/90">
          A creative technologist navigating the space between human-centered design and emergent technologies.
        </p>
      </div>
    </section>
  );
};
