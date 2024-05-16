import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@/hooks': '/src/app/hooks',
      '@/modules': '/src/app/modules',
      '@/assets': '/src/app/assets',
    },
  },
})
