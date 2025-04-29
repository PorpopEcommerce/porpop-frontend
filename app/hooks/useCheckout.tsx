import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Product } from "../checkout/page";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

type CheckoutForm = {
  country: string;
  state: string;
  city: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  postalCode?: string;
};

type CheckoutError = {
  [key in keyof CheckoutForm]?: string;
};

const useCheckout = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

  const [form, setForm] = useState<CheckoutForm>({
    country: "Nigeria",
    state: "",
    city: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    postalCode: "",
  });

  const { user } = useAuth();
  const router = useRouter();

  const [errors, setErrors] = useState<CheckoutError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: CheckoutError = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format.";
    if (!form.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required.";
    if (!form.streetAddress.trim())
      newErrors.streetAddress = "Street address is required.";
    if (!form.state.trim()) newErrors.state = "State is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof CheckoutForm, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const createOrder = async (
    token: string,
    orderData: any
  ): Promise<string | null> => {
    try {
      const response = await axios.post(`${BASE_URL}/v1/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Order creation response:", response.data);
  
      const id = response.data?.body?.id;
      if (id) {
        return id;
      } else {
        toast.error("Order ID not found in order details.");
        return null;
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to create order.");
      return null;
    }
  };
  
  const handleSubmit = async (products: Product[], subtotal: number) => {
    const token = Cookies.get("access_token");
    if (!token) {
      toast.error("No User found. Please login.");
      return;
    }
  
    if (!validate()) return;
  
    setIsSubmitting(true);
  
    
    const orderData = {
      buyer_id: user.id,
      vendor_id: "bb3c394e-98e8-43a2-aee1-317e39120dea",
      orderItems: products.map((product) => ({
        productID: product.id,
        quantity: Number(product.quantity),
        price: product.price
      })),
      total_amount: subtotal, 
      shipping_address: form.streetAddress, 
      payment_method: "paystack", 
      status: "pending"
    };
  
    console.log("Sending order data:", orderData);
    
    const id = await createOrder(token, orderData);
  
    if (!id) {
      setIsSubmitting(false);
      return;
    }
  
    const paymentRequest = {
      user_id: user.id,
      gateway: "paystack",
      email: form.email,
      order_id: id,
    };
  
    console.log("Sending payment request:", paymentRequest);
    
    try {
      const response = await fetch(`${BASE_URL}/v1/payments/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentRequest),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Payment initialization failed:", errorData);
        throw new Error("Payment initialization failed");
      }
  
      const data = await response.json();
      console.log("Payment initialization response:", data);
  
      if (data.body?.payment_url) {
        router.push(data.body.payment_url);
      } else {
        toast.error("Payment URL not found.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    form,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useCheckout;