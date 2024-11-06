"use client";

// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface User {
  username: string;
  password: string;
  email: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  userAuthenticated: boolean;
  activeUser: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize authentication state and active user from localStorage
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const activeUser = storedUsers.find((user: User) => user.isAuthenticated);

      if (activeUser) {
        setUserAuthenticated(true);
        setActiveUser(activeUser);
      }
    } catch (error) {
      console.error('Failed to parse users from localStorage:', error);
    }
  }, []);

  const login = (username: string, password: string) => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = storedUsers.map((user: User) =>
        user.username === username && user.password === password
          ? { ...user, isAuthenticated: true }
          : { ...user, isAuthenticated: false }
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      const user = updatedUsers.find((user: User) => user.username === username && user.password === password);

      if (user) {
        setUserAuthenticated(true);
        setActiveUser(user);
      }
    } catch (error) {
      console.error('Failed to log in user:', error);
    }
  };

  const logout = () => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = storedUsers.map((user: User) => ({ ...user, isAuthenticated: false }));
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      setUserAuthenticated(false);
      setActiveUser(null);
    } catch (error) {
      console.error('Failed to log out user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userAuthenticated, activeUser, login, logout }}>
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
