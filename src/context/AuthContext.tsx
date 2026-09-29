import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { DemoUser, UserRole } from '@/types';
import { demoUsers } from '@/data/mockData';

interface AuthContextValue {
  user: DemoUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);

  const login = useCallback((role: UserRole) => {
    const matched = demoUsers.find((u) => u.role === role);
    if (matched) setUser(matched);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
