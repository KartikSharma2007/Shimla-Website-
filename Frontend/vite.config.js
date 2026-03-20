import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base was '/Shimla-Website-/' for GitHub Pages — causes blank page on Netlify
  // Netlify deploys to the root '/' so base must be '/'
  base: '/',
  server: {
    host: true,   // exposes on 0.0.0.0 — reachable from any device on the same Wi-Fi
    port: 5173,
  },
})
