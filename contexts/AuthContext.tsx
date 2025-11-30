'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, User, AuthState } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<User>;
  logout: () => Promise<void>;
  getJWT: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(authService.getState());

  useEffect(() => {
    const unsubscribe = authService.subscribe(setState);
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    return authService.login(email, password);
  };

  const register = async (email: string, password: string, name: string): Promise<User> => {
    return authService.register(email, password, name);
  };

  const logout = async (): Promise<void> => {
    return authService.logout();
  };

  const getJWT = async (): Promise<string | null> => {
    return authService.getJWT();
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    getJWT,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
