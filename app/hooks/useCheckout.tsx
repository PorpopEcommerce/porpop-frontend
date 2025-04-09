import { useEffect, useState } from "react";
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
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isOrderLoading, setIsOrderLoading] = useState(true); // new

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
  
      const id = response.data?.body?.order_id;
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
      products: products.map((product) => ({
        product_id: product.id,
        quantity: Number(product.quantity),
        price: Number(product.price),
      })),
      total_amount: subtotal,
      shipping_address: form.streetAddress,
      payment_method: "paystack",
    };
  
    const id = await createOrder(token, orderData);
  
    if (!id) {
      setIsSubmitting(false);
      return;
    }
  
    const paymentRequest = {
      user_id: user.id,
      amount: subtotal,
      gateway: "paystack",
      email: form.email,
      order_id: id,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/v1/payments/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentRequest),
      });
  
      if (!response.ok) throw new Error("Payment initialization failed");
  
      const data = await response.json();
  
      if (data.payment?.payment_url) {
        router.push(data.payment.payment_url);
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

  const verifyAndCreateShipping = async (reference: string, gateway: string) => {
    const token = Cookies.get("access_token");
  
    if (!reference || !gateway || !token) return;
  
    try {
      // Step 1: Verify payment
      const verifyRes = await axios.get(`${BASE_URL}/v1/payments/verify`, {
        params: { reference, gateway },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const payment = verifyRes.data?.payment;
  
      if (payment?.status === "success") {
        const orderId = payment?.order_id;
  
        // Step 2: Create shipping
        const shippingRes = await axios.post(`${BASE_URL}/v1/shipping/${orderId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        toast.success("Shipping created successfully.");
        return { success: true, orderId };
      } else {
        toast.error("Payment failed or not verified.");
        return { success: false };
      }
    } catch (error) {
      console.error("Error verifying payment or creating shipping:", error);
      toast.error("Something went wrong post-payment.");
      return { success: false };
    }
  };
  

  return {
    form,
    errors,
    isSubmitting,
    handleChange,
    verifyAndCreateShipping,
    handleSubmit,
  };
};



export default useCheckout;
