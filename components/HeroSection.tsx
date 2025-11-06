import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../motionVariants';

// ASSET_HERO_BG: Replace with a symbolic, high-resolution image for the background.
const ASSET_HERO_BG = 'https://picsum.photos/seed/hero-bg/1920/1080';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSET_HERO_BG})` }}
      >
        {/* Animated Gradient Overlay - Updated colors */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-midnight/70 via-orchid/40 to-ember/60 animate-[gradient-fade_15s_ease_infinite]"></div>
        {/* Subtle gradient overlay to blend into background */}
        <div className="absolute inset-x-0 bottom-0 h-full z-20 bg-gradient-to-b from-transparent via-transparent to-bg-top/60"></div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-30 w-full max-w-4xl px-4" 
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-tight drop-shadow-md" 
        >
          Exploring Ideas.
          <br />
          <span className="text-gradient">Engineering Tomorrow.</span>
        </motion.h1>
        
        <motion.p
          variants={fadeInUp}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white drop-shadow-sm opacity-85" 
        >
          A creative technologist navigating the space between human-centered design and emergent technologies.
        </motion.p>
      </motion.div>
      {/* Section divider gradient */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-section-blend-fade to-transparent z-40"></div>
    </section>
  );
};

export default HeroSection;