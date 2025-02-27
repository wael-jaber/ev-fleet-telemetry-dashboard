import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string; // Unique identifier for each notification
  title: string;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  open: boolean;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload); // Directly add the full notification object
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload, // Dismiss by id
      );
    },
    closeNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (notification) => notification.id === action.payload, // Find by id
      );
      if (notification) {
        notification.open = false; // Close the notification
      }
    },
  },
});

export const { addNotification, dismissNotification, closeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
