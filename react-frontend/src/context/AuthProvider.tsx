import { createContext, useContext } from "react";
import React from "react";
import axios, { AxiosResponse } from "axios";
import { HOST_URL } from "../../config";

export type AuthProviderProps = {
  children?: React.ReactNode;
}

export type LoginResponse = {
  jwt?: string;
  error?: string
}

export type RegisterResponse = {
  success?: string;
  error?: string
}

type AuthContextProps = {
  onLogin: (username: string, password: string) => Promise<LoginResponse>;
  onLogout: () => void;
  onRegister: (username: string, password: string) => Promise<RegisterResponse>;
  onLoginOAuth: () => Promise<string>;
  loggedIn: boolean;
  saveLogin: (login: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedIn, setLoggedIn] = React.useState(window.localStorage.getItem('loggedIn') === 'true');

  const saveLogin = (login: boolean) => {
    window.localStorage.setItem('loggedIn', login ? 'true' : 'false')
    if (!login) {
      document.cookie = 'jwt=;';
    }
    setLoggedIn(login)
  }

  const handleLogin = async (username: string, password: string) => {
    return axios.post(`{${HOST_URL}/api/account/login`, {
        username,
        password
        }).then((res) => {
          saveLogin(true)
          return { jwt: res.data.token}
        }).catch((error) => {
          saveLogin(false)
          return { error: error.response.data }
        }
    )
  };

  const handleRegister = async (username: string, password: string) => {
    return axios.post(`${HOST_URL}/api/account/register`, {
        username,
        password
        }).then((res) => {
          if (res.data.error) {
            saveLogin(false)
            return {error: res.data.error}
          }
          saveLogin(true)
          return {success: "Registation success"}
        }).catch((error) => {
          saveLogin(false)
          console.log(error)
          return { error: error.response.data}
        }
    )
  }

  const onLoginOAuth = async () => {
    return await axios.post(`${HOST_URL}/request`).then((res: AxiosResponse<any, any>) => {
      return res.data.redirect_url
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleLogout = () => {
    document.cookie = 'jwt=;'
    saveLogin(false)
  };

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onLoginOAuth,
    loggedIn,
    saveLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);