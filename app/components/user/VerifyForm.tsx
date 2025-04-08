"use client";
import { useVerify } from "@/app/hooks/useVerify"; // Ensure correct import path

const EmailVerification = ({ toggleSignIn }: { toggleSignIn: () => void }) => {
  const { otp, inputRefs, handleChange, handleKeyDown, handleSubmit, loading } =
    useVerify();

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-semibold mb-2">Verify Your Email</h2>
      <p className="text-gray-500 mb-4">
        Enter the 6-digit code sent to your email
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9bf618]"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otp.join("").length < 6}
          className="px-4 py-2 bg-[#9bf618] rounded-md disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
