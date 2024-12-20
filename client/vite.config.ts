import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 100,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
        // output: {
        //   chunkFileNames: 'JavaScript/[name]-[hash].js',
        //   entryFileNames: 'JavaScript/[name]-[hash].js',
      
        //   assetFileNames: ({name}) => {
        //     if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
        //       return 'images/[name]-[hash].[extname]';
        //     }
      
        //     if (/\.css$/.test(name ?? '')) {
        //       return 'CSS/[name]-[hash][extname]';
        //     }
      
        //     return '[name]-[hash].[extname]';
        //   },
        // },
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/internal': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
