import { useContext, createContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  const showNotification = (msg, duration = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration);
  };

  return (
      <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification message={message} />
    </NotificationContext.Provider>
  );
};
