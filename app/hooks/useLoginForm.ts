import { useState } from "react";
import { useDispatch } from "react-redux"; // Import custom Redux hook
import { setLoginStatus, loginUser, setError } from "@/app/redux/features/users/userSlice";
import { useRouter } from "next/navigation";
import { useAuth} from '@/app/context/AuthContext'

export const useLoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [errMsg, setErrMsg] = useState<string>("");
    const dispatch = useDispatch();
    const router = useRouter();
    const {login} = useAuth();

    const validateForm = () => {
        const newErrors: typeof errors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
        setErrMsg("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!validateForm()) return;
  
      try {
          dispatch(setLoginStatus("loading")); // Start login process
  
          // Call the login function from AuthContext
          await login(formData.email, formData.password);
  
          // If login is successful, navigate to the account page
          dispatch(setLoginStatus("succeeded"));
          setFormData({ email: "", password: "" })
          router.push("/my_account"); // Navigate to home or account dashboard
      } catch (error: any) {
          // Handle errors during login
          dispatch(setLoginStatus("failed"));
          dispatch(setError(error.message || "An error occurred"));
          setErrMsg(error.message || "Invalid email or password");
      }
  };
  

    return {
        formData,
        errors,
        errMsg,
        handleChange,
        handleSubmit,
    };
};
