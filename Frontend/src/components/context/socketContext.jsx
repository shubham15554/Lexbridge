import React, { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
   
    socketRef.current = io("https://lexbridge-m1oz.onrender.com", {
      transports: ["polling", "websocket"], 
      withCredentials: true,
      autoConnect: true,
      reconnectionAttempts: 10, // Render cold start ke liye retry attempts badha diye
      reconnectionDelay: 2000,
    });

    socketRef.current.on("connect", () => {
      
      console.log("Connected to Socket.IO server with ID:", socketRef.current.id);
      setIsConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      setIsConnected(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};