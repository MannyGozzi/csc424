import { createContext, useContext, useState } from "react";
import fakeAuth from "../utils/FakeAuth";
import React from "react";

export type AuthProviderProps = {
  children?: React.ReactNode;
}

type AuthContextProps = {
  token: string | null;
  onLogin: () => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token as string);
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
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);