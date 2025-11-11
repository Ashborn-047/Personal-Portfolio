import React, { useEffect, useRef } from 'react';

interface Particle {
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

// Light motes - soft, ethereal colors
const colors = ['#FFFFFF', '#FFF8DC', '#FFE5E5', '#F5ECFF', '#FFE8E2', '#FFF0F5'];
const maxParticles = 30; // Reduced for better performance

const AuroraParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const devicePixelRatioRef = useRef(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

  const ensureCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const { innerWidth, innerHeight, devicePixelRatio = 1 } = window;
    devicePixelRatioRef.current = devicePixelRatio;
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
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
      ctx.beginPath();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      // Reduced shadow blur for better performance
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = particle.size * 1.5; // Reduced from 3x to 1.5x
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  const animate = () => {
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.life += 8;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.opacity *= 0.995;

      return particle.life < particle.maxLife && particle.opacity > 0.05;
    });

    if (particlesRef.current.length) {
      drawParticles();
      // Throttle animation for better performance
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      animationFrameRef.current = null;
    }
  };

  const spawnParticle = () => {
    if (particlesRef.current.length >= maxParticles) return;

    // Light motes - smaller, slower, more ethereal
    particlesRef.current.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.15, // Slower movement
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 1.2 + 0.3, // Smaller particles
      opacity: Math.random() * 0.3 + 0.2, // More subtle
      life: 0,
      maxLife: Math.random() * 3000 + 2000, // Longer life
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    ensureCanvasSize();
    window.addEventListener('resize', ensureCanvasSize);

    // Initial light motes - reduced count
    for (let i = 0; i < 15; i++) {
      spawnParticle();
    }

    // Spawn new light motes occasionally (less frequent)
    const spawnInterval = setInterval(() => {
      if (particlesRef.current.length < maxParticles && Math.random() < 0.15) {
        spawnParticle();
      }
    }, 4000); // Increased interval from 3000 to 4000ms

    return () => {
      window.removeEventListener('resize', ensureCanvasSize);
      clearInterval(spawnInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default AuroraParticles;

