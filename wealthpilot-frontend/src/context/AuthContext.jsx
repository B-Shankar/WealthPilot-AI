import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Attempt to recover session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("wp_access_token");
    const savedUser = localStorage.getItem("wp_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Secure API Login wrapper
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Attempt connection to Spring Boot backend
      // In local prototype mode, we supply robust simulated RM account credentials
      if (email === "advisor@wealthpilot.ai" && password === "SecurePassword123") {
        const mockUser = {
          id: "rm-908432-us",
          email: "advisor@wealthpilot.ai",
          firstName: "Jane",
          lastName: "Doe",
          role: "ROLE_RELATIONSHIP_MANAGER"
        };
        const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockTokenForWealthPilotAIAdvisor";
        
        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem("wp_access_token", mockToken);
        localStorage.setItem("wp_user", JSON.stringify(mockUser));
        return { success: true };
      }
      
      // Standard fetch pathway
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      
      const data = await response.json();
      setUser(data.rmUser);
      setToken(data.accessToken);
      localStorage.setItem("wp_access_token", data.accessToken);
      localStorage.setItem("wp_user", JSON.stringify(data.rmUser));
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout handler clearing keys
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("wp_access_token");
    localStorage.removeItem("wp_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
