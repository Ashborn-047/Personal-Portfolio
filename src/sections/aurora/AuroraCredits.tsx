import React from 'react';
import { motion } from 'framer-motion';

export const AuroraCredits = () => {
  return (
    <footer className="relative py-12 md:py-16 px-6 md:px-12 lg:px-24 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <p className="text-aurora-text/60 text-sm md:text-base font-light italic">
          Every idea begins in darkness, finds light in reflection.
        </p>
      </motion.div>
    </footer>
  );
};

