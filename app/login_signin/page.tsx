"use client";

import React, { useState } from "react";
import RegisterForm from "@/app/components/user/RegisterForm";
import LoginForm from "@/app/components/user/LoginForm";
import SubHeading from "../components/product/SubHeading";
import Image from "next/image";

const LoginRegisterPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="md:p-16 p-4 relative">
      <div className="fixed top-0 left-0 w-screen h-screen">
        <div className="relative h-full w-full">
          <Image
            src="/Images/Login/bg.jpg"
            fill
            className="z-0 opacity-30 h-full w-full bg-cover"
            alt=""
          />
        </div>
      </div>
      <div className="bg-[#F0F2F5] flex flex-col lg:flex-row items-center maxW relative z-10">
        <div className="flex flex-1 justify-center md:px-20 md:py-16 py-10 px-6 w-full lg:w-auto">
          {showLogin ? <LoginForm /> : <RegisterForm />}
        </div>

        <div className="w-[1px] h-96 bg-[#D9D9D9] hidden lg:block" />

        <div className="md:px-20 px-6 lg:py-20 md:pt-4 pb-10 flex flex-1 flex-col justify-center gap-y-5">
          <div className="flex flex-col items-center w-fit">
            <div className={`${!showLogin && "hidden"}`}>
              <SubHeading title={showLogin ? "Signup" : "Login"} />
            </div>
            <p
              className={`${
                !showLogin && "hidden"
              } text-center font-medium md:w-[330px] text-[#55556F] py-4`}
            >
              Signing up for this site allows you to access your order status
              and history. Just fill in the fields, and we'll get a new account
              set up for you in no time. We will only ask you for the
              information necessary to make the purchase process faster and
              easier.
            </p>

            <button
              onClick={() => setShowLogin((prev) => !prev)}
              className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-[4px]
        hover:opacity-80
        transition
        w-full
        md:min-w-[330px]
        min-w-[200px]
        flex
        items-center
        justify-center
        gap-2
        bg-[#D9D9D9]
        text-black
        uppercase
        py-3
        shadow-md
        shadow-gray-400
        `}
            >
              {showLogin ? "SIGN UP" : "BACK TO LOG IN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
