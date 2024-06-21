import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://broker-clone-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  plugins: [react()],
})
