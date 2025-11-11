import React from 'react';
import { motion } from 'framer-motion';

export const AuroraHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight"
        >
          <div className="mb-2 hero-title relative inline-block">
            <span
              className="relative z-10"
              style={{
                background: 'linear-gradient(120deg, #a2b4ff, #ff8a70, #ffd7c9)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                mixBlendMode: 'overlay',
              }}
            >
              Aurora Veil
            </span>
            <span 
              className="absolute inset-0"
              style={{
                color: 'rgba(255,255,255,0.85)',
                filter: 'blur(2px)',
                mixBlendMode: 'screen',
                WebkitBackgroundClip: 'unset',
                backgroundClip: 'unset',
                pointerEvents: 'none',
              }}
            >
              Aurora Veil
            </span>
          </div>
          <div className="text-transparent bg-clip-text bg-aurora-accent-gradient">
            Mist & Dawn
          </div>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-aurora-text/80 mt-4"
        >
          How Ash & Ember came to life.
        </motion.p>

        {/* Placeholder for future hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-12 w-full max-w-2xl h-64 md:h-96 rounded-2xl aurora-glass"
        >
          {/* Hero image placeholder */}
        </motion.div>
      </div>
    </section>
  );
};

