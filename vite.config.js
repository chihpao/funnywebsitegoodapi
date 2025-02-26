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
    port: 3003, // 設定前端開發伺服器端口為 3003
    proxy: {      // 設定 Proxy (代理)
      '/api': {   // 將所有以 '/api' 開頭的請求
        target: 'http://localhost:3002', // 轉發到後端伺服器 (假設後端運行在 http://localhost:3002)
        changeOrigin: true,  // 建議設定為 true，避免跨域問題
      },
    },
  }
});