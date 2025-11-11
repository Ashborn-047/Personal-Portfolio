import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const AuroraBackgroundLightCurvy: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Aurora ribbons with curvy, organic flow
  const ribbons = [
    {
      x: 20,
      width: 350,
      colors: ['rgba(168, 182, 255, 0.9)', 'rgba(197, 168, 255, 0.8)', 'rgba(232, 223, 245, 0.6)', 'transparent'],
      delay: 0,
      curveIntensity: 1.2,
    },
    {
      x: 50,
      width: 400,
      colors: ['rgba(255, 177, 163, 0.9)', 'rgba(255, 214, 201, 0.8)', 'rgba(255, 232, 219, 0.6)', 'transparent'],
      delay: 5,
      curveIntensity: 1.5,
    },
    {
      x: 75,
      width: 320,
      colors: ['rgba(197, 168, 255, 0.9)', 'rgba(168, 182, 255, 0.8)', 'rgba(232, 223, 245, 0.6)', 'transparent'],
      delay: 10,
      curveIntensity: 1.3,
    },
  ];

  useEffect(() => {
    console.log('🌊 AuroraBackgroundLightCurvy rendered with CURVY flow!', {
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
        
        // Create curvy, wavy motion using multiple keyframes
        // Using sin/cos-like curves for organic flow
        const curvePoints = [
          { x: 0, y: 0, rotate: -2 },
          { x: 25, y: 8, rotate: 3 },
          { x: -15, y: 15, rotate: -4 },
          { x: 20, y: 10, rotate: 2 },
          { x: -10, y: 5, rotate: -3 },
          { x: 0, y: 0, rotate: 0 },
        ];
        
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
              filter: 'blur(70px)',
              opacity: 0.8,
              transform: 'translateX(-50%)',
              mixBlendMode: 'screen', // Better for light backgrounds
              borderRadius: '50%', // Makes it more organic/curvy
              transformOrigin: 'center center',
            }}
            animate={shouldReduceMotion ? {} : {
              // Curvy horizontal movement - wavy S-curves
              x: [
                '0px',
                `${40 * ribbon.curveIntensity}px`,
                `${-30 * ribbon.curveIntensity}px`,
                `${35 * ribbon.curveIntensity}px`,
                `${-25 * ribbon.curveIntensity}px`,
                `${20 * ribbon.curveIntensity}px`,
                `${-15 * ribbon.curveIntensity}px`,
                '0px',
              ],
              // Vertical wave motion - undulating up and down
              y: [
                '0px',
                `${15 * ribbon.curveIntensity}px`,
                `${-20 * ribbon.curveIntensity}px`,
                `${18 * ribbon.curveIntensity}px`,
                `${-12 * ribbon.curveIntensity}px`,
                `${10 * ribbon.curveIntensity}px`,
                `${-8 * ribbon.curveIntensity}px`,
                '0px',
              ],
              // Rotation for curvy, flowing effect
              rotate: [
                0,
                5 * ribbon.curveIntensity,
                -6 * ribbon.curveIntensity,
                4 * ribbon.curveIntensity,
                -5 * ribbon.curveIntensity,
                3 * ribbon.curveIntensity,
                -2 * ribbon.curveIntensity,
                0,
              ],
              // Opacity pulsing like breathing
              opacity: [0.7, 0.9, 0.75, 0.85, 0.8, 0.88, 0.72, 0.7],
              // Vertical stretching for wave effect
              scaleY: [1, 1.2, 0.85, 1.15, 0.9, 1.1, 0.95, 1],
              // Horizontal compression/expansion for curvy look
              scaleX: [1, 1.15, 0.9, 1.1, 0.95, 1.05, 0.98, 1],
            }}
            transition={{
              duration: 35 + index * 10,
              ease: [0.25, 0.1, 0.25, 1], // Smooth, organic easing
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

export default AuroraBackgroundLightCurvy;

