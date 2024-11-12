'use client'


import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const { userAuthenticated } = useAuth();

    useEffect(() => {
        if (!userAuthenticated) {
            router.push('/my_account'); // Redirect if user is not authenticated
        }
    }, [userAuthenticated, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
