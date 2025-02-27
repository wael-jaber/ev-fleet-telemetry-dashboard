import express from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import { WebSocketManager } from "../websocket/WebSocketManager";

// Load environment variables from the correct `.env` file
const envPath =
  process.env.NODE_ENV === "production"
    ? path.resolve("/app/.env") // Use mounted .env in Docker
    : path.resolve(__dirname, "../../..", ".env"); // Use .env in local development

dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.VITE_BACKEND_PORT || 5001;

// Define a simple telemetry endpoint
app.get("/health-check", (req, res) => {
  res.json({ message: "Healthy!", data: [] });
});

export const createServer = (): http.Server => {
  return http.createServer(app);
};

// Start the server using the singleton WebSocketManager
export const startServer = (): void => {
  const server = createServer();
  const wsManager = WebSocketManager.getInstance(server);
  wsManager.start();

  // Bind to '0.0.0.0' so the backend is accessible externally (Docker compatibility)
  server.listen(PORT as number, "0.0.0.0", () => {
    console.log(`Backend server is running on port ${PORT}`);
  });
};
