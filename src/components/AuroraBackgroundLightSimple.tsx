import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const AuroraBackgroundLightSimple: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Simple, direct approach - no masks, just gradients with blur
  // Using STRONG colors and LESS blur for maximum visibility
  const ribbons = [
    {
      x: 20,
      width: 300,
      colors: ['rgba(168, 182, 255, 1)', 'rgba(197, 168, 255, 0.9)', 'rgba(232, 223, 245, 0.5)', 'transparent'],
      delay: 0,
    },
    {
      x: 50,
      width: 350,
      colors: ['rgba(255, 177, 163, 1)', 'rgba(255, 214, 201, 0.9)', 'rgba(255, 232, 219, 0.5)', 'transparent'],
      delay: 5,
    },
    {
      x: 75,
      width: 280,
      colors: ['rgba(197, 168, 255, 1)', 'rgba(168, 182, 255, 0.9)', 'rgba(232, 223, 245, 0.5)', 'transparent'],
      delay: 10,
    },
  ];

  useEffect(() => {
    console.log('🔵 AuroraBackgroundLightSimple rendered!', {
      ribbonsCount: ribbons.length,
      shouldReduceMotion,
    });
  }, [shouldReduceMotion]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none',
      background: 'linear-gradient(180deg, #F5F3FF 0%, #E8DFF5 50%, #FFE8DB 100%)',
    }}>
      {ribbons.map((ribbon, index) => {
        const gradient = `linear-gradient(to bottom, ${ribbon.colors.join(', ')})`;
        
        return (
          <motion.div
            key={index}
            style={{
              position: 'absolute',
              top: '-15%',
              bottom: '-15%',
              left: `${ribbon.x}%`,
              width: `${ribbon.width}px`,
              height: '130%',
              background: gradient,
              filter: 'blur(50px)', // Reduced blur for visibility
              opacity: 0.8, // Higher opacity
              transform: 'translateX(-50%)',
              mixBlendMode: 'normal', // No blend mode for maximum visibility
            }}
            animate={shouldReduceMotion ? {} : {
              x: ['0px', '30px', '-20px', '0px'],
              opacity: [0.6, 0.8, 0.7, 0.6],
              scaleY: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 25 + index * 5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
              delay: ribbon.delay,
            }}
          />
        );
      })}
    </div>
  );
};

export default AuroraBackgroundLightSimple;

