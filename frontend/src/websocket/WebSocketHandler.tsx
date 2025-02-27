import { useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  // Get WebSocket state from Redux
  const { webSocket } = useSelector((state: RootState) => state.config);
  const { wasConnected, retryCount, maxRetries } = webSocket;

  // Local refs that need to persist between renders
  const initialConnectionAttemptRef = useRef<boolean>(true);
  const hasShownMaxRetriesErrorRef = useRef<boolean>(false);
  const isCurrentlyConnectedRef = useRef<boolean>(false);
  const wasActuallyConnectedRef = useRef<boolean>(false);
  const lastActivityTimeRef = useRef<number>(Date.now());
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const networkOnlineRef = useRef<boolean>(navigator.onLine);
  const retryInterval = 3000; // 3 seconds
  const pingInterval = 15000; // 15 seconds

  // Add a ping mechanism to detect stale connections
  const sendPing = (socketInstance: WebSocket | null) => {
    if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
      try {
        socketInstance.send(JSON.stringify({ type: "ping" }));
      } catch (error) {
        console.error("Failed to send ping:", error);
      }
    }
  };

  const { lastMessage, readyState, getWebSocket } = useWebSocket(WS_URL, {
    shouldReconnect: () => {
      // Don't reconnect if we're offline
      if (!networkOnlineRef.current) {
        return false;
      }

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
      lastActivityTimeRef.current = Date.now();

      // Setup ping interval to keep connection alive and detect stale connections
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }

      pingIntervalRef.current = setInterval(() => {
        // dirty casting but it works ... and i have to get to sleep ...
        sendPing(getWebSocket() as WebSocket | null);
      }, pingInterval);

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
      // Stop the ping interval
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
      }

      // Check if the connection just dropped from an established state
      const connectionJustDropped = isCurrentlyConnectedRef.current;
      isCurrentlyConnectedRef.current = false;

      // Only increment retry count and show notifications if we're not on initial connection
      if (!initialConnectionAttemptRef.current) {
        dispatch(incrementWebSocketRetryCount());

        // Show error notification if the connection just dropped from an established state
        if (connectionJustDropped) {
          pushNotification(
            t("Notifications.WebSocket.ConnectionError.title"),
            t("Notifications.WebSocket.ConnectionError.message"),
            "error",
          );
        }

        // Only show retry notification if we haven't reached max retries and we're online
        if (retryCount < maxRetries && networkOnlineRef.current) {
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

  // Handle browser online/offline events
  useEffect(() => {
    const handleOnline = () => {
      networkOnlineRef.current = true;

      // Don't show notification on initial load
      if (!initialConnectionAttemptRef.current) {
        pushNotification(
          "Network Status",
          "Network connection restored. Attempting to reconnect.",
          "info",
        );
      }
    };

    const handleOffline = () => {
      networkOnlineRef.current = false;

      // Don't show notification on initial load
      if (!initialConnectionAttemptRef.current) {
        pushNotification(
          "Network Status",
          "Network connection lost. WebSocket connection will resume when network is available.",
          "warning",
        );
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [pushNotification]);

  // Ping detection - Check for stale connections
  useEffect(() => {
    const staleConnectionInterval = setInterval(() => {
      // If we're supposedly connected but haven't had activity in 30 seconds
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTimeRef.current;

      if (
        isCurrentlyConnectedRef.current &&
        timeSinceLastActivity > 30000 && // 30 seconds
        networkOnlineRef.current // Only do this check if we're online
      ) {
        console.warn("WebSocket connection seems stale. Forcing reconnection.");
        console.warn(`Time since last activity: ${timeSinceLastActivity}ms`);

        // Force a reconnection by closing the current WebSocket
        const webSocket = getWebSocket();
        if (webSocket) {
          webSocket.close();
        }
      }
    }, 10000); // Check every 10 seconds

    return () => {
      clearInterval(staleConnectionInterval);
    };
  }, [getWebSocket]);

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
  }, [readyState, dispatch, pushNotification, t]);

  /**
   * Process incoming WebSocket messages.
   */
  useEffect(() => {
    if (lastMessage?.data) {
      // Update the activity timestamp whenever we receive any message
      lastActivityTimeRef.current = Date.now();

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

  // Clean up all intervals on unmount
  useEffect(() => {
    return () => {
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
      }
    };
  }, []);

  return null;
};
