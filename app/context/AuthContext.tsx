import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie


const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [vendor, setVendor] = useState<any>(null);
  const [subscribe, setSubscribe] = useState<any>(null);

  // Retrieve stored data from cookies and sessionStorage on component mount
  useEffect(() => {
    // Retrieve JWT token from cookies
    const token = Cookies.get("jwt"); // Accessing JWT token from cookies
    
    // If the token exists, set the authToken state
    if (token) {
      setAuthToken(token);
    }

    // Retrieve user, vendor, and subscribe data from sessionStorage (if set)
    const storedUser = sessionStorage.getItem("user");
    const storedVendor = sessionStorage.getItem("vendor");
    const storedSubscribe = sessionStorage.getItem("subscribe");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse stored user data
    }
    if (storedVendor) {
      setVendor(JSON.parse(storedVendor)); // Parse stored vendor data
    }
    if (storedSubscribe) {
      setSubscribe(JSON.parse(storedSubscribe)); // Parse stored subscribe data
    }
  }, []);

  // Login function to set user, vendor, and token in state and store in sessionStorage and cookies
  const login = (data: any) => {
    const user = data?.user;
    if (user) {
      const { authToken, user, vendor, subscribe } = data;

      // Store the JWT token in cookies with a specific expiration (e.g., 1 day)
      Cookies.set("authToken", authToken, { expires: 1 }); // JWT stored in cookies (expires in 1 day)
      
      // Optionally, store user, vendor, and subscribe in sessionStorage or localStorage
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("vendor", JSON.stringify(vendor || {}));
      sessionStorage.setItem("subscribe", JSON.stringify(subscribe || {}));

      // Set the state with the login data
      setAuthToken(authToken);
      setUser(user);
      setVendor(vendor);
      setSubscribe(subscribe);
    }
  };

  // Logout function to clear state and cookies
  const logout = () => {
    // Remove the JWT token from cookies
    Cookies.remove("authToken");

    // Remove data from sessionStorage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("vendor");
    sessionStorage.removeItem("subscribe");

    // Reset state
    setAuthToken(null);
    setUser(null);
    setVendor(null);
    setSubscribe(null);

    // Optionally, redirect to home or login page
    window.location.href = "/"; // Redirect to home or login page
  };

  return (
    <AuthContext.Provider value={{ authToken, user, vendor, subscribe, login, logout }}>
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
