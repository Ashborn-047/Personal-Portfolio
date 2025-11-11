import React from 'react';
import { motion } from 'framer-motion';

export const Reflections = () => {
  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Floating dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {typeof window !== 'undefined' && [...Array(12)].map((_, i) => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-particle-gold/40"
              initial={{
                x: Math.random() * width,
                y: Math.random() * height,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * height],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-aurora-text mb-8">
          Reflections
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-aurora-text/80 leading-relaxed italic"
        >
          Short poetic paragraph about iteration and imperfection. Every pixel placed, 
          every transition crafted, every line of code written—they all carry the weight 
          of countless iterations. In the space between perfection and imperfection lies 
          the beauty of creation. We build not to achieve flawlessness, but to capture 
          moments of clarity in the ever-evolving dance of design and development.
        </motion.p>
      </motion.div>
    </section>
  );
};

