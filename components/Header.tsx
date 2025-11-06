import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Insights', href: '#insights' },
  { name: 'Connect', href: '#connect' },
];

const Header: React.FC = React.memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const rafRef = React.useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[rgba(31,16,51,0.8)] backdrop-blur-md shadow-lg shadow-[rgba(255,123,92,0.1)]' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-20">
        <Logo />
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-[#E4E0F5] hover:text-[#FF7B5C] transition-all duration-300 ember-glow-hover"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
});

Header.displayName = 'Header';

export default Header;