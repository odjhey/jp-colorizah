import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/translate': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/segmentize': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

  plugins: [react()],
})
