import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html", "lcov"],
    },
    setupFiles: ["./vitest.setup.ts"], // Add a setup file for jest-dom matchers
  },
});
