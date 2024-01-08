import { useAuth } from "./context/AuthProvider";


const Home = () => { 
   const value = useAuth();
    return (
      <>
        <h2>Home (Public)</h2>
        <button type="button" onClick={value?.onLogin}>
          Sign In
        </button>
    </>
  );
  };

export default Home