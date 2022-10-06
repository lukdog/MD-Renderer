import { defineConfig } from 'vite'
import * as path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~arduino-sass': path.resolve(__dirname, 'node_modules/arduino-sass'),
      '~github-md-css': path.resolve(__dirname, 'node_modules/github-markdown-css'),
      '~airmd': path.resolve(__dirname, 'node_modules/markdown-air'),
    }
  },
})
