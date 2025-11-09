import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  color: string;
  flickerSpeed: number;
  flickerOffset: number;
  blurAmount: number;
  depth: number; // 0 = far, 1 = close
  isStar: boolean; // Whether to draw star-like effect
};

const colors = ['#FF7B5C', '#FF9966', '#FFBBAA'];

// Responsive configuration
const getDeviceConfig = () => {
  if (typeof window === 'undefined') {
    return { particleCount: 100, sizeMultiplier: 1, blurMultiplier: 1, velocityMultiplier: 1 };
  }
  
  const width = window.innerWidth;
  
  if (width < 768) {
    // Mobile
    return {
      particleCount: 40,
      sizeMultiplier: 0.7,
      blurMultiplier: 0.7,
      velocityMultiplier: 0.8,
    };
  } else if (width < 1024) {
    // Tablet
    return {
      particleCount: 70,
      sizeMultiplier: 0.85,
      blurMultiplier: 0.85,
      velocityMultiplier: 0.9,
    };
  } else {
    // Desktop
    return {
      particleCount: 100,
      sizeMultiplier: 1,
      blurMultiplier: 1,
      velocityMultiplier: 1,
    };
  }
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const lineControls = useAnimation();
  const bgControls = useAnimation();
  const containerControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const emberCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const embersRef = useRef<Ember[]>([]);
  const devicePixelRatioRef = useRef(
    typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  );
  const deviceConfigRef = useRef(getDeviceConfig());

  const ensureCanvasSize = () => {
    const canvas = emberCanvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const { innerWidth, innerHeight, devicePixelRatio = 1 } = window;
    devicePixelRatioRef.current = devicePixelRatio;
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    
    // Update device config on resize
    deviceConfigRef.current = getDeviceConfig();
  };

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, color: string) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(0.3, size * 0.2);
    
    // Draw 4-pointed star (cross shape) - same as cursor trail
    const radius = size;
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.lineTo(x, y + radius);
    ctx.moveTo(x - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.stroke();
    
    // Draw central glow
    ctx.beginPath();
    ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const drawEmbers = (timestamp: number) => {
    const canvas = emberCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = devicePixelRatioRef.current;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    embersRef.current.forEach((ember) => {
      let newX = ember.x + ember.vx;
      let newY = ember.y + ember.vy;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (newX < 0) newX = width;
      if (newX > width) newX = 0;
      if (newY < 0) newY = height;
      if (newY > height) newY = 0;

      ember.x = newX;
      ember.y = newY;
      ember.vx *= 0.99;
      ember.vy *= 0.99;

      const flicker = Math.sin(timestamp * ember.flickerSpeed + ember.flickerOffset) * 0.2;
      const opacity = Math.max(0.2, Math.min(0.9, ember.baseOpacity + flicker));

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = ember.color;
      ctx.shadowColor = ember.color;
      
      // Apply blur effect - same as cursor trail
      const blurRadius = ember.blurAmount > 0 
        ? ember.blurAmount + ember.size * 2 
        : ember.size * 2;
      ctx.shadowBlur = blurRadius;
      
      if (ember.isStar) {
        // Draw blurred star effect - same as cursor trail
        drawStar(ctx, ember.x, ember.y, ember.size, opacity, ember.color);
      } else {
        // Draw regular glowing circle
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });

    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  const animateEmbers = (timestamp: number) => {
    drawEmbers(timestamp);
    animationFrameRef.current = requestAnimationFrame(animateEmbers);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const config = deviceConfigRef.current;
    
    embersRef.current = Array.from({ length: config.particleCount }, () => {
      const depth = Math.random(); // 0 = far, 1 = close
      const isBlurred = Math.random() < 0.45; // 45% chance of being blurred
      const isStar = Math.random() < 0.55; // 55% chance of star (more than 50%) - same as cursor trail
      
      // Size similar to cursor trail: 0.6-1.8 range, adjusted for device
      const size = (Math.random() * 1.2 + 0.6) * config.sizeMultiplier;
      
      // Blur amount - same as cursor trail, adjusted for device
      const blurAmount = isBlurred ? (Math.random() * 4 + 2) * config.blurMultiplier : 0;
      
      // Opacity
      const baseOpacity = Math.random() * 0.5 + 0.5;
      
      // Color - same palette as cursor trail
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2 * config.velocityMultiplier,
        vy: (Math.random() - 0.5) * 0.2 * config.velocityMultiplier,
        size,
        baseOpacity,
        color,
        flickerSpeed: Math.random() * 0.012 + 0.005,
        flickerOffset: Math.random() * Math.PI * 2,
        blurAmount,
        depth,
        isStar,
      };
    });

    ensureCanvasSize();
    window.addEventListener('resize', ensureCanvasSize);
    animationFrameRef.current = requestAnimationFrame(animateEmbers);

    return () => {
      window.removeEventListener('resize', ensureCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';

    const timeline = async () => {
      await lineControls.start({
        opacity: 1,
        width: '2px',
        transition: { duration: 0.6, ease: 'easeOut' },
      });

      await lineControls.start({
        scale: [1, 1.02, 1],
        transition: {
          duration: 1,
          ease: 'easeInOut',
        },
      });

      await Promise.all([
        lineControls.start({
          width: '100vw',
          transition: {
            duration: 2.5,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }),
        bgControls.start({
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 2.5,
            ease: 'easeOut',
            delay: 0.3,
          },
        }),
      ]);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await containerControls.start({
        opacity: 0,
        transition: {
          duration: 1.1,
          ease: [0.4, 0, 0.2, 1],
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      onComplete();
    };

    timeline();

    return () => {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
    };
  }, [lineControls, bgControls, containerControls, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none"
        initial={{ opacity: 1 }}
        animate={containerControls}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.3, y: 40, filter: 'blur(4px)' }}
          animate={bgControls}
          style={{
            backgroundImage: `url(${(import.meta as any).env?.BASE_URL || '/Personal-Portfolio/'}loading-bg.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <canvas
          ref={emberCanvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-full relative"
            initial={{ opacity: 0, width: '2px' }}
            animate={lineControls}
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(69, 231, 226, 0.15) 20%, rgba(160, 118, 249, 0.15) 50%, rgba(255, 95, 60, 0.15) 80%, transparent 100%)',
              boxShadow: `
                0 0 20px rgba(69, 231, 226, 0.15),
                0 0 40px rgba(160, 118, 249, 0.1),
                0 0 60px rgba(255, 95, 60, 0.08),
                0 0 80px rgba(160, 118, 249, 0.05)
              `,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(69, 231, 226, 0.1) 20%, rgba(160, 118, 249, 0.1) 50%, rgba(255, 95, 60, 0.1) 80%, transparent 100%)',
                filter: 'blur(30px)',
                transform: 'scaleX(3)',
                opacity: 0.3,
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
