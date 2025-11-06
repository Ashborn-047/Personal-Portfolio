import React from 'react';
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

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans leading-relaxed">
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
  );
};

export default App;