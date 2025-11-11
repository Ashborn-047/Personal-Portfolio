import React from 'react';
import { motion } from 'framer-motion';

const ethosCards = [
  {
    title: 'Color',
    description: 'A delicate balance between warm coral and soft lavender, creating an airy, reflective atmosphere.',
    gradient: 'linear-gradient(135deg, #FFA87C, #B88DF2)',
  },
  {
    title: 'Motion',
    description: 'Cinematic transitions that breathe life into static elements, maintaining calm and reflection.',
    gradient: 'linear-gradient(135deg, #B88DF2, #FFA87C)',
  },
  {
    title: 'Typography',
    description: 'Clean, readable fonts that complement the light narrative without overwhelming the visual flow.',
    gradient: 'linear-gradient(135deg, #FFA87C, #B88DF2)',
  },
];

export const DesignEthos = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-aurora-text mb-6">
          Design Ethos
        </h2>
        <p className="text-lg md:text-xl text-aurora-text/80 leading-relaxed">
          A brief narrative explaining the philosophy: balance between art and engineering. 
          Every pixel, every transition, every interaction is crafted to reflect the harmony 
          between creative expression and technical precision.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {ethosCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="relative p-8 rounded-2xl aurora-glass"
          >
            <div 
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ background: card.gradient }}
            />
            <h3 className="text-2xl font-bold text-aurora-text mb-4 mt-2">
              {card.title}
            </h3>
            <p className="text-aurora-text/70 leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

