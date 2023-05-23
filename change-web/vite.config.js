import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'layout-header-height': '50px',
          'layout-header-padding': '0 20px',
          'layout-footer-padding': '20px 0',
          'font-size-base': '13px',
          'border-radius-base': '1px',
        },
        javascriptEnabled: true,
      },
    },
  },
});