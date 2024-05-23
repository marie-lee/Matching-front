import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  //* 저장시 자동 새로고침 설정
  server: {
    watch: {
      usePolling: true,
    },
  },
});
