"use client";

// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser, setLoginStatus, setError } from "@/app/redux/features/users/userSlice";
import { User } from "../types/user";

interface AuthContextType {
  userAuthenticated: boolean;
  activeUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const dispatch = useDispatch();  // Redux dispatch

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const users: User[] = await response.json();
        const authenticatedUser = users.find((user) => user.isAuthenticated);

        if (authenticatedUser) {
          setUserAuthenticated(true);
          setActiveUser(authenticatedUser);
          dispatch(loginUser(authenticatedUser));  // Dispatch to Redux
        }
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
      }
    };

    fetchAuthenticatedUser();
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    try {
      dispatch(setLoginStatus("loading"));
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) throw new Error("Failed to fetch users");

      const users: User[] = await response.json();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        const updatedUser = { ...user, isAuthenticated: true };

        // Update the user in the backend
        await fetch(`http://localhost:3001/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });

        setUserAuthenticated(true);
        setActiveUser(updatedUser);
        dispatch(loginUser(updatedUser));  // Dispatch user to Redux
        dispatch(setLoginStatus("succeeded"));
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      dispatch(setLoginStatus("failed"));
      dispatch(setError(error.message));  // Set error in Redux
      console.error("Error during login:", error);
    }
  };

  const logout = async () => {
    try {
      if (!activeUser) return;

      const updatedUser = { ...activeUser, isAuthenticated: false };

      // Update the user in the backend
      await fetch(`http://localhost:3001/users/${activeUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      setUserAuthenticated(false);
      setActiveUser(null);
      dispatch(logoutUser());  // Dispatch logout to Redux
    } catch (error) {
      console.error("Error during logout:", error);
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
