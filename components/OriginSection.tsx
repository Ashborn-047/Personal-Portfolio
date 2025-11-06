import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../motionVariants';

// ASSET_ORIGIN_IMAGE: Replace with a personal photo or an abstract visual representing your journey.
const ASSET_ORIGIN_IMAGE = 'https://picsum.photos/seed/origin/800/800';

const OriginSection: React.FC = () => {
  return (
    <section id="origin" className="py-24 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center"
      >
        <motion.div 
          variants={fadeInUp}
          className="md:col-span-2"
        >
          <div className="aspect-square relative group">
            <div className="absolute inset-0 bg-cyan rounded-lg transform transition duration-500 group-hover:rotate-3"></div>
            <img 
              src={ASSET_ORIGIN_IMAGE} 
              alt="Creator's Journey Visual" 
              className="relative w-full h-full object-cover rounded-lg z-10" 
            />
          </div>
        </motion.div>
        <motion.div 
          variants={fadeInUp}
          className="md:col-span-3"
        >
          <h2 className="text-3xl font-bold text-lightest-slate mb-4">
            From Curiosity to Creation
          </h2>
          <div className="space-y-4 text-light-slate text-lg">
            {/* GEMINI_API: This content can be generated or summarized by Gemini. */}
            <p>
              My journey began not with a line of code, but with a question: "How does this work?" This innate curiosity has been the driving force behind my evolution from a tinkerer to a builder. I believe the most powerful creations emerge from the spaces between disciplines.
            </p>
            <p>
              I thrive on translating complex problems into elegant, human-centric solutions. For me, engineering is not just about building systems; it's about crafting experiences that resonate, empower, and inspire.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OriginSection;
