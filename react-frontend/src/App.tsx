import { Routes, Route, Link, NavLink } from "react-router-dom"
import Landing from "./Landing"
import Home from "./Home"
import { AuthProvider, useAuth } from "./context/AuthProvider"

export const App = () => {
  return (
  <AuthProvider>    
    <Navigation />
    <h1>React Router</h1>
    <Routes>
      <Route index element={<Home />} />
      <Route path="landing" element={<Landing />} />
      <Route path="home" element={<Home />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  </AuthProvider>
  )
}

  const Navigation = () => {
    const value = useAuth()
    return (    
    <nav>
      <NavLink to="/landing">Landing</NavLink>
      {value?.token && (
          <button type="button" onClick={value.onLogout}>
            Sign Out
        </button>
      )}
      <Link to="/landing">Landing</Link>
      <Link to="/home">Home</Link>
    </nav>
    )
}