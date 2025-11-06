import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../motionVariants';
import { useEmberCursor } from '../src/hooks/useEmberCursor';

const principles = [
  {
    title: 'Human-Centered Design',
    description: 'Every idea begins with a question.',
  },
  {
    title: 'Elegant Engineering',
    description: 'Building for people, not just for efficiency.',
  },
  {
    title: 'Continuous Innovation',
    description: 'Mechanical systems thinking meets digital design.',
  },
];

const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 md:py-32 relative section-background">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12 relative">
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,123,92,0.1),transparent_70%)] blur-2xl opacity-50 -z-10"></span>
          <span className="text-gradient-heading relative z-10">Guiding Principles</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => {
            const PrincipleCard: React.FC = () => {
              const cardRef = useEmberCursor();
              return (
                <motion.div
                  ref={cardRef}
                  variants={fadeInUp}
                  className="glow-card rounded-2xl p-6 sm:p-10 my-6 sm:my-12 text-center"
                >
                  <h3 className="text-xl font-bold mb-2 text-[#EDE8F6]">{principle.title}</h3>
                  <p className="text-[#B8AEE6]">{principle.description}</p>
                </motion.div>
              );
            };
            return <PrincipleCard key={index} />;
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default PhilosophySection;