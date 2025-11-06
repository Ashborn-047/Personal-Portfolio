import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../motionVariants';
import { GithubIcon, ArrowUpRightIcon } from './Icons';
import { useEmberCursor } from '../src/hooks/useEmberCursor';

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
    description: 'A lifestyle synchronization app that blends wellness, time-tracking, and mindfulness into a single elegant interface.',
    subtext: 'Designed and developed an adaptive interface that visualizes personal habits and emotional rhythms. Focused on gradient-based emotional states and dynamic lighting to enhance user mood perception.',
    tags: ['React', 'Framer Motion', 'TailwindCSS', 'PWA Ready'],
    githubLink: '#',
    liveLink: '#',
    image: 'https://picsum.photos/seed/lifesync/800/600',
    accentGradient: 'from-[#8a2be2] to-[#2de2e6]',
    hoverGlow: '#a48ad6',
  },
  {
    title: 'Webtoon Redesign — Stories in Motion',
    description: 'A conceptual rework of the Webtoon reading experience with a cinematic, emotional scroll experience.',
    subtext: 'Focused on clean typography, immersive story panels, and motion-driven transitions inspired by anime atmospheres.',
    tags: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    githubLink: '#',
    liveLink: '#',
    image: 'https://picsum.photos/seed/webtoon/800/600',
    accentGradient: 'from-[#ff6f61] to-[#ff9f91]',
    hoverGlow: '#ff6f61',
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
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
        <p className="text-[#FF7B5C] font-mono text-sm mb-2">Featured Project</p>
        <h3 className="text-3xl font-bold mb-4 text-[#EDE8F6]">{project.title}</h3>
        <div 
          ref={cardRef}
          className="glow-card p-6 rounded-3xl mb-6"
        >
          <p className="text-[#EDE8F6] mb-2">{project.description}</p>
          <p className="text-[#B8AEE6] text-sm">{project.subtext}</p>
        </div>
        <div className={`flex flex-wrap gap-2 mb-6 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-teal-glow/10 text-teal-glow text-xs font-mono rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className={`flex items-center gap-4 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
          {project.githubLink && (
            <motion.a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub" whileHover={{ scale: 1.1, color: project.hoverGlow }}>
              <GithubIcon className="w-6 h-6 text-[#B8AEE6] transition-all duration-300 ember-glow-hover" />
            </motion.a>
          )}
          {project.liveLink && (
            <motion.a href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" whileHover={{ scale: 1.1 }} className="ember-glow-hover">
              <ArrowUpRightIcon className="w-6 h-6 text-[#B8AEE6] transition-all duration-300" />
            </motion.a>
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