import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
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
