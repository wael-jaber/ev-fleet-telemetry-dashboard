import { defineConfig } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

// Load env vars from the root .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const frontendPort = process.env.FRONTEND_PORT || '3000';
const frontendHost = process.env.TEST_HOST || 'localhost';
console.log('Frontend port for E2E tests:', frontendPort);

export default defineConfig({
  testDir: './tests/',
  timeout: 30000,
  use: {
    headless: true,
    // Construct the base URL for tests using the env value
    baseURL: `http://${frontendHost}:${frontendPort}`,
  },
});
