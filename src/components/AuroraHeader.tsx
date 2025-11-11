import React from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export const AuroraHeader = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'transparent',
        boxShadow: 'none',
      }}
    >
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-end h-20">
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
};

