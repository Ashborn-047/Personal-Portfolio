import React from 'react';

const AuroraBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1, willChange: 'transform' }}
    >
      {/* First radial gradient layer - lavender (#A2B4FF), faster drift */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(at 30% 40%, #A2B4FF, transparent 70%)',
          mixBlendMode: 'screen',
          opacity: 0.4,
          animation: 'auroraDrift 30s ease-in-out infinite alternate',
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      />
      {/* Second radial gradient layer - coral (#FF8A70), slower drift */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(at 70% 60%, #FF8A70, transparent 70%)',
          mixBlendMode: 'screen',
          opacity: 0.4,
          animation: 'auroraDrift 45s ease-in-out infinite alternate-reverse',
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      />
      <style>{`
        @keyframes auroraDrift {
          0% { 
            transform: translateY(0) scale(1) translateZ(0); 
          }
          100% { 
            transform: translateY(-40px) scale(1.05) translateZ(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default AuroraBackground;

