// FILE: src/contexts/SocketContext.tsx
import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { WS_URL } from '../utils/constants';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const { token, isAuthenticated } = useAuthStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const socket = io(WS_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('notification', (notification) => {
      addNotification(notification);
    });

    socket.on('incident_update', () => {
      // Handle real-time incident updates
    });

    socket.on('alert_new', () => {
      // Handle new alerts
    });

    socket.on('agent_status', () => {
      // Handle agent status updates
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [token, isAuthenticated, addNotification]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);