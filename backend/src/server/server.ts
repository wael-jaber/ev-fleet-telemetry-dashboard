import express from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import { WebSocketManager } from "../websocket/WebSocketManager";

dotenv.config({ path: path.resolve(__dirname, "../../..", ".env") });

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

// Define a simple telemetry endpoint
app.get("/health-check", (req, res) => {
  res.json({ message: "Healthy!", data: [] });
});

export const createServer = (): http.Server => {
  return http.createServer(app);
};

// startServer uses the singleton pattern for WebSocketManager in production
export const startServer = (): void => {
  const server = createServer();
  const wsManager = WebSocketManager.getInstance(server);
  wsManager.start();

  // Bind to '0.0.0.0' so the backend is accessible externally
  server.listen(PORT as number, "0.0.0.0", () => {
    console.log(`Backend server is running on port ${PORT}`);
  });
};
