import { Server as HttpServer } from "http";
import { WebSocketServer, WebSocket, RawData } from "ws";
import { Buffer } from "buffer";
import { IWebSocketMessage, EchoMessage } from "@shared/types";

/**
 * WebSocketManager encapsulates all WebSocket logic.
 * It uses a singleton pattern for production, while exposing a factory method for test isolation.
 */
export class WebSocketManager {
  private static instance: WebSocketManager | null = null;
  private wss: WebSocketServer;

  // Private constructor enforces use of getInstance or createNewInstance.
  private constructor(server: HttpServer) {
    this.wss = new WebSocketServer({ server, path: "/ws" });
    this.registerEvents();
  }

  /**
   * Returns the singleton instance, creating it if it does not exist.
   */
  public static getInstance(server: HttpServer): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager(server);
    }
    return WebSocketManager.instance;
  }

  /**
   * Always creates a new instance (useful for tests to ensure isolation).
   */
  public static createNewInstance(server: HttpServer): WebSocketManager {
    return new WebSocketManager(server);
  }

  /**
   * Resets the singleton instance (for testing purposes only).
   */
  public static resetInstance(): void {
    WebSocketManager.instance = null;
  }

  /**
   * Registers event handlers for WebSocket connections.
   */
  private registerEvents(): void {
    this.wss.on("connection", (ws: WebSocket) => {
      console.log("New client connected");

      ws.on("message", (message: RawData) => {
        let text: string;

        // If the message is a Buffer, convert it directly.
        if (Buffer.isBuffer(message)) {
          text = message.toString();
        }
        // If the message is an ArrayBuffer, wrap it with Uint8Array and then convert.
        else if (message instanceof ArrayBuffer) {
          text = Buffer.from(new Uint8Array(message)).toString();
        }
        // If the message is an array of Buffers, concatenate them and convert.
        else if (Array.isArray(message)) {
          text = Buffer.concat(message as Buffer[]).toString();
        }
        // Fallback to string conversion.
        else {
          text = String(message);
        }

        console.log("Received message:", text);

        // Echo the received message back.
        const echoMessage: EchoMessage = {
          type: "echo",
          payload: { data: text },
          timestamp: new Date().toISOString(),
        };
        ws.send(JSON.stringify(echoMessage));
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });
  }

  /**
   * Starts the WebSocket server (primarily for logging purposes).
   */
  public start(): void {
    console.log("WebSocket server started");
  }

  /**
   * Broadcasts a WebSocket message to all connected clients.
   */
  public broadcast(message: IWebSocketMessage): void {
    const data = JSON.stringify(message);
    this.wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
}

/**
 * Helper factory function for test isolation.
 */
export const createWebSocketManager = (
  server: HttpServer,
): WebSocketManager => {
  return WebSocketManager.createNewInstance(server);
};
