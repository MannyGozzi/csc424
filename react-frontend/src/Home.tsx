import { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";


const Home = () => { 
  const value = useAuth();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const onSignIn = async () => {
  value?.onLogin(username, password).then((success) => {
    if (success) {
      setError("")
      navigate("/landing")
    } else {
      setError("Login failed")
    }
  })   
  }

  const onRegister = async () => {
    value?.onRegister(username, password).then((success) => {
      if (success) {
        setError("")
        navigate("/landing")
      } else {
        setError("Registration failed")
      }
    })   
  }

  return (
    <>
      <h2>Home (Public)</h2>
      <input 
          type="text" 
          placeholder="username" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
      <input 
          type="password" 
          placeholder="password" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
      <button type="button" onClick={onSignIn}>
        Sign In
      </button>
      <button type="button" onClick={onRegister}>
        Register
      </button>
      <div>{error}</div>
  </>);
};

export default Home