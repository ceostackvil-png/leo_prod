import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rewrite-leo-images',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/images/leo/')) {
            req.url = req.url.replace('/images/leo/', '/images/nobero/');
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/men(1)': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
});
