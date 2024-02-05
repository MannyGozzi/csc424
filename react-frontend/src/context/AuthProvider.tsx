import { createContext, useContext, useState } from "react";
import React from "react";
import axios, { AxiosResponse } from "axios";

export type AuthProviderProps = {
  children?: React.ReactNode;
}

type AuthContextProps = {
  token: string | null;
  loggedIn: boolean;
  onLogin: (username: string, password: string) => Promise<boolean>;
  onLogout: () => void;
  onRegister: (username: string, password: string) => Promise<boolean>;
  onLoginOAuth: () => Promise<string>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(localStorage.getItem('loggedIn') == 'true');

  const handleLogin = async (username: string, password: string) => {
    return axios.post("https://localhost:8000/api/account/login", {
        username,
        password
        }, /* { withCredentials: true } */).then((response) => {
          setToken(response.data.token)
          localStorage.setItem('loggedIn', 'true')
          setLoggedIn(true)
          return true
        }).catch((error) => {
            console.log("Error logging in", error)
            setToken(null)
            localStorage.setItem('loggedIn', 'false')
            setLoggedIn(false)
            return false
        }
    )
  };

  const handleRegister = async (username: string, password: string) => {
    return axios.post("https://localhost:8000/api/account/register", {
        username,
        password
        }).then((response) => {
            if (response.data.token !== undefined) {
                setToken(response.data.token)
                localStorage.setItem('loggedIn', 'true')
                setLoggedIn(true)
                return true
            } else {
                setToken(null)
                localStorage.setItem('loggedIn', 'false')
                setLoggedIn(false)
                return false
            }
        }).catch((error) => {
            console.log(error)
            setToken(null)
            localStorage.setItem('loggedIn', 'false')
            setLoggedIn(false)
            return z
        }
    )
  }

  const onLoginOAuth = async () => {
    return await axios.post("https://localhost:8000/request").then((res: AxiosResponse<any, any>) => {
      return res.data.redirect_url
    }).catch((error) => {
      console.log(error)
      setToken(null)
      setLoggedIn(false)
      localStorage.setItem('loggedIn', 'false')
    })
  }

  const handleLogout = () => {
    setToken(null);
    setLoggedIn(false);
    localStorage.setItem('loggedIn', 'false')
    document.cookie = 'jwt=;'
  };

  const value = {
    token,
    loggedIn,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onLoginOAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);