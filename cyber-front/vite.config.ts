import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../cyber-back/cyber_project/static/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: ['./src/main.tsx','index.html'],
    },
  },
  plugins: [react()],
  base: '/',
  server: {
    allowedHosts: ["frontend"],
    proxy: {
      '/api': {
        target: 'http://backend:8080',
        changeOrigin: true,
      },
    },
  },
})

