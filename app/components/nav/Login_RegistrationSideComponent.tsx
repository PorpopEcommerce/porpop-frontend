"use client";


import Link from 'next/link';
import { FaTimes } from "react-icons/fa";
import LoginForm from '../user/LoginForm';

interface SignInSideComponentProps {
    toggleSignIn: () => void;
}

const Login_RegistrationSideComponent: React.FC<SignInSideComponentProps> = ({ toggleSignIn }) => {
    
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40' onClick={toggleSignIn}>
            <div
                className='w-full md:w-[400px] h-full bg-white shadow-lg p-6 flex flex-col overflow-y-auto'
                onClick={(e) => e.stopPropagation()}
            >

                <div className="h-16 flex justify-between items-center px-2 mb-4">
                    <h2 className="text-xl md:text-2xl font-bold">Sign In</h2>
                    <button className="flex gap-2 items-center text-gray-500" onClick={toggleSignIn}>
                        <FaTimes className="text-xl" /> <span>Close</span>
                    </button>
                </div>

                <LoginForm />

                <div className="mt-auto text-center text-xs md:text-sm pt-6">
                    <p className="mb-2">No account yet?</p>
                    <Link href="/my_account">
                        <button className="text-black text-lg font-semibold underline-offset-4 hover:underline">
                            <span className="border-b-2 border-green-500">Create an account</span>
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Login_RegistrationSideComponent;
