import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  let Navigate = useNavigate();
  if (!user) {
    Navigate('/signup');
  }

  return children;
};

export default ProtectedRoute;