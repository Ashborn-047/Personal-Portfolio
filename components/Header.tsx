import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../src/contexts/ThemeContext';
import { ThemeToggle } from '../src/components/ThemeToggle';
import Logo from './Logo';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Insights', href: '#insights' },
  { name: 'Connect', href: '#connect' },
];

const Header: React.FC = React.memo(() => {
  const { theme } = useTheme();
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
        scrolled ? 'shadow-lg shadow-[rgba(255,123,92,0.1)]' : ''
      }`}
      style={{
        background: scrolled 
          ? (theme === 'light' ? 'rgba(255,255,255,0.55)' : 'rgba(31,16,51,0.8)')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background 0.6s ease',
      }}
    >
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-20">
        <Logo />
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={link.href}
                className={`relative font-medium px-4 py-2 transition-all duration-300 group ${
                  theme === 'light' ? 'text-aurora-text' : 'text-[#E4E0F5]'
                }`}
              >
                <span className={`relative z-10 transition-colors duration-300 ${
                  theme === 'light' 
                    ? 'group-hover:text-aurora-coral group-hover:drop-shadow-[0_0_8px_rgba(255,168,124,0.5)]'
                    : 'group-hover:text-[#FF7B5C] group-hover:drop-shadow-[0_0_8px_rgba(255,123,92,0.5)]'
                }`}>
                  {link.name}
                </span>
              </a>
            </motion.div>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
});

Header.displayName = 'Header';

export default Header;