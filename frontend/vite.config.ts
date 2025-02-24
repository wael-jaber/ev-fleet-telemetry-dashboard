import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // Point envDir to the root so that .env in the root is picked up
  envDir: path.resolve(__dirname, '../'),
  server: {
    host: '0.0.0.0', // This ensures Vite binds to all network interfaces
    // Use the VITE_FRONTEND_PORT from the root .env
    port: Number(process.env.FRONTEND_PORT) || 3000,
  },
  // @ts-expect-error : they haven't fixed this still
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
