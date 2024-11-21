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

export const useVendorRegistration = (userId: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({}); // Clear all errors initially
    try {
      // Validate the form data
      vendorSchema.parse(formData);

      // Fetch users and update vendor details
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((user: any) => user.id === userId);

      if (userIndex === -1) throw new Error("User not found");

      // Update user role to include "vendor" if it's not already present
      const user = users[userIndex];
      const updatedRole =
        Array.isArray(user.role) && user.role.includes("vendor")
          ? user.role // No changes if "vendor" is already present
          : [...(Array.isArray(user.role) ? user.role : [user.role]), "vendor"];

      // Update user data with vendor details
      users[userIndex] = {
        ...user,
        role: updatedRole,
        vendorData: formData,
      };

      localStorage.setItem("users", JSON.stringify(users));

      setSubmitSuccess(true);
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
