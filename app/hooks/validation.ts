// validation.ts
import { z } from "zod";

// Define a type that includes all the keys of the form schema
type FormFieldNames = "firstName" | "lastName" | "username" | "email" | "password" | "shopName" | "shopDescription" | "city" | "zipCode";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  shopName: z.string().optional(),
  shopDescription: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
});



export const validateField = (fieldName: FormFieldNames, value: string) => {
  const result = registerSchema.shape[fieldName]?.safeParse(value);
  return result && !result.success ? result.error.errors[0].message : "";
};
