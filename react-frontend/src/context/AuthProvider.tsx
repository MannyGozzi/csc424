import { createContext, useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export type AuthProviderProps = {
  children?: React.ReactNode;
}

type AuthContextProps = {
  token: string | null;
  onLogin: (username: string, password: string) => Promise<boolean>;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string) => {
    return axios.post("http://localhost:8000/api/account/login", {
        username,
        password
        }).then((response) => {
            if (response.data.token !== undefined) {
                setToken(response.data.token)
                return true
            } else {
                setToken(null)
                return false
            }
        }).catch((error) => {
            console.log(error)
            setToken(null)
            return false
        }
    )
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