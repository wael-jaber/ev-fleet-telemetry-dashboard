export {
  default as telemetryReducer,
  updateTelemetry,
  setSelectedVehicle,
  setWebSocketConnected,
} from "./telemetrySlice";
export {
  selectFilteredVehicles,
  selectFleetStats,
  selectLatestTelemetryArray,
} from "./telemetrySelectors";
