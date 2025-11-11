import React from 'react';
import { motion } from 'framer-motion';

const motionFeatures = [
  {
    title: 'Cinematic Loaders',
    description: 'Smooth, elegant loading transitions that set the tone for the entire experience.',
    code: 'framer-motion',
  },
  {
    title: 'Logo Fill',
    description: 'Animated logo reveals that breathe life into brand identity.',
    code: 'SVG animations',
  },
  {
    title: 'Hero Transitions',
    description: 'Seamless transitions between sections, maintaining narrative flow.',
    code: 'scroll-triggered',
  },
];

export const BehindTheMotion = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-aurora-text mb-6 text-center">
          Behind the Motion
        </h2>
        <p className="text-lg text-aurora-text/80 text-center mb-12 max-w-3xl mx-auto">
          Describe cinematic loaders, logo fill, and hero transitions. 
          Use small code-snippet boxes or timeline visuals for context.
        </p>

        <div className="space-y-8">
          {motionFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-2xl aurora-glass"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-aurora-text mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-aurora-text/70 mb-4">
                    {feature.description}
                  </p>
                </div>
                <div className="px-4 py-2 rounded-lg aurora-glass">
                  <code className="text-sm font-mono text-aurora-text/80">
                    {feature.code}
                  </code>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline visual */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 relative"
        >
          <div className="h-1 bg-gradient-to-r from-aurora-coral via-aurora-lavender to-aurora-coral rounded-full" />
          <div className="flex justify-between mt-4">
            {['Load', 'Animate', 'Reveal', 'Flow'].map((step, i) => (
              <div key={step} className="text-center">
                <div className="w-3 h-3 rounded-full bg-aurora-coral mx-auto mb-2" />
                <span className="text-sm text-aurora-text/60">{step}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

