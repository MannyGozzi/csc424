import { Navigate } from "react-router-dom";
import User from "./User";

type ProtectedRouteProps = {
    user: User;
    children: React.ReactNode;
};

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/landing" replace />;
  }
  return children;
}; 

export default ProtectedRoute;