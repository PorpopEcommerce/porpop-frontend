import { useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

interface SignInSideComponentProps {
    toggleSignIn: () => void;
}

const Login_RegistrationSideComponent: React.FC<SignInSideComponentProps> = ({ toggleSignIn }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

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

                <form className="flex flex-col space-y-4">
                    <div>
                        <label className="block mb-1 text-sm md:text-base">Username or Email</label>
                        <input type="text" className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm md:text-base">Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className="w-full border p-2 rounded"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-sm"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded font-bold">Log In</button>
                    <div className="flex items-center justify-between text-xs md:text-sm mt-2">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <button className="text-green-500 hover:underline">Lost Password?</button>
                    </div>
                </form>

                <div className="flex items-center mt-6 mb-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <h1 className="px-4 font-bold text-center text-sm md:text-base">OR LOGIN WITH</h1>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <button className="w-full bg-blue-500 text-white p-2 rounded text-center flex items-center justify-center relative">
                    <FcGoogle className="absolute left-3 text-lg bg-white rounded-full" />
                    <span>Google</span>
                </button>

                <div className="mt-auto text-center text-xs md:text-sm pt-6">
                    <p className="mb-2">No account yet?</p>
                    <button className="text-black text-lg font-semibold underline-offset-4 hover:underline">
                        <span className="border-b-2 border-green-500">Create an account</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login_RegistrationSideComponent;
