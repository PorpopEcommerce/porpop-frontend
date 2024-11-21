'use client'

import React, { useState } from 'react'
import RegisterForm from '../../components/user/RegisterForm'
import LoginForm from '../../components/user/LoginForm';

const LoginRegisterPage = () => {
  const [showLogin, setShowLogin] = useState(true);


  return (
    <div>
      <div className='h-20 bg-gray-500 flex justify-center items-center'>
        <div>
          <h1>My Account</h1>
        </div>
      </div>
      <div className='lg:grid lg:grid-cols-2'>
        <div className="flex justify-center p-20">
          {
            showLogin ? <LoginForm /> : <RegisterForm /> 
          }
        </div>
        <div className='p-20 flex flex-col items-center gap-y-10'>
          <h1>Login</h1>
          <p className='text-center'>Registering for this site allows you to access your order status and history. Just fill in the fields below, and we'll get a new account set up for you in no time. We will only ask you for the information necessary to make the purchase process faster and easier.</p>

          <button onClick={() => setShowLogin(prev => !prev)}>{showLogin ? 'REGISTER' : 'LOGIN'}</button>
        </div>

      </div>

    </div>
  )
}

export default LoginRegisterPage
