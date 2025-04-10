'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation'; // For route navigation
import PaymentInitiate from './component/PaymentInitiate'
import ProtectedRoute from '@/app/provider/ProtectedRoute'
import Spinner from '@/app/components/Spinner';
import { toast } from 'react-toastify';

const PaymentInitiatePage = () => {

    const { user } = useAuth(); // Check authentication state
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user === undefined) {
            // Wait for authentication to resolve
            return;
        }

        if (!user) {
            // Redirect to login page if not logged in
            toast.error('please login to continue');
            router.push("/");
        } else {
            setLoading(false); // Stop loading once authenticated
        }
    }, [user, router]);

    if (loading) {
        // Optionally render a loading spinner or placeholder
        return <Spinner />;
    }


    return (
        <ProtectedRoute>
            <PaymentInitiate />
        </ProtectedRoute>
    )
}

export default PaymentInitiatePage
