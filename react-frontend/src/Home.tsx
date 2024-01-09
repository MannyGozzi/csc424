import { useState } from "react";
import { useAuth } from "./context/AuthProvider";


const Home = () => { 
   const value = useAuth();
   const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
   const [error, setError] = useState("")

   const onSignIn = () => {
    setError("")
    if (!value?.onLogin(username, password)) {
        setError("Invalid username or password")
    }
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
        <div>{error}</div>
    </>);
  };

export default Home