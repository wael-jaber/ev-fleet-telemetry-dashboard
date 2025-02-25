import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import request from "supertest";
import http from "http";

let server: http.Server;
let port: number;

describe("HTTP Server (Dynamic Imports & Isolation)", () => {
  beforeEach(async () => {
    vi.resetModules();
    // Dynamically import the server module.
    const serverModule = await import("../server");
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
  });

  afterEach(() => {
    return new Promise<void>((resolve, reject) => {
      server.close((err?: Error) => (err ? reject(err) : resolve()));
    });
  });

  describe("GET /api/telemetry", () => {
    it("should return telemetry message", async () => {
      const res = await request(server).get("/health-check");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("Healthy!");
    });
  });
});
