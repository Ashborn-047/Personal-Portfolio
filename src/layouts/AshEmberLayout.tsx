import React from 'react';
import Header from '../../components/Header';
import AboutSection from '../../components/Aboutsection';
import PhilosophySection from '../../components/PhilosophySection';
import ProjectsSection from '../../components/ProjectsSection';
import InsightsSection from '../../components/InsightsSection';
import ConnectSection from '../../components/ConnectSection';
import Footer from '../../components/Footer';
import { Hero } from '../sections/Hero';
import EmberBackground from '../components/EmberBackground';
import CursorTrail from '../components/CursorTrail';
import AuroraBackgroundDark from '../components/AuroraBackgroundDark';

interface AshEmberLayoutProps {
  isLoading: boolean;
}

const AshEmberLayout: React.FC<AshEmberLayoutProps> = ({ isLoading }) => {
  return (
    <div className="min-h-screen font-sans leading-relaxed relative">
      {!isLoading && (
        <>
          <AuroraBackgroundDark />
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
        className="relative z-10"
      >
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

export default AshEmberLayout;

