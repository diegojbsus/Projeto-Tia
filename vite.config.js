export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      },
      '/images': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      }
    }
  },

  publicDir: "images",   // ✅ tells Vite to copy /images into /dist/images

  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
