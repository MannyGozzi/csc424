import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const value = useAuth();
  if (value?.loggedIn === false){
    console.log("Not logged in, redirecting to /home")
    return <Navigate to="/home" replace />;
  }
  return children;
}; 

export default ProtectedRoute;