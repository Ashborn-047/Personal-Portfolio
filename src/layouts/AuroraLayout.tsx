import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import AuroraBackgroundGemini from '../components/AuroraBackgroundGemini';
import { AuroraHeader } from '../components/AuroraHeader';
import '../components/AuroraBackgroundGemini.css';

interface AuroraLayoutProps {
  isLoading: boolean;
}

const AuroraLayout: React.FC<AuroraLayoutProps> = ({ isLoading }) => {
  const [insightOutput, setInsightOutput] = useState<string>(
    'Select a button above to generate a new insight.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Track card references for mouse tracking
  const cardRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, cardId: string) => {
    const card = cardRefs.current[cardId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Set CSS custom properties for gradient position
    (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
    (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
  };

  const handleMouseLeave = (cardId: string) => {
    const card = cardRefs.current[cardId];
    if (!card) return;
    
    // Reset to center
    (card as HTMLElement).style.setProperty('--mouse-x', '50%');
    (card as HTMLElement).style.setProperty('--mouse-y', '50%');
  };

  const fetchWithBackoff = async (
    url: string,
    options: RequestInit,
    maxRetries: number = 5
  ): Promise<Response> => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    throw new Error('Max retries reached');
  };

  const generateInsight = async (sectionKey: string) => {
    const contentElement = document.getElementById(`${sectionKey}-content`);
    if (!contentElement) {
      setInsightOutput('<span class="text-red-500">Error: Could not find text for analysis.</span>');
      return;
    }

    const userText = contentElement.textContent?.trim() || '';
    if (!userText) {
      setInsightOutput('<span class="text-red-500">Error: Could not find text for analysis.</span>');
      return;
    }

    setIsGenerating(true);
    setInsightOutput(
      '<div class="flex items-center space-x-2 text-gray-600"><svg class="animate-spin h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Generating insight...</span></div>'
    );

    const systemPrompt = `You are a technical reviewer analyzing development processes. Provide a concise, technical insight (max 20 words) about the development approach described.`;

    const userQuery = `Analyze this text: "${userText}"`;

    // Get API key from environment variable (Vite uses import.meta.env)
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
    
    // Debug: Check if API key is loaded (remove in production)
    if (!apiKey) {
      console.warn('VITE_GEMINI_API_KEY not found. Make sure .env file exists and dev server was restarted.');
    }
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    try {
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const response = await fetchWithBackoff(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      // Check for API errors in response
      if (result.error) {
        throw new Error(result.error.message || 'API returned an error');
      }
      
      const generatedText =
        result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No insight generated.';

      setInsightOutput(
        `<p class="text-xl font-medium text-gray-800 italic border-l-4 border-purple-400 pl-4">"${generatedText}"</p>`
      );
    } catch (error: any) {
      console.error('Gemini API call failed:', error);
      const errorMessage = error?.message || 'Unknown error';
      
      // Provide more helpful error messages
      if (errorMessage.includes('API key not configured')) {
        setInsightOutput(
          '<span class="text-red-500">API key not found. Please restart the dev server after adding the key to .env file.</span>'
        );
      } else if (errorMessage.includes('API key') || errorMessage.includes('401') || errorMessage.includes('403')) {
        setInsightOutput(
          '<span class="text-red-500">Invalid API key. Please check your Gemini API key in the .env file.</span>'
        );
      } else {
        setInsightOutput(
          `<span class="text-red-500">API error: ${errorMessage}</span>`
        );
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative" 
      style={{ 
        background: 'linear-gradient(180deg, #F5F3FF 0%, #E8DFF5 50%, #FFE8DB 100%)',
        minHeight: '100vh'
      }}
    >
      {!isLoading && <AuroraBackgroundGemini />}

      <div
        style={{
          opacity: isLoading ? 0 : 1,
          visibility: isLoading ? 'hidden' : 'visible',
          transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out',
          willChange: 'opacity',
        }}
        className="relative z-10"
      >
        <AuroraHeader />

        {/* HERO SECTION */}
        <section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url(/hero-light-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          
          {/* Fade gradient at bottom to blend with page */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(245, 243, 255, 0.3) 30%, rgba(232, 223, 245, 0.6) 60%, rgba(255, 232, 219, 0.9) 90%, rgba(255, 232, 219, 1) 100%)',
            }}
          ></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 text-center px-6 sm:px-8 max-w-5xl mx-auto"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
              style={{
                background: 'linear-gradient(90deg, #6D28D9, #DB2777)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Behind the Build
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 max-w-3xl mx-auto mb-4 drop-shadow-lg">
              A look under the hood — the tools, process, and collaboration that brought this portfolio to life.
            </p>
            <p className="text-base sm:text-lg md:text-xl font-light text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Dark mode shows what I built. Light mode shows how I built it.
            </p>
          </motion.div>
        </section>

        {/* MAIN CONTENT CONTAINER */}
        <main className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-12 md:py-24">
          <div className="space-y-16 md:space-y-24">
            
            {/* 1. TECH STACK */}
            <motion.section 
              ref={(el) => { cardRefs.current['tech-stack'] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="content-card p-6 md:p-10 rounded-3xl shadow-xl"
              onMouseMove={(e) => handleMouseMove(e, 'tech-stack')}
              onMouseLeave={() => handleMouseLeave('tech-stack')}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Tech Stack</h2>
              <div id="tech-stack-content">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  Every decision here serves balance — speed without compromise, aesthetics without excess. Each tool carries its own rhythm, working in quiet harmony.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-3">Frontend</h3>
                    <p className="text-sm text-gray-700">React 18.2 · TypeScript 5.0 · Tailwind CSS 3.3</p>
                  </div>
                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-3">Animation</h3>
                    <p className="text-sm text-gray-700">Framer Motion 10.16 · Custom CSS animations</p>
                  </div>
                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-3">AI Tools</h3>
                    <p className="text-sm text-gray-700">Claude (structuring) · ChatGPT (debugging) · Cursor IDE (implementation)</p>
                  </div>
                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-3">Deployment</h3>
                    <p className="text-sm text-gray-700">Vite 4.4 · GitHub Actions · GitHub Pages</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 italic mt-4">
                  Everything built here runs lean — no framework bloat, no unnecessary render weight.
                </p>
              </div>
            </motion.section>

            {/* 2. DESIGN SYSTEM */}
            <motion.section 
              ref={(el) => { cardRefs.current['design-system'] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="content-card p-6 md:p-10 rounded-3xl shadow-xl"
              onMouseMove={(e) => handleMouseMove(e, 'design-system')}
              onMouseLeave={() => handleMouseLeave('design-system')}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Design System</h2>
              <div id="design-system-content">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
                  The design language bridges two worlds — the cinematic warmth of Ash & Ember and the ethereal calm of Aurora Veil. Every color, corner, and shadow lives within that duality.
                </p>
                
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">Palettes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 bg-white/60 rounded-xl shadow-inner backdrop-blur-sm">
                      <h4 className="font-semibold mb-2 text-gray-800">Ash & Ember</h4>
                      <p className="text-sm text-gray-700">Deep contrasts. Energy through motion.</p>
                    </div>
                    <div className="p-5 bg-white/60 rounded-xl shadow-inner backdrop-blur-sm">
                      <h4 className="font-semibold mb-2 text-gray-800">Aurora Veil</h4>
                      <p className="text-sm text-gray-700">Diffused light. Clarity through reflection.</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">Typography</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Readable yet expressive. Type flows like conversation — direct, confident, human.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">Tokens</h3>
                  <p className="text-sm text-gray-700">
                    Consistency in spacing and rhythm keeps the system honest. Design serves behavior, not decoration.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* 3. AI COLLABORATION */}
            <motion.section 
              ref={(el) => { cardRefs.current['ai-collaboration'] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="content-card p-6 md:p-10 rounded-3xl shadow-xl"
              onMouseMove={(e) => handleMouseMove(e, 'ai-collaboration')}
              onMouseLeave={() => handleMouseLeave('ai-collaboration')}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">AI Collaboration</h2>
              <div id="ai-collaboration-content">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  This portfolio was built in quiet collaboration — not automation. AI served as co-thinker, co-builder, and silent observer in the creative loop.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-white/60 p-4 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-1">Claude</h3>
                    <p className="text-sm text-gray-700">Architectural structuring and content reasoning</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-1">Cursor</h3>
                    <p className="text-sm text-gray-700">Code scaffolding, refactoring, and integration</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-1">ChatGPT</h3>
                    <p className="text-sm text-gray-700">Debugging, micro-interaction refinement, and narrative shaping</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-1">Gemini</h3>
                    <p className="text-sm text-gray-700">Visual ideation and concept sketching</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 italic text-center">
                  Tools think faster than we do — but meaning still needs a human hand.
                </p>
              </div>
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="font-bold text-xl mb-4 text-purple-600">Reflective Insight Generator</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Analyze any section using Gemini to generate a technical insight.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-3 rounded-xl shadow-lg transition duration-150 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => generateInsight('tech-stack')}
                    disabled={isGenerating}
                  >
                    Tech Stack
                  </button>
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-3 rounded-xl shadow-lg transition duration-150 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => generateInsight('design-system')}
                    disabled={isGenerating}
                  >
                    Design System
                  </button>
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-3 rounded-xl shadow-lg transition duration-150 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => generateInsight('ai-collaboration')}
                    disabled={isGenerating}
                  >
                    AI Tools
                  </button>
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-3 rounded-xl shadow-lg transition duration-150 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => generateInsight('build-challenges')}
                    disabled={isGenerating}
                  >
                    Challenges
                  </button>
                </div>
                <div
                  id="insight-output"
                  className="min-h-16 p-4 bg-white/60 rounded-xl shadow-inner flex items-center justify-center text-gray-500 backdrop-blur-sm"
                  dangerouslySetInnerHTML={{ __html: insightOutput }}
                ></div>
              </div>
            </motion.section>

            {/* 4. BUILD CHALLENGES */}
            <motion.section 
              ref={(el) => { cardRefs.current['build-challenges'] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="content-card p-6 md:p-10 rounded-3xl shadow-xl"
              onMouseMove={(e) => handleMouseMove(e, 'build-challenges')}
              onMouseLeave={() => handleMouseLeave('build-challenges')}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Build Challenges</h2>
              <div id="build-challenges-content">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  Each obstacle here was a design conversation — not a problem, but a refinement waiting to happen.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">Theme Switching System</h3>
                    <p className="text-sm text-gray-700">
                      Smooth transitions between light and dark modes demanded persistence and grace. State management solved the logic; timing solved the feeling.
                    </p>
                  </div>

                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">Animation Performance</h3>
                    <p className="text-sm text-gray-700">
                      Optimizing Framer Motion loops for mobile devices turned into an art of restraint. Less fire, more breath.
                    </p>
                  </div>

                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">Glass Morphism Effect</h3>
                    <p className="text-sm text-gray-700">
                      Subtlety was key. The glass had to feel tactile yet invisible. Layered blurs, calibrated shadows, and color bleed achieved that illusion.
                    </p>
                  </div>

                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">GitHub Deployment</h3>
                    <p className="text-sm text-gray-700">
                      Final tweaks around static routing and Actions workflows. Automation with intention.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 5. INTERACTIVE ELEMENTS */}
            <motion.section 
              ref={(el) => { cardRefs.current['interactive-elements'] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="content-card p-6 md:p-10 rounded-3xl shadow-xl"
              onMouseMove={(e) => handleMouseMove(e, 'interactive-elements')}
              onMouseLeave={() => handleMouseLeave('interactive-elements')}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Interactive Elements</h2>
              <div id="interactive-elements-content">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  Motion here isn't decoration — it's communication. Each fade and transition mirrors how thought becomes form.
                </p>
                
                <ul className="space-y-4 mb-6">
                  <li className="bg-white/60 p-4 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-1">Page Transitions</h3>
                    <p className="text-sm text-gray-700">Cross-fades for continuity, not spectacle.</p>
                  </li>
                  <li className="bg-white/60 p-4 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-1">Scroll Animations</h3>
                    <p className="text-sm text-gray-700">Gentle reveals triggered with purpose.</p>
                  </li>
                  <li className="bg-white/60 p-4 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-gray-800 mb-1">Glass Morph Demos</h3>
                    <p className="text-sm text-gray-700">Transparency tested in motion — clarity proven in behavior.</p>
                  </li>
                </ul>
                
                <p className="text-sm text-gray-700 italic text-center">
                  Animation is empathy expressed through pixels.
                </p>
              </div>
            </motion.section>

            {/* 6. PERFORMANCE & DETAILS */}
            <motion.section 
              ref={(el) => { cardRefs.current['performance'] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
              className="content-card p-6 md:p-10 rounded-3xl shadow-xl"
              onMouseMove={(e) => handleMouseMove(e, 'performance')}
              onMouseLeave={() => handleMouseLeave('performance')}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Performance & Details</h2>
              <div id="performance-content">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  Elegance is efficiency made visible. Every kilobyte saved is a design choice; every millisecond shaved, a quiet act of care.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-3 text-gray-800">Optimization</h3>
                    <p className="text-sm text-gray-700">Image compression, lazy loading, and CSS-inlined effects</p>
                  </div>
                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-3 text-gray-800">Accessibility</h3>
                    <p className="text-sm text-gray-700">Semantic HTML, keyboard navigation, and color-aware contrast</p>
                  </div>
                  <div className="bg-white/60 p-5 rounded-xl shadow-inner backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-3 text-gray-800">Build Stats</h3>
                    <p className="text-sm text-gray-700">~250 KB gzipped · ~1.5 s load · 100 % TypeScript coverage</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 italic text-center">
                  Built for longevity, tuned for silence.
                </p>
              </div>
            </motion.section>

          </div>
        </main>

        {/* FOOTER */}
        <footer className="text-center py-12 text-gray-600 text-sm relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Every project leaves a trail of iteration. This one taught stillness — how simplicity, clarity, and patience are just as hard to engineer as spectacle.
          </p>
          <p className="text-xs text-gray-500">
            © 2025. Built with React, TypeScript, Tailwind, and a little AI empathy.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuroraLayout;

