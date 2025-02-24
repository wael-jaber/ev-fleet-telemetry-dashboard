// backend/src/index.test.ts
import request from "supertest";
import express from "express";
import { describe, it, expect } from "vitest";

const app = express();
app.get("/api/telemetry", (_req, res) => {
  res.json({ message: "Hello from the backend!", data: [] });
});

describe("GET /api/telemetry", () => {
  it("should return telemetry data", async () => {
    const res = await request(app).get("/api/telemetry");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Hello from the backend!");
  });
});
