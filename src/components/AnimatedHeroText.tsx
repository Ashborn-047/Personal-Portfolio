import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../motionVariants';

const AnimatedHeroText: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="text-center"
    >
      <div
        className=""
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(2.25rem, 8vw, 5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
        }}
      >
        <span className="mr-4 text-white">Exploring</span>
        <span className="ml-4 inline-block text-white">Ideas.</span>
      </div>
      <div
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(2.25rem, 8vw, 5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          marginTop: "0.1em",
        }}
      >
        <span className="mr-4 text-white">Engineering</span>
        <span className="ml-4 inline-block text-white">Tomorrow.</span>
      </div>
    </motion.div>
  );
};

export default AnimatedHeroText;
