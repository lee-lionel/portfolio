import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  /* GitHub Pages serves this from lee-lionel.github.io/portfolio/, so a
     build has to prefix every asset with the repo name — with base '/' the
     page loaded and then asked for /assets/... at the domain root, which is
     a 404, and the app never booted. Dev still runs at the root. */
  base: command === 'build' ? '/portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
