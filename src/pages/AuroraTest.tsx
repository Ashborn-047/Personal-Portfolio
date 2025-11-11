import React from 'react';
import AuroraBackgroundGemini from '../components/AuroraBackgroundGemini';

const AuroraTest: React.FC = () => {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#f0f0f5' }}>
      <AuroraBackgroundGemini />
      
      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-12 md:py-24">
        {/* HEADER */}
        <header className="text-center mb-16 pt-4">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(90deg, #6D28D9, #DB2777)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Aurora Veil: Mist & Dawn
          </h1>
          <p className="mt-3 text-lg sm:text-xl md:text-2xl font-light text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Where code finds <strong>calm</strong> — exploring how light reveals the invisible threads between design and intent. This theme is not about the effort; it's about the essential moment of reflection.
          </p>
        </header>

        {/* NARRATIVE SECTIONS */}
        <div className="space-y-16 md:space-y-24">
          {/* 1. DESIGN ETHOS */}
          <section className="content-card p-6 md:p-10 rounded-3xl shadow-xl transition duration-300 hover:shadow-purple-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Design Ethos</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              This portfolio began as an experiment in <strong>balance</strong> — between warmth and precision, between human curiosity and engineered flow. We ask: what if utility could feel intentional, and complexity could feel simple? Aurora Veil exists to answer those questions by prioritizing presence over performance.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-gray-100 p-4 rounded-xl text-center">Intentional Utility</div>
              <div className="bg-gray-100 p-4 rounded-xl text-center">Engineered Flow</div>
              <div className="bg-gray-100 p-4 rounded-xl text-center">Human Curiosity</div>
            </div>
          </section>

          {/* 2. VISUAL LANGUAGE */}
          <section className="content-card p-6 md:p-10 rounded-3xl shadow-xl transition duration-300 hover:shadow-blue-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Visual Language</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              If <em>Ash & Ember</em> captured the intense process of creation in shadow, <strong>Aurora Veil</strong> explores its reflection — light diffused through iteration and refinement. The palette is soft, gradient-driven, and designed to guide the eye not with stark contrast, but with gentle, welcoming presence.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-100 rounded-xl">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">Ash & Ember (Shadow)</h3>
                <div className="flex space-x-2 justify-center sm:justify-start">
                  <div className="w-10 h-10 rounded-full shadow-lg" style={{ backgroundColor: '#1a1a1a' }}></div>
                  <div className="w-10 h-10 rounded-full shadow-lg" style={{ backgroundColor: '#ff5e5e' }}></div>
                  <div className="w-10 h-10 rounded-full shadow-lg" style={{ backgroundColor: '#8c8c8c' }}></div>
                </div>
              </div>
              <div className="p-4 bg-gray-100 rounded-xl">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">Aurora Veil (Light)</h3>
                <div className="flex space-x-2 justify-center sm:justify-start">
                  <div className="w-10 h-10 rounded-full shadow-lg" style={{ backgroundColor: '#a0beff' }}></div>
                  <div className="w-10 h-10 rounded-full shadow-lg" style={{ backgroundColor: '#ffc8a0' }}></div>
                  <div className="w-10 h-10 rounded-full shadow-lg" style={{ backgroundColor: '#e0e0e0' }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. BUILDING BLOCKS */}
          <section className="content-card p-6 md:p-10 rounded-3xl shadow-xl transition duration-300 hover:shadow-pink-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Building Blocks</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Behind the subtle shifts lies complete synthesis. Every element — the chosen framework, the micro-motion profiles, the typography, and the color scale—breathes the same calm rhythm. This is a structural necessity where all components flow into one unified, reflective experience.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-100 p-3 rounded-xl text-sm text-center">React/Tailwind</div>
              <div className="bg-gray-100 p-3 rounded-xl text-sm text-center">Custom Hooks</div>
              <div className="bg-gray-100 p-3 rounded-xl text-sm text-center">Inter Typography</div>
              <div className="bg-gray-100 p-3 rounded-xl text-sm text-center">State Management</div>
            </div>
          </section>

          {/* 4. BEHIND THE MOTION */}
          <section className="content-card p-6 md:p-10 rounded-3xl shadow-xl transition duration-300 hover:shadow-orange-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Behind the Motion</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Motion isn't just animation here; it's <strong>emotion slowed down to clarity</strong>. Each transition mirrors a moment of quiet thought—a controlled fade, a purposeful glide. It's the visual language of deep work, designed to eliminate distraction and prioritize focus, ensuring the interaction itself feels intentional.
            </p>
          </section>

          {/* 5. AI COLLABORATION */}
          <section className="content-card p-6 md:p-10 rounded-3xl shadow-xl transition duration-300 hover:shadow-green-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">AI Collaboration</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              This page is a dialogue. <strong>Gemini plans</strong>, refining the architectural structure and philosophical concepts. <strong>Cursor constructs</strong>, managing the complex state and framework integration. And I orchestrate — managing the ultimate intent, creating a continuous loop of reflection, not replacement. The tools assist, but the vision remains purely human.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 p-4 rounded-xl text-center">Gemini: Philosophical Planning</div>
              <div className="bg-gray-100 p-4 rounded-xl text-center">Cursor: Structural Construction</div>
              <div className="bg-gray-100 p-4 rounded-xl text-center">Human: Intent Orchestration</div>
            </div>
          </section>

          {/* 6. REFLECTIONS (CLOSING) */}
          <section className="text-center mt-16 md:mt-24">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Reflections</h2>
            <p className="text-lg text-gray-600 italic max-w-4xl mx-auto leading-relaxed">
              "Aurora Veil isn't simply a 'light mode.' It's the other half of the thought—the essential moment after the creative act when you stop and see what you've truly made. It is the clarity that follows the effort, a persistent stillness in the rush of design."
            </p>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-8 text-gray-500 text-sm relative z-10">
        &copy; 2025 Reflection in Code.
      </footer>
    </div>
  );
};

export default AuroraTest;

