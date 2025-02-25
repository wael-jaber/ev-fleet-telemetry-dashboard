import { ChargeStatus, TelemetryData } from "@shared/types";
import { TelemetryState } from "./telemetrySlice";

const mockTelemetryHistory: TelemetryData[] = [
  {
    vehicleId: "EV-001",
    telemetry: {
      speed: 55,
      batteryLevel: 78,
      temperature: 30,
      tirePressure: 32,
      motorEfficiency: 92,
      regenerativeBraking: false,
      location: { lat: 52.520008, lng: 13.404954 }, // Berlin
      odometer: 12500,
      chargeStatus: ChargeStatus.Discharging,
      energyConsumption: 19.5,
      acceleration: 2.5,
      ambientTemperature: 15,
    },
  },
  {
    vehicleId: "EV-002",
    telemetry: {
      speed: 0, // Charging vehicle
      batteryLevel: 45,
      temperature: 28,
      tirePressure: 30,
      motorEfficiency: 88,
      regenerativeBraking: true,
      location: { lat: 48.856613, lng: 2.352222 }, // Paris
      odometer: 9800,
      chargeStatus: ChargeStatus.Charging,
      energyConsumption: 22.1,
      acceleration: 0,
      ambientTemperature: 20,
    },
  },
  {
    vehicleId: "EV-003",
    telemetry: {
      speed: 70,
      batteryLevel: 52,
      temperature: 34,
      tirePressure: 33,
      motorEfficiency: 95,
      regenerativeBraking: false,
      location: { lat: 40.712776, lng: -74.005974 }, // New York
      odometer: 15200,
      chargeStatus: ChargeStatus.Discharging,
      energyConsumption: 17.8,
      acceleration: 3.2,
      ambientTemperature: 22,
    },
  },
];

export const mockTelemetryState: TelemetryState = {
  vehicles: {
    "EV-001": { history: [mockTelemetryHistory[0]] },
    "EV-002": { history: [mockTelemetryHistory[1]] },
    "EV-003": { history: [mockTelemetryHistory[2]] },
  },
  selectedVehicleId: "all", // Default: All vehicles selected
};
