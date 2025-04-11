"use client";

import { useState } from "react";
import SubHeading from "../../product/SubHeading";
import { FaTimes } from "react-icons/fa";
import LoginForm from "../../user/LoginForm";
import RegisterForm from "../../user/RegisterForm";
import EmailVerification from "@/app/components/user/VerifyForm"; // Import OTP component

interface SignInSideComponentProps {
  toggleSignIn: () => void;
}

const Login: React.FC<SignInSideComponentProps> = ({ toggleSignIn }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [verifyComponent, setVerifyComponent] = useState(false);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center z-40 py-2 lg:py-5 overflow-y-auto"
      onClick={toggleSignIn}
    >
      <div
        className="w-full max-w-[80%] h-fit bg-white shadow-lg lg:p-5 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-16 flex justify-between items-center px-3 mb-3">
          {verifyComponent ? (
            ""
          ) : (
            <SubHeading title={!showLogin ? "Register" : "Login"} />
          )}

          <button
            className="flex gap-2 items-center text-gray-500"
            onClick={toggleSignIn}
          >
            <FaTimes className="text-xl" /> <span>Close</span>
          </button>
        </div>

        {verifyComponent ? (
          <EmailVerification toggleSignIn={toggleSignIn} />
        ) : (
          <div>
            <div className="lg:grid lg:grid-cols-2">
              <div className="flex justify-center p-4 lg:p-10">
                {showLogin ? (
                  <LoginForm toggleSignIn={toggleSignIn} />
                ) : (
                  <RegisterForm setVerifyComponent={setVerifyComponent} />
                )}
              </div>
              <div className="hidden p-4 lg:p-10 lg:flex lg:flex-col lg:items-center gap-y-5">
                <SubHeading title={showLogin ? "Register" : "Login"} />
                <p className="text-center font-medium text-sm">
                  Registering for this site allows you to access your order
                  status and history. Just fill in the fields below, and we'll
                  get a new account set up for you in no time. We will only ask
                  you for the information necessary to make the purchase process
                  faster and easier.
                </p>

                <button
                  onClick={() => setShowLogin((prev) => !prev)}
                  className="bg-[#9bf618] p-3 rounded-lg w-40 font-semibold"
                >
                  {showLogin ? "Register" : "Login"}
                </button>
              </div>
              {/* small view */}
              <div className="lg:hidden w-full flex justify-center p-3">
                {showLogin ? (
                  <div>
                    <p>
                      Don't have an account?{" "}
                      <span
                        className="underline hover:opacity-50"
                        onClick={() => setShowLogin((prev) => !prev)}
                      >
                        Create One
                      </span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      Already have an account?{" "}
                      <span
                        className="underline hover:opacity-50"
                        onClick={() => setShowLogin((prev) => !prev)}
                      >
                        Login
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
