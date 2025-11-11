import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`toggle-btn theme-${theme}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="sun-rays"></div>
      <div className="main-circle"></div>
    </button>
  );
};

