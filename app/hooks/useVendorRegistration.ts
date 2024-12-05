import axios from "axios";
import { useState } from "react";
import { z } from "zod";

const vendorSchema = z.object({
  shopName: z.string().nonempty("Shop Name is required"),
  shopUrl: z.string().nonempty("Shop Url is required"),
  phone: z.string().nonempty("Phone Number is required"),
  companyId: z.string().nonempty("Company ID is required"),
  vatId: z.string().nonempty("VAT/TAX ID is required"),
  bankName: z.string().nonempty("Bank Name is required"),
  accountNumber: z.string().nonempty("Account / IBAN is required"),
});

type FormData = z.infer<typeof vendorSchema>;

export const useVendorRegistration = (userId: number) => {
  const [formData, setFormData] = useState<FormData>({
    shopName: "",
    shopUrl: "",
    phone: "",
    companyId: "",
    vatId: "",
    bankName: "",
    accountNumber: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" })); // Clear field error
  };

  const generateUniqueId = () => {
    return Date.now().toString();
  };

  const getCurrentTimestamp = () => {
    return new Date().toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({}); // Clear all errors initially
  
    try {
      // Validate the form data
      vendorSchema.parse(formData);
  
      // Fetch user data
      const url = `http://localhost:3001/users/${userId}`
      const response = await axios.get(url);
  
      if (!response.data) {
        throw new Error("User not found");
      }
  
      const user = response.data;
  
      // Check and update roles
      const updatedRole =
        Array.isArray(user.role) && user.role.includes("vendor")
          ? user.role
          : [...(Array.isArray(user.role) ? user.role : [user.role]), "vendor"];
  
      // Add unique ID, createdAt, and updatedAt to the vendorData
      const updatedVendorData = {
        ...formData,
        id: generateUniqueId(),
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
      };
  
      // Update user data
      const updatedUser = {
        ...user,
        role: updatedRole,
        vendorData: updatedVendorData,
      };
  
      // Send updated user data
      const updateResponse = await axios.put(
        `http://localhost:3001/users/${userId}`,
        updatedUser
      );
  
      if (updateResponse.status !== 200) {
        throw new Error("Failed to update user data");
      }
  
      setSubmitSuccess(true);
      setFormData({
        shopName: "",
        shopUrl: "",
        phone: "",
        companyId: "",
        vatId: "",
        bankName: "",
        accountNumber: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length) {
            errors[err.path[0]] = err.message;
          }
        });
        setFormErrors(errors);
      } else {
        console.error(error);
      }
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };


  return {
    formData,
    formErrors,
    isSubmitting,
    submitSuccess,
    handleInputChange,
    handleSubmit,
  };
};


