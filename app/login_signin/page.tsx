'use client'

import React, { useState } from 'react'
import RegisterForm from '@/app/components/user/RegisterForm'
import { useRouter } from "next/navigation"; // For route navigation
import LoginForm from '@/app/components/user/LoginForm';
import SubHeading from '../components/product/SubHeading';
import { useAuth } from '../context/AuthContext';

const LoginRegisterPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { user } = useAuth(); // UseAuth hook to get user data and perform actions
  const router = useRouter();

 

  if (user) {
    router.push("/my_account");
  }

  return (
    <div>
      <div className='lg:grid lg:grid-cols-2'>
        <div className="flex justify-center p-10">
          {
            showLogin ? <LoginForm /> : <RegisterForm />
          }
        </div>
        <div className='p-20 flex flex-col items-center gap-y-5'>
          <SubHeading title={showLogin ? 'Register' : 'Login'}/>
          <p className='text-center font-medium text-sm'>Registering for this site allows you to access your order status and history. Just fill in the fields below, and we'll get a new account set up for you in no time. We will only ask you for the information necessary to make the purchase process faster and easier.</p>

          <button
            onClick={() => setShowLogin(prev => !prev)}
            className='bg-[#9bf618] p-3 rounded-lg w-40 font-semibold'>
            {showLogin ? 'Register' : 'Login'}
          </button>
        </div>

      </div>

    </div>
  )
}

export default LoginRegisterPage
