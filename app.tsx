import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import LoadingScreen from './src/components/LoadingScreen';
import AshEmberLayout from './src/layouts/AshEmberLayout';
import AuroraLayout from './src/layouts/AuroraLayout';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
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

  // Scroll to top when theme changes
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [theme, isLoading]);

  const handleLoadingComplete = () => {
    // Small delay before showing content for smoother transition
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  // Test pages removed - content integrated into AuroraLayout

  return (
    <div className="min-h-screen font-sans leading-relaxed">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {theme === 'light' ? (
            <AuroraLayout isLoading={isLoading} />
          ) : (
            <AshEmberLayout isLoading={isLoading} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;