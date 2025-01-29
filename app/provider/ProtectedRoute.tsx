import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, vendor } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !vendor) {
      alert("please login to continue")
    }
  }, [user, router]);

  if (!user) {
    // Prevent rendering protected content before redirect
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
