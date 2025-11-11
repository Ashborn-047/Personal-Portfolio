import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../motionVariants';
import { GithubIcon, ArrowUpRightIcon } from './Icons';
import { useEmberCursor } from '../src/hooks/useEmberCursor';
import { useTheme } from '../src/contexts/ThemeContext';

interface Project {
  title: string;
  description: string;
  subtext: string; // Added subtext field
  tags: string[];
  githubLink?: string;
  liveLink?: string;
  image: string;
  accentGradient: string; // Added accent gradient field
  hoverGlow: string; // Added hover glow field
}

// ASSET_PROJECT_LIFESYNC, ASSET_PROJECT_WEBTOON: Replace with your project mockup images.
const projects: Project[] = [
  {
    title: 'LifeSync — Your Rhythm, Reimagined',
    description: 'A lifestyle synchronization app that transforms how people understand their daily patterns—where wellness, budget-tracking, and mindfulness converge into a single, emotionally intelligent interface.',
    subtext: 'Built an adaptive system that visualizes personal rhythms through gradient-based emotional states and dynamic lighting, creating an interface that doesn\'t just track habits—it reflects how you feel.',
    tags: ['React', 'Framer Motion', 'TailwindCSS', 'PWA Ready'],
    githubLink: 'https://github.com/Ashborn-047/Mobile_Test_app',
    liveLink: '#',
    image: `${(import.meta as any).env?.BASE_URL || '/Personal-Portfolio/'}lifesync-mockup.png`,
    accentGradient: 'from-[#8a2be2] to-[#2de2e6]',
    hoverGlow: '#a48ad6',
  },
  {
    title: 'Webtoon Ecosystem Redesign — Stories in Motion',
    description: 'A full-scale redesign of Webtoon\'s web ecosystem transforming fragmented user experiences into a unified, behaviorally driven storytelling platform.',
    subtext: 'Focused on creator visibility, micro-personalization, and emotional UX, the project reimagines how users discover, connect, and engage with digital comics.\n\nResearch-backed redesign powered by 50+ data sources and UX psychology principles (Fogg Model, Hick\'s Law, Zeigarnik Effect).',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    githubLink: 'https://github.com/Ashborn-047/Webtoon-Ecosystem-Platform-Redesign-',
    liveLink: '#',
    image: `${(import.meta as any).env?.BASE_URL || '/Personal-Portfolio/'}webtoon_mockup.png`,
    accentGradient: 'from-[#ff6f61] to-[#ff9f91]',
    hoverGlow: '#ff6f61',
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { theme } = useTheme();
  const isReversed = index % 2 !== 0;
  const cardRef = useEmberCursor();

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24"
    >
      {/* Image Column: Adjusted to 4/12 width on large screens for balance */}
      <div className={`lg:col-span-4 ${isReversed ? 'lg:order-last' : ''}`}>
        <motion.a 
          href={project.liveLink || project.githubLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="block group overflow-hidden transition-all duration-300 hover:scale-105 rounded-3xl"
          whileHover={{ scale: 1.05, y: -2 }} // Gentle hover lift
        >
          <img src={project.image} alt={project.title} className="w-full h-auto object-cover rounded-none" />
        </motion.a>
      </div>
      
      {/* Text Column: Adjusted to 8/12 width on large screens */}
      <div className={`lg:col-span-8 text-center lg:text-left ${isReversed ? 'lg:text-right' : ''}`}>
        <p className={`font-mono text-sm mb-2 transition-colors duration-600 ${
          theme === 'light' ? 'text-aurora-coral' : 'text-[#FF7B5C]'
        }`}>Featured Project</p>
        <h3 className={`text-3xl font-bold mb-4 transition-colors duration-600 ${
          theme === 'light' ? 'text-aurora-text' : 'text-[#EDE8F6]'
        }`}>{project.title}</h3>
        <div 
          ref={cardRef}
          className={`p-6 rounded-3xl mb-6 transition-all duration-600 ${
            theme === 'light' 
              ? 'bg-glass-bg-light backdrop-blur-md border border-glass-border-light shadow-light-diffusion'
              : 'glow-card'
          }`}
          style={theme === 'light' ? {
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          } : {}}
        >
          <p className={`mb-2 transition-colors duration-600 ${
            theme === 'light' ? 'text-aurora-text' : 'text-[#EDE8F6]'
          }`}>{project.description}</p>
          <p className={`text-sm whitespace-pre-line transition-colors duration-600 ${
            theme === 'light' ? 'text-aurora-text/70' : 'text-[#B8AEE6]'
          }`}>{project.subtext}</p>
        </div>
        <div className={`flex flex-wrap gap-2 mb-6 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
          {project.tags.map((tag) => (
            <span key={tag} className={`px-3 py-1 text-xs font-mono rounded-full transition-colors duration-600 ${
              theme === 'light' 
                ? 'bg-white/30 text-aurora-text border border-white/20'
                : 'bg-teal-glow/10 text-teal-glow'
            }`}>
              {tag}
            </span>
          ))}
        </div>
        <div className={`flex items-center gap-4 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
          {project.githubLink && (
            <motion.a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub" whileHover={{ scale: 1.1, color: project.hoverGlow }}>
              <GithubIcon className={`w-6 h-6 transition-all duration-300 ${
                theme === 'light' ? 'text-aurora-text/70 hover:text-aurora-coral' : 'text-[#B8AEE6] ember-glow-hover'
              }`} />
            </motion.a>
          )}
          {project.liveLink && (
            <motion.div 
              onClick={(e) => e.preventDefault()} 
              aria-label="Live Demo" 
              whileHover={{ scale: 1.1 }} 
              className={`cursor-default ${theme === 'dark' ? 'ember-glow-hover' : ''}`}
            >
              <ArrowUpRightIcon className={`w-6 h-6 transition-all duration-300 ${
                theme === 'light' ? 'text-aurora-text/70 hover:text-aurora-coral' : 'text-[#B8AEE6]'
              }`} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 md:py-32 relative section-background">
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-5xl font-bold text-center mb-16 relative z-10">
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,123,92,0.1),transparent_70%)] blur-2xl opacity-50 -z-10"></span>
          <span className="text-gradient-heading relative z-10">Featured Work</span>
        </motion.h2>
        <div className="relative z-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
    </section>
  );
};

export default ProjectsSection;