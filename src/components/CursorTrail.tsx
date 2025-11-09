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
}

const colors = ['#FF7B5C', '#FF9966', '#FFBBAA'];
const friction = 0.92;
const opacityDecay = 0.94;
const maxParticles = 120;

const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<TrailEmber[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const mouseMoveThrottleRef = useRef(0);
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
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = particle.size * 4;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
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

    const handleMouseMove = (event: MouseEvent) => {
      mouseMoveThrottleRef.current = (mouseMoveThrottleRef.current + 1) % 2;
      if (mouseMoveThrottleRef.current !== 0) return;

      const { clientX, clientY } = event;
      const dx = clientX - lastMousePosRef.current.x;
      const dy = clientY - lastMousePosRef.current.y;
      const speed = Math.hypot(dx, dy);
      const particleCount = speed > 10 ? 2 : 1;

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5;
        const spread = Math.random() * 0.3;

        particlesRef.current.push({
          x: clientX + Math.cos(angle) * spread * 6,
          y: clientY + Math.sin(angle) * spread * 6,
          vx: Math.cos(angle) * (Math.random() * 0.9 + 0.4) + (Math.random() - 0.5) * 0.3,
          vy: Math.sin(angle) * (Math.random() * 0.9 + 0.4) + (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.8 + 1.6,
          opacity: Math.random() * 0.5 + 0.5,
          life: 0,
          maxLife: Math.random() * 450 + 250,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      if (particlesRef.current.length > maxParticles) {
        particlesRef.current.splice(0, particlesRef.current.length - maxParticles);
      }

      lastMousePosRef.current = { x: clientX, y: clientY };
      scheduleAnimation();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', ensureCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[100] pointer-events-none" />;
};

export default CursorTrail;

