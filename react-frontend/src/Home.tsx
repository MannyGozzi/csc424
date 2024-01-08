import { useAuth } from "./context/AuthProvider";


const Home = () => { 
   const value = useAuth();
    return (
      <>
        <h2>Home (Public)</h2>
        <button type="button" onClick={value?.onLogin}>
          Sign In
        </button>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
    </>
  );
  };

export default Home