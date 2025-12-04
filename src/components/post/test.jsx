import { createContext, useContext, useState } from "react";
import Notification from "./Notification";

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

      {/* tampil di semua halaman */}
      <Notification message={message} />
    </NotificationContext.Provider>
  );
};
