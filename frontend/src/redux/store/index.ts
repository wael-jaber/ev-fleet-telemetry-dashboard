import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./slices/configSlice";
import notificationSlice from "./slices/notificationSlice";
import { telemetryReducer } from "./slices/telemetrySlice";

export const store = configureStore({
  reducer: {
    config: configReducer,
    telemetry: telemetryReducer,
    notification: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
