# Personal Portfolio

> A dual-theme portfolio exploring the duality of creation and reflection — where dark mode shows what I built, and light mode shows how I built it.

## 🎨 Philosophy

This portfolio is built on a simple premise: **every project has two stories**. The dark mode tells the story of creation — energy, experimentation, and craftsmanship. The light mode tells the story of reflection — clarity, purpose, and calm.

### Ash & Ember (Dark Mode)
*Where energy meets experimentation*

The dark theme captures the intense process of creation. It's about the fire of building, the embers of iteration, and the shadows where ideas take shape. Every animation, every glow, every transition speaks to the energy of making something new.

**Design Language:**
- Deep contrasts and cinematic warmth
- Energy through motion
- Ember-orange accents against midnight backgrounds
- Glassmorphism with subtle glows

### Aurora Veil | Mist & Dawn (Light Mode)
*Where clarity meets reflection*

The light theme explores what happens after creation — the calm that follows the storm. It's about stillness after motion, balance after contrast. A dialogue between art and engineering, translated through light.

**Design Language:**
- Diffused light and ethereal calm
- Clarity through reflection
- Soft pastel gradients (lavender, coral, periwinkle)
- Translucent glass cards with gentle interactions

## 🛠 Tech Stack

- **Frontend:** React 18.2 · TypeScript 5.0 · Tailwind CSS 3.3
- **Animation:** Framer Motion 10.16 · Custom CSS animations
- **Build Tool:** Vite 4.4
- **AI Integration:** Google Gemini API (for interactive insights)
- **Email Service:** EmailJS (for contact form)
- **Deployment:** GitHub Pages · GitHub Actions

## ✨ Key Features

### Dual Theme System
Seamless theme switching with persistent state management. Each theme is a complete experience, not just a color swap.

### Interactive Elements
- **Cursor Trail:** Ember particles that follow your cursor in dark mode
- **Glassmorphism Cards:** Translucent cards with hover effects and cursor-following gradients
- **Scroll Animations:** Gentle reveals triggered with purpose
- **AI-Powered Insights:** Interactive "Behind the Build" section powered by Gemini API

### Performance & Details
- ~250 KB gzipped
- ~1.5s load time
- 100% TypeScript coverage
- Optimized animations for mobile devices
- Semantic HTML and keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashborn-047/Personal-Portfolio.git
   cd Personal-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/          # Reusable components
│   │   ├── AuroraBackgroundGemini.tsx
│   │   ├── ConnectSection.tsx
│   │   ├── EmberBackground.tsx
│   │   └── ...
│   ├── layouts/            # Theme-specific layouts
│   │   ├── AuroraLayout.tsx
│   │   └── AshEmberLayout.tsx
│   ├── sections/           # Page sections
│   │   ├── aurora/         # Light mode sections
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.tsx
│   └── hooks/              # Custom hooks
├── public/                 # Static assets
├── components/             # Additional components
└── ...
```

## 🎯 Design Decisions

### Typography
Readable yet expressive. Type flows like conversation — direct, confident, human.

### Motion
Motion here isn't decoration — it's communication. Each fade and transition mirrors how thought becomes form.

### Color
- **Dark Mode:** Deep midnight backgrounds with ember-orange and teal accents
- **Light Mode:** Soft pastel gradients from lavender to coral

### Glassmorphism
Subtlety was key. The glass had to feel tactile yet invisible. Layered blurs, calibrated shadows, and color bleed achieved that illusion.

## 🤝 AI Collaboration

This portfolio was built in collaboration with AI tools:
- **Claude** — Architectural structuring and content reasoning
- **Cursor** — Code scaffolding, refactoring, and integration
- **ChatGPT** — Debugging, micro-interaction refinement
- **Gemini** — Visual ideation and interactive insights

*Tools think faster than we do — but meaning still needs a human hand.*

## 📊 Featured Projects

### Webtoon Ecosystem Redesign
A full-scale UX transformation of Webtoon's web platform, focusing on creator visibility, micro-personalization, and behavioral design principles.

### LifeSync — Your Rhythm, Reimagined
A lifestyle synchronization app that transforms how people understand their daily patterns through emotionally intelligent interfaces.

## 🌐 Live Demo

Visit the live portfolio: [Your Portfolio URL]

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Pushan Bhattacharyya**

- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- Email: bhattacharyyapushan@gmail.com

---

**Built with ❤️ for reflection, balance, and the quiet realization that design is never finished — only refined.**
