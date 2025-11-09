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
  blurAmount: number;
  depth: number; // 0 = far, 1 = close
  isStar: boolean; // Whether to draw star-like effect
  starPoints: number; // Number of points for star (4 or 8)
}

const colors = ['#FFD700', '#FFA500', '#FFE4B5', '#FFF8DC', '#FFEAA7'];
const emberCount = 120;

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

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, color: string, points: number = 4) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(0.5, size * 0.25);
    
    const outerRadius = size;
    const innerRadius = size * 0.4;
    const angleStep = (Math.PI * 2) / points;
    
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const angle = i * angleStep / 2 - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw central bright glow
    ctx.beginPath();
    ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
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
      const currentOpacity = Math.max(0.2, Math.min(0.9, ember.baseOpacity + flicker));

      ctx.save();
      ctx.globalAlpha = currentOpacity;
      ctx.fillStyle = ember.color;
      ctx.shadowColor = ember.color;
      
      // Apply blur based on depth and blurAmount
      const blurRadius = ember.blurAmount > 0 ? ember.blurAmount * (1 + ember.depth * 0.5) : 0;
      ctx.shadowBlur = blurRadius + ember.size * (2 + ember.depth * 2);
      
      if (ember.isStar) {
        // Draw multi-pointed star effect
        drawStar(ctx, ember.x, ember.y, ember.size, currentOpacity, ember.color, ember.starPoints);
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

  const animate = (timestamp: number) => {
    drawEmbers(timestamp);
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    embersRef.current = Array.from({ length: emberCount }, () => {
      const depth = Math.random(); // 0 = far, 1 = close
      const isBlurred = Math.random() < 0.35; // 35% chance of being blurred
      const isStar = Math.random() < 0.5; // 50% chance of star-like effect
      const starPoints = Math.random() < 0.5 ? 4 : 8; // 4 or 8 pointed stars
      
      // Size varies with depth: far = smaller (0.3-0.8), mid = medium (0.8-1.5), close = larger (1.5-2.2)
      let size: number;
      if (depth < 0.4) {
        // Far particles - smallest
        size = Math.random() * 0.5 + 0.3;
      } else if (depth < 0.7) {
        // Mid-range particles
        size = Math.random() * 0.7 + 0.8;
      } else {
        // Close particles - largest
        size = Math.random() * 0.7 + 1.5;
      }
      
      // Blur amount: far particles more blurred, close particles less blurred
      const blurAmount = isBlurred ? (depth < 0.4 ? Math.random() * 3 + 2 : Math.random() * 2 + 1) : 0;
      
      // Opacity varies with depth
      const baseOpacity = depth < 0.4 ? Math.random() * 0.25 + 0.3 : Math.random() * 0.3 + 0.4;
      
      // Some stars are white/brighter (especially far ones)
      let color: string;
      if (isStar && Math.random() < 0.4) {
        // White/brighter stars
        color = depth < 0.4 ? '#FFFFFF' : Math.random() < 0.5 ? '#FFFFFF' : '#FFF8DC';
      } else {
        color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size,
        baseOpacity,
        color,
        flickerSpeed: Math.random() * 0.012 + 0.005,
        flickerOffset: Math.random() * Math.PI * 2,
        blurAmount,
        depth,
        isStar,
        starPoints,
      };
    });

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

