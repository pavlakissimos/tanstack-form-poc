/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    name: "jsdom",
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true
  }
})
