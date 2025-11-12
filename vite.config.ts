/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Use root path for Vercel deployments, GitHub Pages path for GitHub deployments
// Vercel sets VERCEL=1 during builds
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_URL;
const base = isVercel ? '/' : '/Personal-Portfolio/';

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 5173,
    open: true, // Automatically open browser
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
