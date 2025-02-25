import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { WebSocket, Data } from "ws";
import http from "http";

// We'll get types from our WebSocketManager module.
import type { WebSocketManager } from "../WebSocketManager";

let server: http.Server;
let port: number;
let wsManager: WebSocketManager;

describe("WebSocketManager", () => {
  beforeEach(async () => {
    // Reset modules to clear module cache and ensure isolation.
    vi.resetModules();

    // Dynamically import the server module and create a fresh HTTP server.
    const serverModule = await import("../../server/server");
    server = serverModule.createServer();
    await new Promise<void>((resolve, reject) => {
      server.listen(0, () => {
        const address = server.address();
        if (address && typeof address === "object") {
          port = address.port;
          resolve();
        } else {
          reject(new Error("Failed to get server address"));
        }
      });
    });

    // Dynamically import the WebSocketManager module.
    const wsModule = await import("../WebSocketManager");
    // Create an isolated instance (factory) so the singleton state is not reused.
    wsManager = wsModule.createWebSocketManager(server);
    wsManager.start();
  });

  afterEach(() => {
    return new Promise<void>((resolve, reject) => {
      server.close((err?: Error) => (err ? reject(err) : resolve()));
    });
  });

  describe("Echo functionality", () => {
    it("should echo a message sent by a client", async () => {
      const ws = new WebSocket(`ws://localhost:${port}/ws`);
      await new Promise<void>((resolve, reject) => {
        ws.on("open", () => {
          ws.send("test message");
        });
        ws.on("message", (data: Data) => {
          try {
            const message = JSON.parse(data.toString());
            expect(message).toHaveProperty("type", "echo");
            expect(message.payload).toHaveProperty("data", "test message");
            ws.close();
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });
    });
  });

  describe("Broadcast functionality", () => {
    it("should broadcast a message to all connected clients", async () => {
      const testMessage = {
        type: "telemetryBulkUpdate",
        payload: [],
        timestamp: new Date().toISOString(),
      };

      await new Promise<void>((resolve, reject) => {
        let receivedCount = 0;
        const client1 = new WebSocket(`ws://localhost:${port}/ws`);
        const client2 = new WebSocket(`ws://localhost:${port}/ws`);

        const onMessage = (data: Data) => {
          try {
            const message = JSON.parse(data.toString());
            expect(message).toEqual(testMessage);
            receivedCount++;
            if (receivedCount === 2) {
              client1.close();
              client2.close();
              resolve();
            }
          } catch (error) {
            reject(error);
          }
        };

        client1.on("open", () => {
          client1.on("message", onMessage);
          // If client2 is already open, trigger broadcast.
          if (client2.readyState === WebSocket.OPEN) {
            wsManager.broadcast(testMessage);
          }
        });

        client2.on("open", () => {
          client2.on("message", onMessage);
          if (client1.readyState === WebSocket.OPEN) {
            wsManager.broadcast(testMessage);
          }
        });
      });
    });
  });
});
