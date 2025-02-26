import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useDispatch } from "react-redux";
import {
  updateTelemetry,
  setWebSocketConnected,
} from "@redux/store/slices/telemetrySlice";
import { IWebSocketMessage, TelemetryBulkUpdateMessage } from "@shared/types";
import { WS_URL } from "@consts/index";

/**
 * WebSocketHandler Component
 */
export const WebSocketHandler = () => {
  const dispatch = useDispatch();

  const { lastMessage, readyState } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: Infinity,
    reconnectInterval: 5000,
  });

  /**
   * Update WebSocket connection status in Redux
   */
  useEffect(() => {
    const isConnected = readyState === 1; // 1 = WebSocket.OPEN
    dispatch(setWebSocketConnected(isConnected));
  }, [readyState, dispatch]);

  /**
   * Fetch initial telemetry data when WebSocket connects.
   */
  useEffect(() => {
    //if (readyState === 1) {
    //  (async () => {
    //    const initialTelemetry = await fetchTelemetryData();
    //    dispatch(updateTelemetry(initialTelemetry));
    //  })();
    //}
  }, [readyState, dispatch]);

  /**
   * Process incoming WebSocket messages.
   */
  useEffect(() => {
    if (lastMessage?.data) {
      try {
        const message: IWebSocketMessage = JSON.parse(lastMessage.data);

        if (message.type === "telemetryBulkUpdate") {
          // Sort telemetry by `timeStamp` before dispatching
          const sortedTelemetry = (
            message as TelemetryBulkUpdateMessage
          ).payload.sort(
            (a, b) =>
              new Date(a.telemetry.timeStamp).getTime() -
              new Date(b.telemetry.timeStamp).getTime(),
          );

          dispatch(updateTelemetry(sortedTelemetry));
        }
      } catch (error) {
        console.error("WebSocket Error:", error);
      }
    }
  }, [lastMessage, dispatch]);

  return null;
};
