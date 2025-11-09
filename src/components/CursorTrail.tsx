import React, { useEffect, useRef } from 'react';

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
  isStar: boolean;
  blurAmount: number;
}

const colors = ['#FF7B5C', '#FF9966', '#FFBBAA'];
const friction = 0.92;
const opacityDecay = 0.94;

// Responsive configuration
const getDeviceConfig = () => {
  if (typeof window === 'undefined') {
    return { maxParticles: 1800, particleMultiplier: 1, sizeMultiplier: 1, spreadMultiplier: 1, blurMultiplier: 1 };
  }
  
  const width = window.innerWidth;
  
  if (width < 768) {
    // Mobile
    return {
      maxParticles: 300,
      particleMultiplier: 0.3,
      sizeMultiplier: 1, // Same size as desktop for similar visual appearance
      spreadMultiplier: 0.7, // Slightly less spread but still visible
      blurMultiplier: 0.8, // Slightly less blur but still effective
    };
  } else if (width < 1024) {
    // Tablet
    return {
      maxParticles: 800,
      particleMultiplier: 0.6,
      sizeMultiplier: 0.85,
      spreadMultiplier: 0.8,
      blurMultiplier: 0.85,
    };
  } else {
    // Desktop
    return {
      maxParticles: 1800,
      particleMultiplier: 1,
      sizeMultiplier: 1,
      spreadMultiplier: 1,
      blurMultiplier: 1,
    };
  }
};

const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<TrailEmber[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const mouseMoveThrottleRef = useRef(0);
  const devicePixelRatioRef = useRef(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
  const deviceConfigRef = useRef(getDeviceConfig());

  const ensureCanvasSize = () => {
    const canvas = canvasRef.current;
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
    
    // Draw 4-pointed star (cross shape)
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

  const drawParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = devicePixelRatioRef.current;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    particlesRef.current.forEach((particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.shadowColor = particle.color;
      
      // Apply blur effect
      const blurRadius = particle.blurAmount > 0 
        ? particle.blurAmount + particle.size * 2 
        : particle.size * 2;
      ctx.shadowBlur = blurRadius;
      
      if (particle.isStar) {
        // Draw blurred star effect
        drawStar(ctx, particle.x, particle.y, particle.size, particle.opacity, particle.color);
      } else {
        // Draw regular glowing circle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });

    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  const animate = () => {
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.life += 16;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= friction;
      particle.vy *= friction;
      particle.opacity *= opacityDecay;

      return particle.life < particle.maxLife && particle.opacity > 0.08;
    });

    if (particlesRef.current.length) {
      drawParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      animationFrameRef.current = null;
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    ensureCanvasSize();
    window.addEventListener('resize', ensureCanvasSize);

    const scheduleAnimation = () => {
      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const createParticles = (x: number, y: number, dx: number, dy: number) => {
      const speed = Math.hypot(dx, dy);
      const config = deviceConfigRef.current;
      
      // Responsive particle count
      const baseParticleCount = speed > 25 ? 15 : speed > 18 ? 12 : speed > 10 ? 10 : speed > 5 ? 8 : 6;
      const particleCount = Math.max(1, Math.floor(baseParticleCount * config.particleMultiplier));

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.2;
        const spread = Math.random() * 0.7 * config.spreadMultiplier;
        
        const isStar = Math.random() < 0.55; // 55% chance of star (more than 50%)
        const isBlurred = Math.random() < 0.45; // 45% chance of blur

        particlesRef.current.push({
          x: x + Math.cos(angle) * spread * 15 * config.spreadMultiplier,
          y: y + Math.sin(angle) * spread * 15 * config.spreadMultiplier,
          vx: Math.cos(angle) * (Math.random() * 1.5 + 0.6) + (Math.random() - 0.5) * 0.5,
          vy: Math.sin(angle) * (Math.random() * 1.5 + 0.6) + (Math.random() - 0.5) * 0.5,
          size: (Math.random() * 1.2 + 0.6) * config.sizeMultiplier,
          opacity: Math.random() * 0.5 + 0.5,
          life: 0,
          maxLife: Math.random() * 600 + 400,
          color: colors[Math.floor(Math.random() * colors.length)],
          isStar,
          blurAmount: isBlurred ? (Math.random() * 4 + 2) * config.blurMultiplier : 0,
        });
      }

      if (particlesRef.current.length > config.maxParticles) {
        particlesRef.current.splice(0, particlesRef.current.length - config.maxParticles);
      }

      scheduleAnimation();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseMoveThrottleRef.current = (mouseMoveThrottleRef.current + 1) % 2;
      if (mouseMoveThrottleRef.current !== 0) return;

      const { clientX, clientY } = event;
      const dx = clientX - lastMousePosRef.current.x;
      const dy = clientY - lastMousePosRef.current.y;
      
      createParticles(clientX, clientY, dx, dy);
      lastMousePosRef.current = { x: clientX, y: clientY };
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        lastMousePosRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      mouseMoveThrottleRef.current = (mouseMoveThrottleRef.current + 1) % 3;
      if (mouseMoveThrottleRef.current !== 0) return;

      const touch = event.touches[0];
      if (!touch) return;

      const { clientX, clientY } = touch;
      const dx = clientX - lastMousePosRef.current.x;
      const dy = clientY - lastMousePosRef.current.y;
      
      // Only create particles if touch moved significantly
      if (Math.hypot(dx, dy) > 3) {
        createParticles(clientX, clientY, dx, dy);
        lastMousePosRef.current = { x: clientX, y: clientY };
      }
    };

    const handleScroll = () => {
      // Create particles at random positions while scrolling on mobile
      const config = deviceConfigRef.current;
      if (config.particleMultiplier < 0.5) { // Only on mobile/tablet
        const scrollThrottle = Math.floor(Math.random() * 3);
        if (scrollThrottle === 0) {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          const particleCount = Math.floor(2 * config.particleMultiplier);
          
          for (let i = 0; i < particleCount; i++) {
            const isStar = Math.random() < 0.55;
            const isBlurred = Math.random() < 0.45;
            const spread = Math.random() * 20 * config.spreadMultiplier;
            const angle = Math.random() * Math.PI * 2;

            particlesRef.current.push({
              x: x + Math.cos(angle) * spread,
              y: y + Math.sin(angle) * spread,
              vx: (Math.random() - 0.5) * 0.5,
              vy: (Math.random() - 0.5) * 0.5,
              size: (Math.random() * 1.2 + 0.6) * config.sizeMultiplier,
              opacity: Math.random() * 0.4 + 0.3,
              life: 0,
              maxLife: Math.random() * 400 + 300,
              color: colors[Math.floor(Math.random() * colors.length)],
              isStar,
              blurAmount: isBlurred ? (Math.random() * 4 + 2) * config.blurMultiplier : 0,
            });
          }

          if (particlesRef.current.length > config.maxParticles) {
            particlesRef.current.splice(0, particlesRef.current.length - config.maxParticles);
          }
          scheduleAnimation();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', ensureCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[100] pointer-events-none" />;
};

export default CursorTrail;
