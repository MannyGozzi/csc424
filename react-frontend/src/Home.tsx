import { useRef, useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import getAllUsers from "./api/GetAllUsers";

const Home = () => {
  const value = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [queryUsername, setQueryUsername] = useState("");

  const [allUsers, setAllUsers] = useState<string[]>([]);
  const navigate = useNavigate();
  const passwordField = useRef<HTMLInputElement>(null);

  const onSignIn = async () => {
    value?.onLogin(username, password).then((success) => {
      if (success) {
        setError("");
        navigate("/landing");
      } else {
        setError("Login failed");
      }
    });
  };

  const onRegister = async () => {
    value?.onRegister(username, password).then((success) => {
      if (success) {
        setError("");
        navigate("/landing");
      } else {
        setError("Registration failed, 8+ chars, 1 num, 1 sym.");
        if (passwordField.current) passwordField.current.value = "";
      }
    });
  };

  const onGetAllUsers = async () => {
    getAllUsers(queryUsername).then((users: string[]) => {
      if (users && users.length > 0) setAllUsers(users);
      else setAllUsers(["No users found"]);
    });
  }

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
