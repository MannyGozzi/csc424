import { Routes, Route, Link, NavLink } from "react-router-dom"
import Landing from "./Landing"
import Home from "./Home"
import React from "react"
import User from "./User"
import fakeAuth from "./utils/FakeAuth"
import AuthContextProps from "./AuthContextProps"
export const AuthContext = React.createContext<AuthContextProps>(null);  // we will use this in other components

export const App = () => {
  const [user, setUser] = React.useState<User>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token as string);
  };
  
  const handleLogout = () => {
    setToken(null);
  };

  return (
<AuthContext.Provider value={{token}}>    
  <h1>React Router</h1>
    <Navigation token={token} onLogout={handleLogout} />
    {user ? (
    <button onClick={handleLogout}>Sign Out</button>
    ) : (
    <button onClick={handleLogin}>Sign In</button>
    )}
    
    <h1>React Router</h1>
    <Routes>
      <Route index element={<Landing />} />
      <Route path="home" element={<Home onLogin={handleLogin} />} />
      <Route path="landing" element={<Landing />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
    </AuthContext.Provider>
    );
    };

  type NavigationProps = {
    token: string | null;
    onLogout: () => void;
  };

  const Navigation = ({ token, onLogout }: NavigationProps) => (
    <nav>
      <NavLink to="/landing">Landing</NavLink>
      {token && (
          <button type="button" onClick={onLogout}>
            Sign Out
        </button>
      )}
      <Link to="/landing">Landing</Link>
      <Link to="/home">Home</Link>
    </nav>
);