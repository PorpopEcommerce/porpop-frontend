"use client"

// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  userAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for user data and set authentication state
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) setUserAuthenticated(true);
  }, []);

  const login = () => {
    setUserAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUserAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
