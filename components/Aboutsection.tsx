import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInLeft, fadeInUp } from '../motionVariants';
import { useEmberCursor } from '../src/hooks/useEmberCursor';

// ASSET_ABOUT_AVATAR: Replace with a path to your custom animated/illustrated avatar.
// The avatar should be a stylized cartoon/anime character representing a creative technologist,
// with a thoughtful vibe, possibly surrounded by faint visual motifs like gears or circuits.
const ASSET_ABOUT_AVATAR = '/creator-avatar.png';

const AboutSection: React.FC = () => {
  const cardRef = useEmberCursor();
  
  return (
    <section id="about" className="py-24 md:py-32 relative section-background">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center relative z-10"
      >
        <motion.div 
          variants={fadeInUp}
          className="md:col-span-3"
        >
          <div 
            ref={cardRef}
            className="glow-card rounded-2xl p-6 sm:p-10 my-6 sm:my-12"
          >
            <h2 className="text-3xl font-bold mb-6 relative">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,123,92,0.1),transparent_70%)] blur-2xl opacity-50 -z-10"></span>
              <span className="text-gradient-heading relative z-10">From Curiosity to Creation</span>
            </h2>
            <div className="space-y-4 text-[#B8AEE6] text-lg leading-relaxed">
              <p>
                My story began not with code, but with curiosity — <em>How does this work?</em>
              </p>
              <p>
                I'm a mechanical engineer by degree and a creative technologist by passion, fascinated by systems — mechanical or digital — that move with purpose. What started with gears and engines evolved into code, motion, and interfaces that feel alive.
              </p>
              <p>
                  For me, engineering is empathy — crafting systems that connect, empower, and inspire.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          variants={fadeInLeft}
          className="md:col-span-2 order-first md:order-last relative rounded-full overflow-hidden max-w-xs mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-hint/30 via-transparent to-ember-hint/30 opacity-70 blur-xl"></div>
          <img 
            src={ASSET_ABOUT_AVATAR} 
            alt="Stylized avatar of a creative technologist with thematic visual motifs" 
            className="relative w-full h-auto object-cover z-10 rounded-full"
          />
          <div className="absolute inset-0 bg-about-image-overlay z-20"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;