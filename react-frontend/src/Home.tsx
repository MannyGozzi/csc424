import { useEffect, useRef, useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import getAllUsers from "./api/GetAllUsers";
import { FaGoogle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const value = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [queryUsername, setQueryUsername] = useState("");

  const [allUsers, setAllUsers] = useState<string[]>([]);
  const navigate = useNavigate();
  const passwordField = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const getOAuthTokenFromWindowIfExists = () => {
      const params = Object.fromEntries([...searchParams])
      if ("token" in params) {
        const token = params.token as string
        value?.saveLogin(true)
        document.cookie = `jwt=${token};`
        navigate("/landing")
      }
    }

    getOAuthTokenFromWindowIfExists()
  }, [navigate, searchParams, value, value?.loggedIn])
  

  const onSignIn = async () => {
    value?.onLogin(username, password).then((res) => {
      if (res?.jwt) {
        console.log("logging in")
        console.log(res)
        setError("");
        navigate("/landing");
      } else {
        console.log(res?.error)
        setError(res?.error || "Login failed");
      }
    })
  }

  const onRegister = async () => {
    value?.onRegister(username, password).then((res) => {
      if (res.error) {
        setError(res.error || "Registration failed");
        if (passwordField.current) passwordField.current.value = "";
        return 
      }
      setError("");
      navigate("/landing");
    });
  };

  const onGetAllUsers = async () => {
    getAllUsers(queryUsername).then((users: string[]) => {
      if (users && users.length > 0) setAllUsers(users);
      else setAllUsers(["No users found"]);
    });
  }

  const onSignInOAuth = async () => {
    value?.onLoginOAuth().then((redirectUrl) => {
      if (redirectUrl) {
        setError("");
        window.location.href = redirectUrl
      } else {
        setError("Login failed");
      }
    });
  };

  return (
    <div>
      <h2>Home (Public)</h2>
      <div className="flexRow">
        <div className="accountInputsGroup">
          <input
            type="text"
            placeholder="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            ref={passwordField}
          />
          <input
            type="text"
            placeholder="query username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQueryUsername(e.target.value)
            }
          />
        </div>
        <div className="accountButtonsGroup">
          <button type="button" onClick={onSignIn}>
            Sign In
          </button>
          <button type="button" onClick={onSignInOAuth}>
            <FaGoogle size={24}/>
          </button>
          <button type="button" onClick={onRegister}>
            Register
          </button>
          <button type="button" onClick={onGetAllUsers}>
            Search
          </button>
        </div>
      </div>
      <div className="errorMsg">{error}</div>
      <div>
        {allUsers && allUsers.map(user => (
          <div key={user}>
            <div>{user}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
