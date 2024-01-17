
import getAllUsers from "./api/GetAllUsers";
import getToken from "./api/GetAuthToken";
import { useEffect, useState } from "react";

const Landing = () => {  
    const [token, setToken] = useState<string>("...")
    const [users, setUsers] = useState<string[]>([])

    useEffect(() => {
      getToken().then((token: string) => {
          setToken(token)
      })

      getAllUsers("").then((users: string[]) => {
          setUsers(users)
      })
    }, [])
    
    
    return (
      <div>
        <h2>Landing (Protected)</h2>
        <div> 
          <div>Authenticated as</div> 
          <strong>{token.substring(0, 30) + "..."}</strong>
          <br/>
          <strong>Note this is a jwt cookie, don't share</strong>
          </div>
        <h3>Contacts</h3>
        {users.map((user: string) => (
          <div key={user}>{user}</div>
        ))}
      </div>
    );
  };

export default Landing;