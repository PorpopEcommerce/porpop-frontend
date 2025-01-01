'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Button from '@/app/components/product/Button';

const PaymentSuccess: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>('Verifying payment...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reference = searchParams.get('reference');
    const trxref = searchParams.get('trxref');

    if (!reference || !trxref) {
      setError('Invalid payment details');
      setStatus('Failed to verify payment');
      return;
    }

    // Call your backend to verify the payment with the reference
    const verifyPayment = async () => {
      try {
        const response = await fetch(`https://backend-porpop.onrender.com/api/v1/payment/paystack-callback?reference=${reference}&trxref=${trxref}`);
        const data = await response.json();

        if (data.status === 'success') {
          setStatus('Payment successful!');
        } else {
          setStatus('Payment verification failed.');
        }
      } catch (err) {
        setError('Error occurred while verifying payment');
        setStatus('Failed to verify payment');
      }
    };


    verifyPayment();
  }, [searchParams]);

  const handleRedirectToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center">{status}</h1>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <div className="mt-6 text-center">
          {status === 'Payment successful!' && (
            <Button
              label="Go to Dashboard"
              custom="mt-4"
              onClick={handleRedirectToDashboard}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
