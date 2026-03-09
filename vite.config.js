import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/brightcodecreative/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['mac-mini-1.tail61417e.ts.net', 'localhost'],
  },
})
