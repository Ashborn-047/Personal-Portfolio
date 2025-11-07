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

const EmberBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const embersRef = useRef<Ember[]>([]);

  const colors = ['#FF7B5C', '#FF9966', '#FFBBAA'];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize embers and create DOM elements
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

    // Create DOM elements for each ember
    initialEmbers.forEach((ember) => {
      const div = document.createElement('div');
      div.className = 'absolute rounded-full blur-sm';
      div.style.transform = 'translate(-50%, -50%)';
      div.style.filter = 'blur(1px)';
      div.style.boxShadow = `0 0 ${Math.random() * 10 + 6}px currentColor`;
      container.appendChild(div);
    });

    // Animation loop
    const animate = (timestamp: number) => {
      if (!containerRef.current) return;

      embersRef.current.forEach((ember) => {
        // Update position
        let newX = ember.x + ember.vx;
        let newY = ember.y + ember.vy;

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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Clean up DOM elements
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      id="ember-bg"
      ref={containerRef}
      className="fixed inset-0 z-10 pointer-events-none"
    />
  );
};

export default EmberBackground;

