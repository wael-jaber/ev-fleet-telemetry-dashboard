import { useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next"; // Add import for useTranslation
import {
  updateTelemetry,
  setWebSocketConnected,
} from "@redux/store/slices/telemetrySlice";
import {
  updateWebSocketStatus,
  incrementWebSocketRetryCount,
  resetWebSocketRetryCount,
} from "@redux/store/slices/configSlice";
import { IWebSocketMessage, TelemetryBulkUpdateMessage } from "@shared/types";
import { WS_URL } from "@consts/index";
import { useNotification } from "@hooks/useNotification";
import { RootState } from "@redux/store";

/**
 * WebSocketHandler Component
 */
export const WebSocketHandler = () => {
  const dispatch = useDispatch();
  const { pushNotification } = useNotification();
  const { t } = useTranslation(); // Initialize useTranslation hook

  // Get WebSocket state from Redux
  const { webSocket } = useSelector((state: RootState) => state.config);
  const { wasConnected, retryCount, maxRetries } = webSocket;

  // Local refs that need to persist between renders
  const initialConnectionAttemptRef = useRef<boolean>(true);
  const hasShownMaxRetriesErrorRef = useRef<boolean>(false);
  const isCurrentlyConnectedRef = useRef<boolean>(false);
  // Track the last known state of WebSocket connection from previous render
  const wasActuallyConnectedRef = useRef<boolean>(false);
  const retryInterval = 3000; // 3 seconds

  const { lastMessage, readyState } = useWebSocket(WS_URL, {
    shouldReconnect: () => {
      // If we've reached max retries, don't reconnect
      if (retryCount > maxRetries) {
        if (!hasShownMaxRetriesErrorRef.current) {
          pushNotification(
            t("Notifications.WebSocket.ConnectionFailed.title"),
            t("Notifications.WebSocket.ConnectionFailed.message"),
            "error",
          );
          hasShownMaxRetriesErrorRef.current = true;
        }
        return false;
      }
      return true;
    },
    reconnectAttempts: maxRetries,
    reconnectInterval: retryInterval,
    onOpen: () => {
      // Reset retry count when connection is successful
      dispatch(resetWebSocketRetryCount());
      hasShownMaxRetriesErrorRef.current = false;
      isCurrentlyConnectedRef.current = true;

      // Only show success notification if this isn't the first connection attempt
      // or if we've had a previous successful connection
      if (!initialConnectionAttemptRef.current || wasConnected) {
        pushNotification(
          t("Notifications.WebSocket.ConnectionSuccessful.title"),
          t("Notifications.WebSocket.ConnectionSuccessful.message"),
          "success",
        );
      }

      // Mark that we're no longer on initial attempt
      initialConnectionAttemptRef.current = false;
    },
    onClose: () => {
      // Check if the connection just dropped from an established state
      const connectionJustDropped = isCurrentlyConnectedRef.current;
      isCurrentlyConnectedRef.current = false;

      // Only increment retry count and show notifications if we're not on initial connection
      if (!initialConnectionAttemptRef.current) {
        dispatch(incrementWebSocketRetryCount());

        // Show error notification if the connection just dropped from an established state
        // CRITICAL FIX: Use only the local ref to determine if connection dropped
        if (connectionJustDropped) {
          pushNotification(
            t("Notifications.WebSocket.ConnectionError.title"),
            t("Notifications.WebSocket.ConnectionError.message"),
            "error",
          );
        }

        // Only show retry notification if we haven't reached max retries
        if (retryCount < maxRetries) {
          pushNotification(
            t("Notifications.WebSocket.ConnectionLost.title"),
            `${t("Notifications.WebSocket.ConnectionLost.message1")} (${retryCount + 1}/${maxRetries}). ` +
              `${t("Notifications.WebSocket.ConnectionLost.message2")}`,
            "warning",
          );
        }
        // Error notification for max retries is handled in shouldReconnect
      } else {
        // First connection attempt failed - mark it as no longer the initial attempt
        initialConnectionAttemptRef.current = false;
      }
    },
    onError: () => {
      // We'll handle the error notification in onClose since that's more reliable
      // for detecting when an established connection drops

      // First connection attempt failed - mark it as no longer the initial attempt
      if (initialConnectionAttemptRef.current) {
        initialConnectionAttemptRef.current = false;
      }
    },
  });

  /**
   * Update WebSocket connection status in Redux
   */
  useEffect(() => {
    const currentIsConnected = readyState === ReadyState.OPEN;

    // Save previous connection state before updating
    wasActuallyConnectedRef.current = isCurrentlyConnectedRef.current;

    // Update our ref immediately to ensure handlers have access to current state
    isCurrentlyConnectedRef.current = currentIsConnected;

    // Update Redux with current connection status
    dispatch(updateWebSocketStatus(currentIsConnected));

    // Also update the telemetry slice state for backward compatibility
    dispatch(setWebSocketConnected(currentIsConnected));

    // Detect a connection drop and show error if needed
    // This handles cases where onClose might not fire immediately
    if (
      wasActuallyConnectedRef.current &&
      !currentIsConnected &&
      !initialConnectionAttemptRef.current
    ) {
      // Connection just dropped
      pushNotification(
        t("Notifications.WebSocket.ConnectionError.title"),
        t("Notifications.WebSocket.ConnectionError.message"),
        "error",
      );
    }
  }, [readyState, dispatch, pushNotification, t]); // Added t to dependency array

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
