import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../django_projektisi/static/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './src/main.js',
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  
  },
})

