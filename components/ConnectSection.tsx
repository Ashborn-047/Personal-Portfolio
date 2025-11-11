import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../motionVariants';
import { useEmberCursor } from '../src/hooks/useEmberCursor';
import { useTheme } from '../src/contexts/ThemeContext';
import emailjs from '@emailjs/browser';

const ConnectSection: React.FC = () => {
  const { theme } = useTheme();
  const cardRef = useEmberCursor();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Debug: Check environment variables on component mount
  useEffect(() => {
    console.log('All env vars:', {
      gemini: (import.meta as any).env?.VITE_GEMINI_API_KEY ? '✓' : '✗',
      serviceId: (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID ? '✓' : '✗',
      templateId: (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID ? '✓' : '✗',
      publicKey: (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY ? '✓' : '✗',
    });
    console.log('Raw env object:', (import.meta as any).env);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // EmailJS configuration - these should be set in your .env file
    const serviceId = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID || '';
    const templateId = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID || '';
    const publicKey = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY || '';

    // Debug: Log configuration (remove in production)
    console.log('EmailJS Config:', { 
      serviceId: serviceId ? `✓ (${serviceId.substring(0, 10)}...)` : '✗', 
      templateId: templateId ? `✓ (${templateId.substring(0, 10)}...)` : '✗', 
      publicKey: publicKey ? `✓ (${publicKey.substring(0, 5)}...)` : '✗' 
    });

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration missing. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file and restart the dev server.');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error: any) {
      console.error('Email sending failed:', error);
      console.error('Error details:', {
        status: error?.status,
        text: error?.text,
        message: error?.message
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="connect" className="py-24 md:py-32 text-center relative section-background">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-4 relative"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,123,92,0.1),transparent_70%)] blur-2xl opacity-50 -z-10"></span>
          <span className="text-gradient-heading relative z-10">Let's Connect</span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className={`text-lg mb-12 transition-colors duration-600 ${
            theme === 'light' ? 'text-aurora-text/80' : 'text-[#B8AEE6]'
          }`}
        >
          I'm always open to collaborating on thoughtful projects or new ideas. Whether you're building something ambitious or exploring the intersection of design and technology — let's connect.
        </motion.p>

        <motion.div
          ref={cardRef}
          variants={fadeInUp}
          className={`rounded-2xl p-6 sm:p-10 my-6 sm:my-12 transition-all duration-600 ${
            theme === 'light' 
              ? 'bg-glass-bg-light backdrop-blur-md border border-glass-border-light shadow-light-diffusion'
              : 'glow-card'
          }`}
          style={theme === 'light' ? {
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          } : {}}
        >
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Your Name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full border p-3 rounded-lg focus:ring-transparent focus:outline-none transition-all duration-300 ease ${
                  theme === 'light'
                    ? 'bg-white/40 backdrop-blur-sm border-white/30 text-aurora-text placeholder-aurora-text/50 focus:shadow-[0_0_20px_rgba(255,168,124,0.25)] focus:border-aurora-coral/50'
                    : 'bg-[rgba(40,30,60,0.2)] border-[rgba(255,255,255,0.08)] text-[#EDE8F6] placeholder-[#B8AEE6]/50 focus:shadow-[0_0_20px_rgba(255,123,92,0.25)] focus:border-[rgba(255,123,92,0.3)]'
                }`}
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full border p-3 rounded-lg focus:ring-transparent focus:outline-none transition-all duration-300 ease ${
                  theme === 'light'
                    ? 'bg-white/40 backdrop-blur-sm border-white/30 text-aurora-text placeholder-aurora-text/50 focus:shadow-[0_0_20px_rgba(255,168,124,0.25)] focus:border-aurora-coral/50'
                    : 'bg-[rgba(40,30,60,0.2)] border-[rgba(255,255,255,0.08)] text-[#EDE8F6] placeholder-[#B8AEE6]/50 focus:shadow-[0_0_20px_rgba(255,123,92,0.25)] focus:border-[rgba(255,123,92,0.3)]'
                }`}
              />
            </div>
            <textarea 
              placeholder="Your Message" 
              required 
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full border p-3 rounded-lg focus:ring-transparent focus:outline-none transition-all duration-300 ease ${
                theme === 'light'
                  ? 'bg-white/40 backdrop-blur-sm border-white/30 text-aurora-text placeholder-aurora-text/50 focus:shadow-[0_0_20px_rgba(255,168,124,0.25)] focus:border-aurora-coral/50'
                  : 'bg-[rgba(40,30,60,0.2)] border-[rgba(255,255,255,0.08)] text-[#EDE8F6] placeholder-[#B8AEE6]/50 focus:shadow-[0_0_20px_rgba(255,123,92,0.25)] focus:border-[rgba(255,123,92,0.3)]'
              }`}
            ></textarea>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg text-sm ${
                  theme === 'light'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-green-900/30 text-green-400 border border-green-700'
                }`}
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg text-sm ${
                  theme === 'light'
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-red-900/30 text-red-400 border border-red-700'
                }`}
              >
                Failed to send message. Please check your EmailJS configuration or try again later.
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative inline-block text-lg font-semibold px-4 py-2 rounded-xl overflow-hidden transition-all duration-300 ease hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                theme === 'light'
                  ? 'text-white bg-gradient-to-r from-aurora-coral to-aurora-lavender hover:shadow-[0_0_40px_rgba(255,168,124,0.3)]'
                  : 'text-white bg-gradient-to-r from-[#FF7B5C] to-[#E86FFF] ember-glow hover:shadow-[0_0_40px_rgba(255,123,92,0.3)]'
              }`}
            >
              <span className={`absolute inset-0 rounded-xl transition-all duration-300 ease group-hover:opacity-90 blur-md ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-aurora-coral to-aurora-lavender'
                  : 'bg-gradient-to-r from-[#FF7B5C] to-[#E86FFF]'
              }`}></span>
              <span className="relative rounded-xl bg-transparent px-4 py-2 transition-all duration-300 ease">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ConnectSection;