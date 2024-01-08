import React from "react";
import { AuthContext } from "./App";

const Landing = () => {  
    const value = React.useContext(AuthContext);
    return (
      <>
        <h2>Landing (Protected)</h2>
        <div> Authenticated as {value?.token}</div>
      </>
    );
  };

export default Landing;