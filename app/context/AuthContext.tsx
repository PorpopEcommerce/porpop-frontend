import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  // Retrieve stored data from cookies and sessionStorage on component mount
  useEffect(() => {
    // Retrieve JWT token from cookies
    const token = Cookies.get("access_token");
  
    if (token) {
      setAuthToken(token);
    }
  
    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);
  

  // Login function to set user, vendor, and token in state and store in sessionStorage and cookies
  const login = (data: any) => {
    const { access_token, user } = data;
  
    if (access_token) {
      // Store the token in cookies (1-day expiration)
      Cookies.set("access_token", access_token, { expires: 1 });
  
      // Store user info in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));
  
      // Update state
      setAuthToken(access_token);
      setUser(user);
    }
  };
  

  // Logout function to clear state and cookies
  const logout = () => {
    // Remove the JWT token from cookies
    Cookies.remove("access_token");

    // Remove data from sessionStorage
    sessionStorage.removeItem("user");    

    // Reset state
    setAuthToken(null);
    setUser(null);
    

    // Optionally, redirect to home or login page
    window.location.href = "/"; // Redirect to home or login page
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access the AuthContext in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
