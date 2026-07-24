import { createContext, useContext, useState, useRef } from "react";

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const timeoutRef = useRef(null);

  const [notification, setNotification] = useState({
    show: false,
    type: "success",
    message: "",
  });

  function showNotification(message, type = "success", duration = 3000) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setNotification({
      show: true,
      type,
      message,
    });

    timeoutRef.current = setTimeout(() => {
      hideNotification();
    }, duration);
  }

  function hideNotification() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setNotification((prev) => ({
      ...prev,
      show: false,
    }));
  }

  const value = {
    notification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

function useNotification() {
  return useContext(NotificationContext);
}

export { NotificationProvider, useNotification };
