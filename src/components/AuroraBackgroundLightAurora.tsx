import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RibbonFrame {
  center: number;
  topWidth: number;
  bottomWidth: number;
  curve: number;
}

interface AuroraRibbon {
  id: string;
  colors: string[];
  frames: RibbonFrame[];
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
  shadowColor: string;
}

const createRibbonPath = ({ center, topWidth, bottomWidth, curve }: RibbonFrame) => {
  const topLeft = center - topWidth / 2;
  const topRight = center + topWidth / 2;
  const bottomLeft = center - bottomWidth / 2;
  const bottomRight = center + bottomWidth / 2;

  return [
    `M${topLeft} 0`,
    `C ${topLeft - curve} 250, ${bottomLeft - curve} 650, ${bottomLeft} 900`,
    `L ${bottomRight} 900`,
    `C ${bottomRight + curve} 650, ${topRight + curve} 250, ${topRight} 0`,
    'Z',
  ].join(' ');
};

const AuroraBackgroundLightAurora: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const ribbons: AuroraRibbon[] = [
    {
      id: 'ribbon-purple',
      colors: ['rgba(123, 97, 255, 0.95)', 'rgba(168, 182, 255, 0.75)', 'rgba(245, 243, 255, 0.6)'],
      frames: [
        { center: 320, topWidth: 140, bottomWidth: 180, curve: 90 },
        { center: 340, topWidth: 160, bottomWidth: 190, curve: 70 },
        { center: 300, topWidth: 150, bottomWidth: 200, curve: 80 },
        { center: 325, topWidth: 140, bottomWidth: 170, curve: 60 },
      ],
      duration: 36,
      delay: 0,
      blur: 25,
      opacity: 0.85,
      shadowColor: 'rgba(40, 26, 86, 0.55)',
    },
    {
      id: 'ribbon-aqua',
      colors: ['rgba(148, 255, 218, 0.9)', 'rgba(120, 208, 255, 0.75)', 'rgba(168, 182, 255, 0.55)'],
      frames: [
        { center: 520, topWidth: 160, bottomWidth: 210, curve: 110 },
        { center: 500, topWidth: 180, bottomWidth: 230, curve: 90 },
        { center: 540, topWidth: 170, bottomWidth: 220, curve: 100 },
        { center: 510, topWidth: 165, bottomWidth: 215, curve: 85 },
      ],
      duration: 42,
      delay: 4,
      blur: 30,
      opacity: 0.78,
      shadowColor: 'rgba(16, 54, 92, 0.5)',
    },
    {
      id: 'ribbon-warm',
      colors: ['rgba(255, 168, 130, 0.9)', 'rgba(255, 214, 201, 0.75)', 'rgba(255, 232, 219, 0.55)'],
      frames: [
        { center: 720, topWidth: 150, bottomWidth: 200, curve: 95 },
        { center: 740, topWidth: 180, bottomWidth: 220, curve: 80 },
        { center: 700, topWidth: 160, bottomWidth: 210, curve: 85 },
        { center: 730, topWidth: 170, bottomWidth: 215, curve: 75 },
      ],
      duration: 38,
      delay: 8,
      blur: 28,
      opacity: 0.72,
      shadowColor: 'rgba(73, 33, 33, 0.4)',
    },
    {
      id: 'ribbon-lavender',
      colors: ['rgba(197, 168, 255, 0.88)', 'rgba(255, 177, 163, 0.7)', 'rgba(245, 243, 255, 0.55)'],
      frames: [
        { center: 900, topWidth: 180, bottomWidth: 230, curve: 120 },
        { center: 880, topWidth: 200, bottomWidth: 240, curve: 95 },
        { center: 910, topWidth: 185, bottomWidth: 220, curve: 105 },
        { center: 890, topWidth: 190, bottomWidth: 235, curve: 90 },
      ],
      duration: 46,
      delay: 12,
      blur: 26,
      opacity: 0.7,
      shadowColor: 'rgba(50, 28, 73, 0.45)',
    },
  ];

  useEffect(() => {
    console.log('✨ AuroraBackgroundLightAurora mounted', {
      reduceMotion: shouldReduceMotion,
    });
  }, [shouldReduceMotion]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0C1024 0%, #15142D 40%, #241C3F 75%, #2F1D3A 100%)',
      }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1320 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        <defs>
          {ribbons.map((ribbon) => (
            <linearGradient
              key={ribbon.id}
              id={`${ribbon.id}-gradient`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              {ribbon.colors.map((color, index) => (
                <stop
                  key={`${ribbon.id}-color-${color}-${index}`}
                  offset={`${(index / (ribbon.colors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          ))}
        </defs>

        {ribbons.map((ribbon) => {
          const initialPath = createRibbonPath(ribbon.frames[0]);
          const keyframes = ribbon.frames
            .slice(1)
            .map((frame) => createRibbonPath(frame));

          const transition = shouldReduceMotion
            ? undefined
            : {
                duration: ribbon.duration,
                ease: [0.4, 0, 0.6, 1],
                repeat: Infinity,
                repeatType: 'mirror' as const,
                delay: ribbon.delay,
              };

          const animateProps = shouldReduceMotion
            ? {}
            : {
                d: [initialPath, ...keyframes],
                opacity: [
                  ribbon.opacity * 0.75,
                  ribbon.opacity,
                  ribbon.opacity * 0.85,
                  ribbon.opacity,
                ],
              };

          return (
            <>
              <motion.path
                key={`${ribbon.id}-shadow`}
                d={initialPath}
                fill={ribbon.shadowColor}
                style={{
                  filter: 'blur(140px)',
                  opacity: 0.9,
                  mixBlendMode: 'multiply',
                }}
                animate={animateProps}
                transition={transition}
              />
              <motion.path
                key={`${ribbon.id}-highlight`}
                d={initialPath}
                fill={`url(#${ribbon.id}-gradient)`}
                style={{
                  filter: ribbon.blur ? `blur(${ribbon.blur}px)` : undefined,
                  opacity: ribbon.opacity,
                  mixBlendMode: 'screen',
                  stroke: 'rgba(255,255,255,0.35)',
                  strokeWidth: 1.2,
                }}
                animate={animateProps}
                transition={transition}
              />
            </>
          );
        })}
      </motion.svg>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.18) 0%, transparent 55%)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

export default AuroraBackgroundLightAurora;

