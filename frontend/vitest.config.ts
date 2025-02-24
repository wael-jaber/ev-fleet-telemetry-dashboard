import { defineConfig } from 'vite';
import { vitest } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'], // Add a setup file for jest-dom matchers
  },
});
