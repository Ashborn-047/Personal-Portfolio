import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'React', description: 'Component-based UI framework' },
  { name: 'Tailwind', description: 'Utility-first CSS framework' },
  { name: 'Framer Motion', description: 'Animation library for React' },
  { name: 'Cursor', description: 'AI-powered code editor' },
  { name: 'Gemini API', description: 'AI collaboration and generation' },
];

export const BuildingBlocks = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-aurora-text mb-12 text-center">
          Building Blocks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="p-6 rounded-2xl aurora-glass"
            >
              <h3 className="text-xl font-bold text-aurora-text mb-2">
                {tech.name}
              </h3>
              <p className="text-sm text-aurora-text/70">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

