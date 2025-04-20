import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
      port: 8080,
      proxy: {  // 修正這裡
        '/api/chatbot': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        }
      }
    }
  });