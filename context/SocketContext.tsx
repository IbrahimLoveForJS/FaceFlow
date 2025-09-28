"use client";
import { SocketUser } from "@/types";
import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface iSocketContext {
  onlineUsers: SocketUser[] | null;
}

export const SocketContext = createContext<iSocketContext | null>(null);

export function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>(null);
  console.log("isConnected>>", isSocketConnected);
  console.log(user);

  useEffect(() => {
    if (!user) return;
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (user) return;
    if (!socket) return;
    // Sign-out happened: disconnect this socket so the server removes the user
    socket.disconnect();
    setSocket(null);
    setOnlineUsers(null);
    setIsSocketConnected(false);
  }, [user, socket]);

  useEffect(() => {
    if (socket === null) return;

    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsSocketConnected(true);
    }

    function onDisconnect() {
      setIsSocketConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !isSocketConnected) return;

    socket.emit("addNewUser", user);

    const handleGetUsers = (users: SocketUser[]) => {
      setOnlineUsers(users);
    };
    socket.on("getUser", handleGetUsers);

    return () => {
      socket.off("getUser", handleGetUsers);
    };
  }, [socket, isSocketConnected, user]);

  return (
    <SocketContext.Provider value={{ onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error("useSocket must be used within a SocketContextProvider");
  }
  return context;
}
