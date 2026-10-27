import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    build: {
      outDir: '../cyber-back/cyber_project/static/dist',
      emptyOutDir: true,
      rollupOptions: {
        input: ['./src/main.tsx', 'index.html'],
      },
    },
    plugins: [react()],
    base: '/',
    server: {
      allowedHosts: ["frontend"],
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  }
})

