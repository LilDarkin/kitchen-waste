import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000;
  const isTokenExpired = Date.now() - expirationTime;
  if (isTokenExpired > 0) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
