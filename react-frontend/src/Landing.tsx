
import getToken from "./api/GetAuthToken";
import { useState } from "react";

const Landing = () => {  
    const [token, setToken] = useState<string>("...")

    getToken().then((token: string) => {
        setToken(token)
    })
    
    return (
      <>
        <h2>Landing (Protected)</h2>
        <div> Authenticated as {token}</div>
      </>
    );
  };

export default Landing;