import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  color: string;
  flickerSpeed: number;
  flickerOffset: number;
}

interface TrailEmber {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const lineControls = useAnimation();
  const bgControls = useAnimation();
  const containerControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const trailAnimationRef = useRef<number | null>(null);
  const embersRef = useRef<Ember[]>([]);
  const trailEmbersRef = useRef<TrailEmber[]>([]);
  const [embers, setEmbers] = useState<Ember[]>([]);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const mouseMoveThrottleRef = useRef(0);

  const colors = ['#FF7B5C', '#FF9966', '#FFBBAA'];

  // Initialize ember particles
  useEffect(() => {
    const emberCount = 40;
    const initialEmbers: Ember[] = Array.from({ length: emberCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 5 + 3,
      baseOpacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      flickerSpeed: Math.random() * 0.02 + 0.01,
      flickerOffset: Math.random() * Math.PI * 2,
    }));

    embersRef.current = initialEmbers;
    setEmbers(initialEmbers);

    // Animation loop for particles
    const animate = (timestamp: number) => {
      if (!containerRef.current) return;

      embersRef.current.forEach((ember) => {
        let newX = ember.x + ember.vx;
        let newY = ember.y + ember.vy;

        // Boundary wrapping
        if (newX < 0) newX = window.innerWidth;
        if (newX > window.innerWidth) newX = 0;
        if (newY < 0) newY = window.innerHeight;
        if (newY > window.innerHeight) newY = 0;

        ember.x = newX;
        ember.y = newY;
        ember.vx *= 0.99;
        ember.vy *= 0.99;
      });

      // Update DOM elements
      embersRef.current.forEach((ember, index) => {
        const element = containerRef.current?.children[index] as HTMLElement;
        if (element && element.classList.contains('ember-particle')) {
          const flicker = Math.sin(timestamp * ember.flickerSpeed + ember.flickerOffset) * 0.2;
          const currentOpacity = Math.max(0.3, Math.min(0.9, ember.baseOpacity + flicker));

          element.style.left = `${ember.x}px`;
          element.style.top = `${ember.y}px`;
          element.style.opacity = currentOpacity.toString();
          element.style.backgroundColor = ember.color;
          element.style.width = `${ember.size}px`;
          element.style.height = `${ember.size}px`;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle ember creation for performance
      mouseMoveThrottleRef.current++;
      if (mouseMoveThrottleRef.current % 2 !== 0) return; // Create ember every other mouse move

      const currentX = e.clientX;
      const currentY = e.clientY;
      
      // Calculate movement direction for realistic trail
      const dx = currentX - lastMousePosRef.current.x;
      const dy = currentY - lastMousePosRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      // Create 1-2 embers per movement
      const emberCount = speed > 10 ? 2 : 1;
      
      for (let i = 0; i < emberCount; i++) {
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5;
        const spread = Math.random() * 0.3;
        
        const trailEmber: TrailEmber = {
          x: currentX + Math.cos(angle) * spread * 5,
          y: currentY + Math.sin(angle) * spread * 5,
          vx: Math.cos(angle) * (Math.random() * 0.5 + 0.3) + (Math.random() - 0.5) * 0.2,
          vy: Math.sin(angle) * (Math.random() * 0.5 + 0.3) + (Math.random() - 0.5) * 0.2,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.6 + 0.4,
          life: 0,
          maxLife: Math.random() * 400 + 300, // 300-700ms lifespan
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        
        trailEmbersRef.current.push(trailEmber);
      }
      
      lastMousePosRef.current = { x: currentX, y: currentY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop for cursor trail
    const animateTrail = () => {
      if (!trailContainerRef.current) {
        trailAnimationRef.current = requestAnimationFrame(animateTrail);
        return;
      }

      // Update and remove dead embers
      trailEmbersRef.current = trailEmbersRef.current.filter((ember) => {
        ember.life++;
        ember.x += ember.vx;
        ember.y += ember.vy;
        
        // Fade out as life increases
        ember.opacity = Math.max(0, ember.opacity * 0.98);
        
        // Slow down over time
        ember.vx *= 0.98;
        ember.vy *= 0.98;
        
        return ember.life < ember.maxLife && ember.opacity > 0.05;
      });

      // Update DOM
      const container = trailContainerRef.current;
      while (container.children.length < trailEmbersRef.current.length) {
        const div = document.createElement('div');
        div.className = 'absolute rounded-full';
        div.style.transform = 'translate(-50%, -50%)';
        container.appendChild(div);
      }

      // Remove excess DOM elements
      while (container.children.length > trailEmbersRef.current.length) {
        container.removeChild(container.lastChild!);
      }

      // Update each ember's position and style
      trailEmbersRef.current.forEach((ember, index) => {
        const element = container.children[index] as HTMLElement;
        if (element) {
          element.style.left = `${ember.x}px`;
          element.style.top = `${ember.y}px`;
          element.style.opacity = ember.opacity.toString();
          element.style.backgroundColor = ember.color;
          element.style.width = `${ember.size}px`;
          element.style.height = `${ember.size}px`;
          // Increased glow - larger spread and multiple shadow layers for more intensity
          element.style.boxShadow = `0 0 ${ember.size * 4}px ${ember.color}, 0 0 ${ember.size * 8}px ${ember.color}40, 0 0 ${ember.size * 12}px ${ember.color}20`;
          element.style.filter = 'blur(0.5px)';
        }
      });

      trailAnimationRef.current = requestAnimationFrame(animateTrail);
    };

    trailAnimationRef.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (trailAnimationRef.current) {
        cancelAnimationFrame(trailAnimationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Disable scroll and pointer events while loading
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';

    const timeline = async () => {
      // Phase 1: Thin glowing vertical line appears at center (0-0.6s)
      await lineControls.start({
        opacity: 1,
        width: '2px',
        transition: { duration: 0.6, ease: 'easeOut' },
      });

      // Hold line for ~1s with subtle pulsation
      await lineControls.start({
        scale: [1, 1.02, 1],
        transition: {
          duration: 1,
          ease: 'easeInOut',
        },
      });

      // Phase 2: Curtain expands horizontally (1.6-4.1s) - slower and more visible
      await Promise.all([
        lineControls.start({
          width: '100vw',
          transition: {
            duration: 2.5,
            ease: [0.25, 0.1, 0.25, 1], // Smooth "whoosh" easing
          },
        }),
        // Background image fades in and shifts upward simultaneously
        bgControls.start({
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 2.5,
            ease: 'easeOut',
            delay: 0.3, // Start fading in slightly earlier
          },
        }),
      ]);

      // Phase 3: Hold to appreciate the reveal (4.1-4.6s)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Phase 4: Fade out entire loader (4.6-5.7s) - smoother fade with slight delay before callback
      await containerControls.start({
        opacity: 0,
        transition: {
          duration: 1.1,
          ease: [0.4, 0, 0.2, 1], // Smooth ease-in-out curve
        },
      });

      // Small delay to ensure fade completes before showing content
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Re-enable scroll and pointer events
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
        {/* Background wave image with upward motion - visible from start */}
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

        {/* Ember particles overlay */}
        {embers.map((_, index) => (
          <div
            key={index}
            className="ember-particle absolute rounded-full blur-sm"
            style={{
              boxShadow: `0 0 ${Math.random() * 10 + 6}px currentColor`,
              transform: 'translate(-50%, -50%)',
              filter: 'blur(1px)',
            }}
          />
        ))}

        {/* Cursor trail container */}
        <div
          ref={trailContainerRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Expanding curtain line - expands horizontally */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-full relative"
            initial={{ opacity: 0, width: '2px' }}
            animate={lineControls}
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(69, 231, 226, 0.15) 20%, rgba(160, 118, 249, 0.15) 50%, rgba(255, 95, 60, 0.15) 80%, transparent 100%)',
              boxShadow: `
                0 0 20px rgba(69, 231, 226, 0.15),
                0 0 40px rgba(160, 118, 249, 0.1),
                0 0 60px rgba(255, 95, 60, 0.08),
                0 0 80px rgba(160, 118, 249, 0.05)
              `,
            }}
          >
            {/* Outer glow bleed effect - much more subtle */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(69, 231, 226, 0.1) 20%, rgba(160, 118, 249, 0.1) 50%, rgba(255, 95, 60, 0.1) 80%, transparent 100%)',
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
