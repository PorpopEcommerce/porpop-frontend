import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Product } from "../types/product";
import { useRouter } from "next/navigation";

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

  const transformToRequestBody = (
    form: CheckoutForm,
    products: any[],
    subtotal: number
  ) => {
    return {
      order: {
        buyer_id: user.user_id,
        total_amount: subtotal,
        shipping_address: form.streetAddress,
        first_name: form.firstName,
        last_name: form.lastName,
        country: form.country,
        address: form.streetAddress,
        postal_code: form.postalCode,
        email: form.email,
      },
      items: products.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
    };
  };

  const handleSubmit = async (products: any[], subtotal: number) => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Example of a POST request
      const requestBody = transformToRequestBody(form, products, subtotal);

      const response = await fetch(
        "https://backend-porpop.onrender.com/api/v1/order/create?gatewayType=paystack",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const data: { payment: any } = await response.json();
      console.log("Checkout successful:", data);

      if (data.payment.payment_url) {
        // Redirect to the payment gateway
        router.push(data.payment.payment_url);
      } else {
        throw new Error("Payment URL not received from the backend");
      }

      // Handle success (e.g., redirect to confirmation page)
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout.");
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
