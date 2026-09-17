import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
    proxy: {
      // В dev-режиме Vite проксирует запросы к API на Express-сервер (3002),
      // поэтому фронтенд всегда ходит по относительному пути /api/...
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true
      }
    }
  }
})
