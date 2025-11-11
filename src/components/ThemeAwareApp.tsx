import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../../components/Header';
import AboutSection from '../../components/Aboutsection';
import PhilosophySection from '../../components/PhilosophySection';
import ProjectsSection from '../../components/ProjectsSection';
import InsightsSection from '../../components/InsightsSection';
import ConnectSection from '../../components/ConnectSection';
import Footer from '../../components/Footer';
import { Hero } from '../sections/Hero';
import { VisualLanguage } from '../sections/aurora/VisualLanguage';
import EmberBackground from './EmberBackground';
import CursorTrail from './CursorTrail';
import LoadingScreen from './LoadingScreen';

interface ThemeAwareAppProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const ThemeAwareApp: React.FC<ThemeAwareAppProps> = ({ isLoading, onLoadingComplete }) => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen font-sans leading-relaxed">
      {isLoading && <LoadingScreen onComplete={onLoadingComplete} />}
      {!isLoading && theme === 'dark' && (
        <>
          <EmberBackground />
          <CursorTrail />
        </>
      )}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          visibility: isLoading ? 'hidden' : 'visible',
          transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out',
          willChange: 'opacity',
        }}
      >
        <Header />
        <Hero />
        <main className="container mx-auto px-6 md:px-12 lg:px-24">
          <AboutSection />
          {theme === 'light' && <VisualLanguage />}
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

export default ThemeAwareApp;

