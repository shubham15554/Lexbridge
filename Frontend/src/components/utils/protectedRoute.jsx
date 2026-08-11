import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  //let Navigate = useNavigate();
  const { user , loading  } = useContext(AuthContext);
   console.log("aaya");
  if(loading){
    return (<div className="bg-[#0f172a] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>)
  }
 
  if (!user) {
    console.log("fafafda");
  return <Navigate to="/signup" />;
  }

  return children;
};

export default ProtectedRoute;