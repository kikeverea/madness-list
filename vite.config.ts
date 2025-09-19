import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [ react(), tailwindcss(), svgr() ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/vitest.setup.ts',
    include: [ '**/*.{test,spec}.{js,ts,jsx,tsx}' ],
    exclude: [ ...configDefaults.exclude, 'node_modules', 'dist' ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
})
