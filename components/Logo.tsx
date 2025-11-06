import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.a 
      href="#home"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative z-10 block focus:outline-none focus:ring-2 focus:ring-offset-midnight focus:ring-orchid rounded-full"
    >
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b388eb" /> {/* Orchid */}
            <stop offset="100%" stopColor="#2de2e6" /> {/* Teal Glow */}
          </linearGradient>
        </defs>
        {/* Replace this with your new minimal geometric monogram (like an abstract "P∞B" loop) SVG paths */}
        {/* Example placeholder: */}
        <path d="M22 11C15.9249 11 11 15.9249 11 22C11 28.0751 15.9249 33 22 33C28.0751 33 33 28.0751 33 22" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M22 33C28.0751 33 33 28.0751 33 22C33 15.9249 28.0751 11 22 11C15.9249 11 11 15.9249 11 22" stroke="url(#logoGradient)" strokeOpacity="0.3" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    </motion.a>
  );
};

export default Logo;