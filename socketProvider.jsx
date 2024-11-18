import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "./socket"

const SocketProvider = ({ children }) => {
  const userId = useSelector((state) => state.user.currentUser?._id); // Get user ID from Redux store
  console.log(userId);

  useEffect(() => {
    if (userId) {
      // Establish socket connection
      socket.connect();

      // Emit user ID to the server to map it with the socket ID
    //   socket.emit("user_connected", userId);

      // Listen for socket reconnection and re-emit user ID
      socket.on("connect", () => {
        console.log(`Reconnected with socket ID: ${userId}`);
        socket.emit("user_connected", userId);
      });

      // Clean up socket connection on component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [userId]);

  return <>{children}</>; // Render children components
};

export default SocketProvider;
