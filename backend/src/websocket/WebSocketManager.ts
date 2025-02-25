import { Server as HttpServer } from "http";
import { WebSocketServer, WebSocket, RawData } from "ws";
import { Buffer } from "buffer";
import {
  IWebSocketMessage,
  EchoMessage,
  TelemetryBulkUpdateMessage,
  TelemetryData,
} from "@shared/types";
import { SimulationManager } from "../simulations";

/**
 * WebSocketManager encapsulates all WebSocket logic.
 * It uses a singleton pattern for production, while exposing a factory method for test isolation.
 */
export class WebSocketManager {
  private static instance: WebSocketManager | null = null;
  private wss: WebSocketServer;
  private simulationManager: SimulationManager;

  private constructor(server: HttpServer) {
    this.wss = new WebSocketServer({ server, path: "/ws" });
    this.simulationManager = SimulationManager.getInstance(10);
    this.registerEvents();
    this.startSimulation();
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

        // Handle different message formats
        if (Buffer.isBuffer(message)) {
          text = message.toString();
        } else if (message instanceof ArrayBuffer) {
          text = Buffer.from(new Uint8Array(message)).toString();
        } else if (Array.isArray(message)) {
          text = Buffer.concat(message as Buffer[]).toString();
        } else {
          text = String(message);
        }

        console.log("Received message:", text);

        // Echo the received message back
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
   * Starts the simulation and defines the telemetry broadcasting logic.
   */
  private startSimulation(): void {
    console.log("Starting simulation via SimulationManager...");

    // Define how telemetry data is broadcasted
    this.simulationManager.onGetTelemetry((telemetryData: TelemetryData[]) => {
      this.broadcastTelemetry(telemetryData);
    });

    this.simulationManager.start();
  }

  /**
   * Broadcasts telemetry data to all connected clients.
   */
  private broadcastTelemetry(
    telemetryData: TelemetryBulkUpdateMessage["payload"],
  ): void {
    const message: TelemetryBulkUpdateMessage = {
      type: "telemetryBulkUpdate",
      payload: telemetryData,
      timestamp: new Date().toISOString(),
    };

    this.broadcast(message);
  }

  /**
   * Broadcasts a WebSocket message to all connected clients.
   */
  private broadcast(message: IWebSocketMessage): void {
    const data = JSON.stringify(message);
    this.wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
}
