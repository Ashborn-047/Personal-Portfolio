import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './AuroraBackgroundLightTest.css';

interface AuroraRibbon {
  x: number;
  width: number;
  colors: string[];
  speed: number;
  opacity: number;
  delay: number;
}

const AuroraBackgroundLightTest: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // STRONGER, MORE VISIBLE COLORS FOR TESTING
  const ribbons: AuroraRibbon[] = [
    {
      x: 20,
      width: 30,
      colors: [
        'rgba(168, 182, 255, 1)',      // Strong blue
        'rgba(197, 168, 255, 0.9)',     // Strong purple
        'rgba(232, 223, 245, 0.7)',     // Light purple
        'rgba(245, 243, 255, 0.4)'      // Very light
      ],
      speed: 1,
      opacity: 0.9,
      delay: 0,
    },
    {
      x: 50,
      width: 35,
      colors: [
        'rgba(255, 177, 163, 1)',      // Strong coral
        'rgba(255, 214, 201, 0.9)',    // Medium coral
        'rgba(255, 232, 219, 0.7)',    // Light coral
        'rgba(255, 245, 240, 0.4)'     // Very light
      ],
      speed: 0.85,
      opacity: 0.85,
      delay: 5,
    },
    {
      x: 75,
      width: 28,
      colors: [
        'rgba(197, 168, 255, 1)',      // Strong purple
        'rgba(168, 182, 255, 0.9)',    // Strong blue
        'rgba(232, 223, 245, 0.7)',    // Light purple
        'rgba(245, 243, 255, 0.4)'     // Very light
      ],
      speed: 1.1,
      opacity: 0.8,
      delay: 10,
    },
    {
      x: 35,
      width: 25,
      colors: [
        'rgba(255, 214, 201, 0.95)',   // Strong peach
        'rgba(255, 191, 174, 0.85)',   // Medium peach
        'rgba(255, 232, 219, 0.7)',    // Light peach
        'rgba(255, 245, 240, 0.4)'     // Very light
      ],
      speed: 0.95,
      opacity: 0.75,
      delay: 15,
    },
  ];

  // Optional faint white particle layer
  useEffect(() => {
    if (shouldReduceMotion || !particleCanvasRef.current) return;

    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      if (typeof window === 'undefined') return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.1 + 0.05,
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [shouldReduceMotion]);

  // Animation variants for aurora ribbons
  const createRibbonVariants = (ribbon: AuroraRibbon) => ({
    animate: shouldReduceMotion
      ? {}
      : {
          x: [`${ribbon.x - 50}%`, `${ribbon.x - 50 + 4}%`, `${ribbon.x - 50 - 3}%`, `${ribbon.x - 50}%`],
          opacity: [
            ribbon.opacity * 0.8,
            ribbon.opacity,
            ribbon.opacity * 0.9,
            ribbon.opacity * 0.8,
          ],
          scaleY: [1, 1.2, 0.95, 1],
        },
  });

  const createRibbonTransition = (ribbon: AuroraRibbon) => ({
    duration: 20 + ribbon.speed * 10,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
    delay: ribbon.delay,
  });

  // Debug: Log to console
  useEffect(() => {
    console.log('AuroraBackgroundLightTest rendered', {
      ribbonsCount: ribbons.length,
      shouldReduceMotion,
    });
  }, [shouldReduceMotion]);

  return (
    <div className="aurora-light-bg">
      {/* Base gradient background */}
      <div className="aurora-base-gradient" />

      {/* Aurora ribbons - vertical curtains */}
      {ribbons.map((ribbon, index) => {
        const gradient = `linear-gradient(to bottom, ${ribbon.colors.join(', ')})`;
        
        return (
          <motion.div
            key={index}
            className="aurora-ribbon"
            variants={createRibbonVariants(ribbon)}
            animate="animate"
            transition={createRibbonTransition(ribbon)}
            style={{
              left: '50%',
              width: `${ribbon.width}%`,
              background: gradient,
              mixBlendMode: 'normal', // Changed to normal for maximum visibility in test
              opacity: ribbon.opacity,
            }}
          />
        );
      })}

      {/* Optional faint white particle layer */}
      {!shouldReduceMotion && (
        <canvas
          ref={particleCanvasRef}
          className="aurora-particles"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 4,
            opacity: 0.12,
          }}
        />
      )}

      {/* Soft radial vignette for depth */}
      <div className="aurora-vignette" />
    </div>
  );
};

export default AuroraBackgroundLightTest;

