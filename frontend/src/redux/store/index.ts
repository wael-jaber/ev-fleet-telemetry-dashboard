import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./slices/configSlice";
import { telemetryReducer } from "./slices/telemetrySlice";

export const store = configureStore({
  reducer: {
    config: configReducer,
    telemetry: telemetryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
