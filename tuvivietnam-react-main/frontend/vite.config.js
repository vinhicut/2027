import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Thư mục build đầu ra theo yêu cầu release chính thức: 'release website 2409'
    outDir: '../releases/dist',
    // Vô hiệu hóa source maps trên production để tránh lộ cấu trúc và mã nguồn gốc
    sourcemap: false,
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
