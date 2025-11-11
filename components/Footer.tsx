import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, EmailIcon } from './Icons';
import { fadeInUp, staggerContainer } from '../motionVariants';
import { useTheme } from '../src/contexts/ThemeContext';

const socialLinks = [
  { href: 'https://github.com/Ashborn-047', Icon: GithubIcon, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/pushan-bhattacharyya-40b718287', Icon: LinkedinIcon, label: 'LinkedIn' },
  { href: 'mailto:bhattacharyyapushan@gmail.com', Icon: EmailIcon, label: 'Email' },
];

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className={`py-12 text-center relative overflow-hidden transition-all duration-600 ${
          theme === 'light' 
            ? 'bg-gradient-to-b from-white/20 to-transparent'
            : 'bg-gradient-to-b from-[#120014] to-[#060009]'
        }`}
    >
      {/* Faint top glow gradient for separation */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-30 transition-all duration-600 ${
        theme === 'light' ? 'via-aurora-coral' : 'via-[#FF7B5C]'
      }`}></div>
      <div className={`container mx-auto px-6 transition-colors duration-600 ${
        theme === 'light' ? 'text-aurora-text/70' : 'text-[#B8AEE6]'
      }`}>
        <motion.div variants={fadeInUp} className="flex justify-center items-center space-x-6 mb-4">
          {socialLinks.map(({ href, Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 ease-in-out ${
                theme === 'light' 
                  ? 'text-aurora-text/70 hover:text-aurora-coral'
                  : 'text-[#B8AEE6] ember-glow-hover'
              }`}
              whileHover={{ y: -3, scale: 1.1 }}
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
        <motion.p variants={fadeInUp} className={`font-mono text-sm transition-colors duration-600 ${
          theme === 'light' ? 'text-aurora-text/70' : 'text-[#B8AEE6]'
        }`}>
          © {currentYear} Pushan. Built with curiosity and continuous exploration.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;