/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      // --- Cinematic Theme Tokens ---
      colors: {
        // --- DARK MODE: Midnight Orchid × Ash & Ember ---
        'midnight': '#0b0c10',
        'midnight-secondary': '#1a1a2e',
        'orchid': '#b388eb', // Violet accent
        'ember': '#ff6f61',  // Ember-orange accent
        'teal-glow': '#2de2e6',
        'ash': '#a7a9be',
        'text-primary': '#e6e6e6',
        'text-secondary': '#a7a9be',
        'surface': '#12121a',
        // Layered mood backgrounds
        'bg-top': '#0b0b15',      // Start
        'bg-bottom': '#13131f',   // End
        // Ambient glows
        'violet-hint': '#2d1f3d',   // Top-left radial shadow
        'ember-hint': '#36222b',    // Bottom-right radial shadow
        'soft-bright-text': '#e4e0f5',
        // Footer and surfaces
        'footer-bg': '#0e0b1b',
        'footer-text': '#b5b3c7',
        'footer-hover': '#d5c2ff',
        // --- Glass + Button Effects ---
        'glass-bg': 'rgba(40,30,60,0.35)',
        'glass-border': 'rgba(255,255,255,0.08)',
        'glass-shadow': 'rgba(0,0,0,0.25)',
        'focus-glow': 'rgba(164,138,214,0.4)',
        'button-glow': 'rgba(255,111,97,0.4)',
        'button-hover-glow': 'rgba(255,111,97,0.6)',
        'button-gradient-start': '#8a2be2',
        'button-gradient-end': '#ff6f61',
        // Section overlay shade
        'section-fade': 'rgba(19,19,31,0.8)',

        // --- LIGHT MODE: Aurora Veil ---
        'aurora-bg-start': '#f7e7ff', // pastel purple-peach start
        'aurora-bg-mid':   '#fdf6f0', // peach beige mid
        'aurora-bg-end':   '#e8f4ff', // soft teal end
        'aurora-violet':   '#a88bff',
        'aurora-coral':    '#ffb6a3',
        'aurora-mint':     '#95f3e4',
        'aurora-accent':   '#7e57c2', // Light mode accent title
        'aurora-heading':  '#2a2335',
        'aurora-body':     '#3d3751',
        // Glass for light mode
        'glass-bg-light': 'rgba(255,255,255,0.4)',
        'glass-border-light': 'rgba(150,100,200,0.3)',
        // Soft section fade in light mode
        'section-fade-light': 'rgba(255,255,255,0.3)',
      },
      // --- Background Gradients and Glows ---
      backgroundImage: {
        // --- DARK ---
        'hero-gradient-dark': "linear-gradient(to bottom, #0b0b15, #13131f)",
        'hero-layered-dark': "radial-gradient(1200px 700px at 0 0, #2d1f3d22 0%, transparent 70%),radial-gradient(900px 600px at 100% 100%, #36222b22 0%, transparent 70%),linear-gradient(to bottom, #0b0b15 0%, #13131f 100%)",
        'hero-radial-glow-dark': 'radial-gradient(circle at 50% 48%, #b388eb44 0%, transparent 70%)',
        // --- LIGHT ---
        'hero-gradient-light': "linear-gradient(120deg, #f7e7ff 0%, #fdf6f0 60%, #e8f4ff 100%)",
        'hero-radial-glow-light': 'radial-gradient(ellipse at 50% 40%, #a88bff33 0%, transparent 70%)',
        // Section fade separators
        'section-separator-dark': "linear-gradient(to bottom, rgba(19,19,31,0.8), transparent)",
        'section-separator-light': "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'vignette': 'inset 0 0 100px rgba(0,0,0,0.8)',
        'button-glow': '0 0 15px var(--tw-shadow-color)',
        'button-hover-glow': '0 0 15px var(--tw-shadow-color)',
        'focus-glow': '0 0 10px var(--tw-shadow-color)',
      },
      backdropBlur: {
        '20': '20px',
      }
    },
  },
  plugins: [],
};

