import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AboutSection from './components/Aboutsection';
import PhilosophySection from './components/PhilosophySection';
import ProjectsSection from './components/ProjectsSection';
import InsightsSection from './components/InsightsSection';
import ConnectSection from './components/ConnectSection';
import Footer from './components/Footer';
import { Hero } from './src/sections/Hero';
import EmberBackground from './src/components/EmberBackground';
import CursorTrail from './src/components/CursorTrail';
import LoadingScreen from './src/components/LoadingScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical assets
    const preloadAssets = async () => {
      const baseUrl = (import.meta as any).env?.BASE_URL || '/Personal-Portfolio/';
      const images = [
        `${baseUrl}hero-bg.png`,
        `${baseUrl}loading-bg.jpg`,
        `${baseUrl}creator-avatar.png`,
      ];

      await Promise.all(
        images.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Continue even if image fails
            img.src = src;
          });
        })
      );
    };

    preloadAssets();
  }, []);

  const handleLoadingComplete = () => {
    // Small delay before showing content for smoother transition
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  return (
    <div className="min-h-screen font-sans leading-relaxed">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div style={{ 
        opacity: isLoading ? 0 : 1, 
        visibility: isLoading ? 'hidden' : 'visible',
        transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out',
        willChange: 'opacity'
      }}>
        <EmberBackground />
        <CursorTrail />
        <Header />
        <Hero />
        <main className="container mx-auto px-6 md:px-12 lg:px-24">
          <AboutSection />
          <ProjectsSection />
          <PhilosophySection />
          <InsightsSection />
          <ConnectSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;