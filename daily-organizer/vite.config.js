import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  root: './',
  base: './', // Базовый путь для GitHub Pages
})
