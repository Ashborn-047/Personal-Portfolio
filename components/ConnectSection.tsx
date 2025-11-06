import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../motionVariants';
import { useEmberCursor } from '../src/hooks/useEmberCursor';

const ConnectSection: React.FC = () => {
  const cardRef = useEmberCursor();
  
  // Placeholder for form submission logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const CONTACT_FORM_ENDPOINT = '...';
    console.log("Form submitted!");
  };

  return (
    <section id="connect" className="py-24 md:py-32 text-center relative section-background">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-4 relative"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,123,92,0.1),transparent_70%)] blur-2xl opacity-50 -z-10"></span>
          <span className="text-gradient-heading relative z-10">Let's Connect</span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-lg text-[#B8AEE6] mb-12"
        >
          I'm always open to collaborating on thoughtful projects or new ideas. Whether you're building something ambitious or exploring the intersection of design and technology — let's connect.
        </motion.p>

        <motion.div
          ref={cardRef}
          variants={fadeInUp}
          className="glow-card rounded-2xl p-6 sm:p-10 my-6 sm:my-12"
        >
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" required className="w-full bg-[rgba(40,30,60,0.2)] border border-[rgba(255,255,255,0.08)] p-3 rounded-lg focus:ring-transparent focus:outline-none transition-all duration-300 ease text-[#EDE8F6] placeholder-[#B8AEE6]/50 focus:shadow-[0_0_20px_rgba(255,123,92,0.25)] focus:border-[rgba(255,123,92,0.3)]" />
              <input type="email" placeholder="Your Email" required className="w-full bg-[rgba(40,30,60,0.2)] border border-[rgba(255,255,255,0.08)] p-3 rounded-lg focus:ring-transparent focus:outline-none transition-all duration-300 ease text-[#EDE8F6] placeholder-[#B8AEE6]/50 focus:shadow-[0_0_20px_rgba(255,123,92,0.25)] focus:border-[rgba(255,123,92,0.3)]" />
            </div>
            <textarea placeholder="Your Message" required rows={5} className="w-full bg-[rgba(40,30,60,0.2)] border border-[rgba(255,255,255,0.08)] p-3 rounded-lg focus:ring-transparent focus:outline-none transition-all duration-300 ease text-[#EDE8F6] placeholder-[#B8AEE6]/50 focus:shadow-[0_0_20px_rgba(255,123,92,0.25)] focus:border-[rgba(255,123,92,0.3)]"></textarea>
            <button
              type="submit"
              className="group relative inline-block text-lg font-semibold text-white px-4 py-2 rounded-xl overflow-hidden transition-all duration-300 ease bg-gradient-to-r from-[#FF7B5C] to-[#E86FFF] ember-glow hover:scale-105 hover:shadow-[0_0_40px_rgba(255,123,92,0.3)]"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF7B5C] to-[#E86FFF] transition-all duration-300 ease group-hover:opacity-90 blur-md"></span>
              <span className="relative rounded-xl bg-transparent px-4 py-2 transition-all duration-300 ease">
                Send Message
              </span>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ConnectSection;