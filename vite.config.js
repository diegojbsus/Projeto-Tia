import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },

  // Not used in production, only local dev
  server: {
    proxy: {
      '/api': 'http://localhost:5174',
      '/images': 'http://localhost:5174'
    }
  }
})
