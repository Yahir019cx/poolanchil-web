import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Firebase y sus submódulos — el paquete más pesado (~500KB+)
          if (id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')) {
            return 'firebase-vendor';
          }
          // Framer Motion / motion
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) {
            return 'motion-vendor';
          }
          // Lucide React icons
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide-vendor';
          }
          // Google Maps
          if (id.includes('node_modules/@googlemaps')) {
            return 'maps-vendor';
          }
          // i18n
          if (id.includes('node_modules/react-i18next') || id.includes('node_modules/i18next')) {
            return 'i18n-vendor';
          }
          // React core
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'react-vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-i18next'],
  },
})
