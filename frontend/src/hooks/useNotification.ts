import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import { addNotification } from "@redux/store/slices/notificationSlice";

interface UseNotification {
  pushNotification: (
    title: string,
    message: string,
    severity: "success" | "error" | "warning" | "info",
  ) => void;
}

export const useNotification = (): UseNotification => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const pushNotification = useCallback(
    (
      title: string,
      message: string,
      severity: "success" | "error" | "warning" | "info",
    ) => {
      const notificationId = uuidv4();

      dispatch(
        addNotification({
          id: notificationId,
          title,
          message,
          severity,
          open: true,
        }),
      );

      enqueueSnackbar(message, {
        variant: severity,
      });
    },
    [dispatch, enqueueSnackbar],
  );

  return {
    pushNotification,
  };
};
