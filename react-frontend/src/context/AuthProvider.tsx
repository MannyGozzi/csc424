import { createContext, useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export type AuthProviderProps = {
  children?: React.ReactNode;
}

type AuthContextProps = {
  token: string | null;
  onLogin: (username: string, password: string) => boolean;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate()

  const handleLogin = async (username: string, password: string) => {
    setToken(token as string);
    axios.post("http://localhost:8000/api/account/login", {
        username,
        password
        }).then((response) => {
            if (response.data.token !== undefined) {
                setToken(response.data.token)
                return true
            } else {
                return false
            }
        }).catch((error) => {
            console.log(error)
            return false
        }
    )
    navigate("/landing")
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