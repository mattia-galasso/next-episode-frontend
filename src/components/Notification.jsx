import { useNotification } from "../contexts/NotificationContext";

import "../assets/css/notification.css";

export default function Notification() {
  const { notification } = useNotification();

  if (!notification.show) return null;

  return (
    <div className={`notification ${notification.type}`}>
      <i
        className={`bi ${
          notification.type === "success"
            ? "bi-check-circle-fill"
            : notification.type === "danger"
              ? "bi-x-circle-fill"
              : "bi-info-circle-fill"
        }`}
      ></i>

      <span>{notification.message}</span>
    </div>
  );
}
