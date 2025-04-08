import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const authToken = Cookies.get("access_token");


  if (!user && !authToken) {
    // Prevent rendering protected content before redirect
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
