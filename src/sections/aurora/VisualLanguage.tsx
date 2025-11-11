import React from 'react';
import { motion } from 'framer-motion';

const ashEmberPalette = [
  { name: 'Midnight', color: '#0b0c10' },
  { name: 'Orchid', color: '#b388eb' },
  { name: 'Ember', color: '#ff6f61' },
  { name: 'Ash', color: '#a7a9be' },
];

const auroraPalette = [
  { name: 'Warm Start', color: '#FFF8F2' },
  { name: 'Coral', color: '#FFA87C' },
  { name: 'Lavender', color: '#B88DF2' },
  { name: 'Soft End', color: '#F4EBFF' },
];

export const VisualLanguage = () => {
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
          Visual Language
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Ash & Ember Palette */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl aurora-glass"
          >
            <h3 className="text-2xl font-bold text-aurora-text mb-6">
              Ash & Ember
            </h3>
            <div className="space-y-4">
              {ashEmberPalette.map((swatch) => (
                <motion.div
                  key={swatch.name}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-16 h-16 rounded-lg shadow-md"
                    style={{ backgroundColor: swatch.color }}
                  />
                  <div>
                    <div className="font-semibold text-aurora-text">{swatch.name}</div>
                    <div className="text-sm text-aurora-text/60">{swatch.color}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Aurora Veil Palette */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl aurora-glass"
          >
            <h3 className="text-2xl font-bold text-aurora-text mb-6">
              Aurora Veil
            </h3>
            <div className="space-y-4">
              {auroraPalette.map((swatch) => (
                <motion.div
                  key={swatch.name}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-16 h-16 rounded-lg shadow-md border border-white/20"
                    style={{ backgroundColor: swatch.color }}
                  />
                  <div>
                    <div className="font-semibold text-aurora-text">{swatch.name}</div>
                    <div className="text-sm text-aurora-text/60">{swatch.color}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated gradient bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 h-2 rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #FFA87C, #B88DF2, #FFA87C)',
            backgroundSize: '200% 100%',
            animation: 'gradient-flow 3s ease infinite',
          }}
        />
      </motion.div>

      <style>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

