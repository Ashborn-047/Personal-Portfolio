import React, { useEffect } from 'react';
import './AuroraBackgroundGemini.css';

const AuroraBackgroundGemini: React.FC = () => {
  useEffect(() => {
    // Set CSS variable for background image with base URL
    const baseUrl = import.meta.env.BASE_URL || '/Personal-Portfolio/';
    document.documentElement.style.setProperty('--aurora-bg-url', `url(${baseUrl}aurora-bg4.jpg)`);
  }, []);

  return (
    <div className="aurora-container">
      <div className="aurora-background-image"></div>
    </div>
  );
};

export default AuroraBackgroundGemini;
