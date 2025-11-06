import React, { useEffect, useRef, useState } from 'react';

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

const CursorTrail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailEmbersRef = useRef<TrailEmber[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const mouseMoveThrottleRef = useRef(0);

  const colors = ['#FF7B5C', '#FF9966', '#FFBBAA'];

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

    // Animation loop
    const animate = () => {
      if (!containerRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
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
      const container = containerRef.current;
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

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
    />
  );
};

export default CursorTrail;

