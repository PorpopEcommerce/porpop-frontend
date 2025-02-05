"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useLoginForm } from "../../hooks/useLoginForm";
import Button from "../product/Button";

const LoginForm = ({ toggleSignIn }: { toggleSignIn: () => void }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { formData, errors, errMsg, handleChange, handleSubmit, isLoading, isSuccessfull } = useLoginForm(toggleSignIn);

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

            {errMsg && (
                <div className={`w-full p-5 mb-4 bg-red-600`}>
                    <p className={`text-white`}>
                        {errMsg}
                    </p>
                </div>
            )}

            {isSuccessfull && (
                <div className={`w-full p-5 mb-4 bg-green-600`}>
                    <p className={`text-white`}>
                        {isSuccessfull}
                    </p>
                </div>
            )}


            <form className="flex flex-col space-y-4">
                <div>
                    <label className="block mb-1 text-sm md:text-base">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                    <label className="block mb-1 text-sm md:text-base">Password</label>
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-sm"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <Button label={isLoading ? "Loading..." : "Login"} onClick={handleSubmit} disabled={isLoading} />

            </form>
        </div>
    );
};

export default LoginForm;
