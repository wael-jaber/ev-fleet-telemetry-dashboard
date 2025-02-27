import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
const env = loadEnv("", path.resolve(__dirname, "../"));

// Ensure process.env is populated for local development
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default defineConfig({
  plugins: [react()],

  envDir: path.resolve(__dirname, "../"), // Ensure .env is loaded

  server: {
    host: "0.0.0.0", // Ensures Vite binds to all network interfaces (for Docker)
    port: Number(process.env.FRONTEND_PORT) || 3000,
  },

  define: {
    "import.meta.env.VITE_BACKEND_HOST": JSON.stringify(
      env.VITE_BACKEND_HOST || process.env.VITE_BACKEND_HOST,
    ),
    "import.meta.env.VITE_BACKEND_PORT": JSON.stringify(
      env.VITE_BACKEND_PORT || process.env.VITE_BACKEND_PORT,
    ),
  },

  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@locales": path.resolve(__dirname, "src/locales"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@consts": path.resolve(__dirname, "src/consts"),
      "@components": path.resolve(__dirname, "src/components"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@theme": path.resolve(__dirname, "src/theme"),
      "@storyHelpers": path.resolve(__dirname, "src/storyHelpers"),
      "@websocket": path.resolve(__dirname, "src/websocket"),
      "@api": path.resolve(__dirname, "src/api"),
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },

  // @ts-expect-error : lib error
  test: {
    globals: true,
    environment: "jsdom",
  },
});
