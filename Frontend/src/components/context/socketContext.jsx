import React, { createContext, useEffect, useRef , useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
 
    const socketRef = useRef();
   let [isconnected, setIsConnected] = useState(false);
    useEffect(() => {
        socketRef.current = io("https://lexbridge-m1oz.onrender.com", {
            transports: ["websocket"], 
        });

        socketRef.current.on("connect", () => {
            console.log("Connected to Socket.IO server with ID:", socketRef.current.id);
            setIsConnected(true);
        });
        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);
    if(isconnected){
        return (
        <SocketContext.Provider value={{ socketRef }}>
            {children}
        </SocketContext.Provider>
    );
    }else{
      return (<div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>)
    }
   
};