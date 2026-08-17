import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // For a GitHub Pages project site, set this to '/<repo-name>/'.
  // A user site (lionel.github.io) or a custom domain keeps '/'.
  base: '/',
  plugins: [react(), tailwindcss()],
})
