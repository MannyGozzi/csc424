import { useState } from "react";
import { useAuth } from "./context/AuthProvider";


const Home = () => { 
   const value = useAuth();
   const validUsername = "bj"
   const validPassword = "pass424"
   const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
   const [error, setError] = useState("")

   const onSignIn = () => {
    if (username !== validUsername || password !== validPassword) {
        setError("Invalid username or password")
        return
    }
    setError("")
    value?.onLogin()
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