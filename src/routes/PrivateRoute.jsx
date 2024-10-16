import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Optional: a loader while authentication state is being checked
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
