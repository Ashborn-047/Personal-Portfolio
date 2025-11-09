import React, { useEffect, useRef } from 'react';

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

const colors = ['#FF7B5C', '#FF9966', '#FFBBAA'];
const emberCount = 50;

const EmberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const embersRef = useRef<Ember[]>([]);
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

  const drawEmbers = (timestamp: number) => {
    const canvas = canvasRef.current;
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
      ember.vx *= 0.995;
      ember.vy *= 0.995;

      const flicker = Math.sin(timestamp * ember.flickerSpeed + ember.flickerOffset) * 0.2;
      const currentOpacity = Math.max(0.25, Math.min(0.85, ember.baseOpacity + flicker));

      ctx.beginPath();
      ctx.globalAlpha = currentOpacity;
      ctx.fillStyle = ember.color;
      ctx.shadowColor = ember.color;
      ctx.shadowBlur = ember.size * 4;
      ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  const animate = (timestamp: number) => {
    drawEmbers(timestamp);
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    embersRef.current = Array.from({ length: emberCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      size: Math.random() * 4 + 2.5,
      baseOpacity: Math.random() * 0.4 + 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      flickerSpeed: Math.random() * 0.015 + 0.007,
      flickerOffset: Math.random() * Math.PI * 2,
    }));

    ensureCanvasSize();
    window.addEventListener('resize', ensureCanvasSize);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', ensureCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-10 pointer-events-none" />;
};

export default EmberBackground;

