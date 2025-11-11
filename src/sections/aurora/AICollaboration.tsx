import React from 'react';
import { motion } from 'framer-motion';

const aiWorkflow = [
  {
    tool: 'Gemini',
    role: 'Ideation & Planning',
    description: 'Brainstorming concepts, refining ideas, and structuring the narrative flow.',
  },
  {
    tool: 'Cursor',
    role: 'Code Generation',
    description: 'AI-assisted development, component scaffolding, and code optimization.',
  },
  {
    tool: 'Image Generation',
    role: 'Visual Assets',
    description: 'Creating custom graphics, illustrations, and visual elements.',
  },
];

export const AICollaboration = () => {
  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Light particle background overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-particle-gold animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-particle-white animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-particle-cream animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-particle-gold animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-aurora-text mb-6 text-center">
          AI Collaboration
        </h2>
        <p className="text-lg text-aurora-text/80 text-center mb-12 max-w-3xl mx-auto">
          Section dedicated to the workflow with Gemini, Cursor, and image generation. 
          Add light particle background to symbolize "creative flow."
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {aiWorkflow.map((item, index) => (
            <motion.div
              key={item.tool}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="p-8 rounded-2xl aurora-glass"
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-aurora-accent-gradient mb-2">
                {item.tool}
              </div>
              <div className="text-sm font-semibold text-aurora-text/60 mb-3">
                {item.role}
              </div>
              <p className="text-aurora-text/70 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Creative flow visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex justify-center items-center gap-4"
        >
          {['Gemini', '→', 'Cursor', '→', 'Image Gen'].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className={item === '→' ? 'text-2xl text-aurora-text/40' : 'px-4 py-2 rounded-lg aurora-glass text-aurora-text font-semibold'}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

