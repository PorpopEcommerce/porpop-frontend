import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Retrieve stored data from cookies and sessionStorage on mount
  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      setAuthToken(token);
    }

    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Add this new function to refresh user data from the backend
  const refreshUserData = async () => {
    const token = Cookies.get("access_token");
    if (token) {
      try {
        const response = await axios.get(`${BASE_URL}/v1/auth`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data && response.data.body) {
          const userData = response.data.body;
          
          // Update session storage
          sessionStorage.setItem("user", JSON.stringify(userData));
          
          // Update state
          setUser(userData);
          return userData;
        }
      } catch (error) {
        console.error("Error refreshing user data:", error);
      }
    }
    return null;
  };

  // Login function
  const login = (data: any) => {
    const { access_token, user } = data;

    if (access_token) {
      // Set cookie to expire in 3 hours (1/8 day)
      Cookies.set("access_token", access_token, {
        expires: 1 / 8,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      sessionStorage.setItem("user", JSON.stringify(user));

      setAuthToken(access_token);
      setUser(user);
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("access_token");
    sessionStorage.removeItem("user");

    setAuthToken(null);
    setUser(null);

    window.location.href = "/";
  };

  // ⏱️ Sliding expiration: refresh cookie on user activity
  useEffect(() => {
    const refreshToken = () => {
      const token = Cookies.get("access_token");
      if (token) {
        Cookies.set("access_token", token, {
          expires: 1 / 8,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });
      }
    };

    const activityEvents = ["mousemove", "keydown", "click"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, refreshToken)
    );

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, refreshToken)
      );
    };
  }, []);

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        logout();
      }, 3 * 60 * 60 * 1000); // 3 hours
    };

    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // Start timer on mount

    return () => {
      clearTimeout(inactivityTimeout);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [authToken]); // Only set this up if logged in

  return (
    <AuthContext.Provider
      value={{
        authToken,
        user,
        login,
        logout,
        refreshUserData, // Add this to expose the function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};