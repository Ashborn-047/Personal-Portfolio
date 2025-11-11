import React, { useState, useEffect } from 'react';
import { useTheme } from '../src/contexts/ThemeContext';

const quotes = [
  'The best code is a conversation with your future self.',
  'Simplicity isn\'t the absence of complexity - it\'s the mastery of it.',
  'Every system tells a story, if you listen closely enough.',
  'Design begins where intuition meets constraint.',
  'Curiosity built the first bridge between art and engineering.',
];

const InsightsSection: React.FC = () => {
  const { theme } = useTheme();
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Select a random quote on mount
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <section id="insights" className="py-24 md:py-32 relative section-background">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold mb-12">
          <span className="text-gradient-heading">Field Notes</span>
        </h2>
        <div className="h-24 flex items-center justify-center">
          {quote && (
            <p className={`text-2xl md:text-3xl font-medium italic transition-colors duration-600 ${
              theme === 'light' ? 'text-aurora-text' : 'text-[#EDE8F6]'
            }`}>
              &ldquo;{quote}&rdquo;
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
