import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { authApi } from '@/api/auth.api';
import type { User } from '@/types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, accessToken: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, isLoading, setAuth, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    async function initializeAuth() {
      const storedToken = useAuthStore.getState().token;
      if (!storedToken) {
        useAuthStore.setState({ isLoading: false });
        return;
      }

      try {
        const { data } = await authApi.getProfile();
        useAuthStore.setState({ user: data });
      } catch {
        storeLogout();
      } finally {
        useAuthStore.setState({ isLoading: false });
      }
    }

    initializeAuth();
  }, [storeLogout]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      storeLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login: setAuth,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
