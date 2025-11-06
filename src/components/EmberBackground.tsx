import React, { useEffect, useRef, useState } from 'react';

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

const EmberBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const embersRef = useRef<Ember[]>([]);
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [embers, setEmbers] = useState<Ember[]>([]);

  const colors = ['#FF7B5C', '#FF9966', '#FFBBAA'];

  useEffect(() => {
    // Initialize embers
    const emberCount = 50;
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

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = (timestamp: number) => {
      if (!containerRef.current) return;

      embersRef.current.forEach((ember) => {
        // Update position
        let newX = ember.x + ember.vx;
        let newY = ember.y + ember.vy;

        // Cursor attraction (subtle)
        const dx = mousePos.x - ember.x;
        const dy = mousePos.y - ember.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200 && distance > 0) {
          const attraction = (200 - distance) / 200 * 0.02;
          ember.vx += (dx / distance) * attraction;
          ember.vy += (dy / distance) * attraction;
        }

        // Boundary wrapping
        if (newX < 0) newX = window.innerWidth;
        if (newX > window.innerWidth) newX = 0;
        if (newY < 0) newY = window.innerHeight;
        if (newY > window.innerHeight) newY = 0;

        // Update ember position
        ember.x = newX;
        ember.y = newY;

        // Dampen velocity
        ember.vx *= 0.99;
        ember.vy *= 0.99;
      });

      // Update DOM elements
      embersRef.current.forEach((ember, index) => {
        const element = containerRef.current?.children[index] as HTMLElement;
        if (element) {
          // Flicker opacity
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
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos]);

  return (
    <div
      id="ember-bg"
      ref={containerRef}
      className="fixed inset-0 z-10 pointer-events-none"
    >
      {embers.map((_, index) => (
        <div
          key={index}
          className="absolute rounded-full blur-sm"
          style={{
            boxShadow: `0 0 ${Math.random() * 10 + 6}px currentColor`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

export default EmberBackground;

