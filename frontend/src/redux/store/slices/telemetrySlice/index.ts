export {
  default as telemetryReducer,
  updateTelemetry,
  setSelectedVehicle,
  setWebSocketConnected,
} from "./telemetrySlice";
export { selectFilteredVehicles, selectFleetStats } from "./telemetrySelectors";
