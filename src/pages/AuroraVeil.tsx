import React from 'react';
import { AuroraHero } from '../sections/aurora/AuroraHero';
import { DesignEthos } from '../sections/aurora/DesignEthos';
import { VisualLanguage } from '../sections/aurora/VisualLanguage';
import { BuildingBlocks } from '../sections/aurora/BuildingBlocks';
import { BehindTheMotion } from '../sections/aurora/BehindTheMotion';
import { AICollaboration } from '../sections/aurora/AICollaboration';
import { Reflections } from '../sections/aurora/Reflections';
import { AuroraCredits } from '../sections/aurora/AuroraCredits';
import AuroraParticles from '../components/AuroraParticles';
import { AuroraHeader } from '../components/AuroraHeader';

const AuroraVeil: React.FC = () => {
  return (
    <div className="min-h-screen bg-aurora-gradient">
      <AuroraHeader />
      <AuroraParticles />
      <AuroraHero />
      <DesignEthos />
      <VisualLanguage />
      <BuildingBlocks />
      <BehindTheMotion />
      <AICollaboration />
      <Reflections />
      <AuroraCredits />
    </div>
  );
};

export default AuroraVeil;

