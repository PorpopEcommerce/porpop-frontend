import { useState } from "react";

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

  const handleChange = (
    field: keyof CheckoutForm,
    value: string
  ): void => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Example of a POST request
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const data = await response.json();
      console.log("Checkout successful:", data);

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
