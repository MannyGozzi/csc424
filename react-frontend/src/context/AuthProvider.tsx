import { createContext, useContext, useState } from "react";
import fakeAuth from "../utils/FakeAuth";
import React from "react";
const AuthContext = createContext({});




export const AuthProvider = ({ children: React.ReactNode }) => {
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);