import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Temporarily commented out for local development
  // base: '/Personal-Portfolio/',
  server: {
    port: 5173,
    open: true, // Automatically open browser
  },
})
