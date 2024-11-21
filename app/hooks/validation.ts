// validation.ts
import { z } from "zod";

// Define a type that includes all the keys of the form schema
type FormFieldNames =
  | "firstName"
  | "lastName"
  | "username"
  | "email"
  | "password"
  | "address"
  | "city"
  | "country"
  | "phone"
  | "postalcode";

// Define the registration schema
export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().min(1, "Please enter a valid address"),
  city: z.string().min(1, "Please enter a valid city name"),
  country: z.string().min(1, "Please select a country code"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
  postalcode: z.string().min(4, "Postal code must be at least 4 characters"),
});

// Validate a specific field
export const validateField = (fieldName: FormFieldNames, value: string) => {
  const result = registerSchema.shape[fieldName]?.safeParse(value);
  return result && !result.success ? result.error.errors[0].message : "";
};
