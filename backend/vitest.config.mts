import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html", "lcov"],
    },
    exclude: ["**/types/**", "**/node_modules/**"],
  },
});
