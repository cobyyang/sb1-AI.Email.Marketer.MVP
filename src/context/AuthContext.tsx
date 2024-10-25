import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
  updateApiKey: (apiKey: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);
    
    if (user) {
      setAuthState({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: User) => u.email === email)) {
      return false;
    }

    const newUser: User = { email, password, apiKey: '' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    setAuthState({ user: newUser, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  };

  const updateApiKey = (apiKey: string) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, apiKey };
      setAuthState({ user: updatedUser, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) => 
        u.email === updatedUser.email ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, updateApiKey }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};