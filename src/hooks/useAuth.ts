import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { mockData } from '../utils/mockData';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setToken,
    setAuthenticated,
    setLoading,
    setError,
    logout
  } = useAuthStore();

  const login = useCallback(async ({ email }: { email: string; password: string; mfaCode?: string }) => {
    setLoading(true);
    setError(null);

    await new Promise(resolve => setTimeout(resolve, 800));

    const baseUser = mockData.users[0];
    const demoUser = {
      ...baseUser,
      id: '1',
      name: 'Security Analyst',
      email,
      role: 'admin' as const,
    };

    const demoToken = 'demo-token';

    localStorage.setItem('auth_token', demoToken);

    setUser(demoUser);
    setToken(demoToken);
    setAuthenticated(true);

    setLoading(false);

    return {
      token: demoToken,
      user: demoUser
    };
  }, [setUser, setToken, setAuthenticated, setLoading, setError]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('auth_token');

    if (!token) return;

    const baseUser = mockData.users[0];
    const demoUser = {
      ...baseUser,
      id: '1',
      name: 'Security Analyst',
      email: 'admin@sentinelops.ai',
      role: 'admin' as const,
    };

    setUser(demoUser);
    setToken(token);
    setAuthenticated(true);
  }, [setUser, setToken, setAuthenticated]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth
  };
}