import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default defineConfig({
  plugins: [react()],
  // Point envDir to the root so that .env in the root is picked up
  envDir: path.resolve(__dirname, "../"),
  server: {
    host: "0.0.0.0", // This ensures Vite binds to all network interfaces
    // Use the FRONTEND_PORT from the root .env
    port: Number(process.env.FRONTEND_PORT) || 3000,
  },
  resolve: {
    alias: {
      "@redux": path.resolve(__dirname, "src/redux"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@consts": path.resolve(__dirname, "src/consts"),
      "@components": path.resolve(__dirname, "src/components"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@theme": path.resolve(__dirname, "src/theme"),
      "@websocket": path.resolve(__dirname, "src/websocket"),
      "@api": path.resolve(__dirname, "src/api"),
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
  // @ts-expect-error : they haven't fixed this still
  test: {
    globals: true,
    environment: "jsdom",
  },
});
