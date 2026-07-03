// FILE: src/hooks/useSocket.ts
import { useEffect, useRef } from 'react';
import { socketService } from '../services/socketService';
import { useAuthStore } from '../store/authStore';

export function useSocket() {
  const { token } = useAuthStore();
  const socketRef = useRef(socketService);

  useEffect(() => {
    if (token) {
      socketService.connect(token);
    }
    return () => {
      socketService.disconnect();
    };
  }, [token]);

  return socketRef.current;
}