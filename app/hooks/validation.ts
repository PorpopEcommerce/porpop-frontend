import { z } from "zod";

// Define the registration schema
export const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  username: z.string().optional(),
  email: z.string().email("Invalid email format"),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[@$!%*?&#]/, "Password must include at least one special character"),

});


// Define the vendor registration schema
export const vendorRegisterSchema = z.object({
  shop_name: z.string().min(1, "Shop name is required"),
  shop_url: z.string().min(1, "Shop URL is required"),
  shop_description: z.string().min(1, "Shop description is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  country: z.string().min(1, "Country is required"),
});

// Union of valid field names from both schemas
type FormFieldNames = keyof z.infer<typeof registerSchema> | keyof z.infer<typeof vendorRegisterSchema>;

// Validate a specific field using the appropriate schema
export const validateField = (
  fieldName: FormFieldNames,
  value: string,
  schemaType: "register" | "vendor" = "register" // Default to "register"
): string => {
  // Select the schema based on type
  const schema = schemaType === "vendor" ? vendorRegisterSchema : registerSchema;

  // Type guard to ensure the fieldName exists in the schema's shape
  if (!Object.prototype.hasOwnProperty.call(schema.shape, fieldName)) {
    throw new Error(`Field "${fieldName}" is not defined in the selected schema`);
  }

  // Safely parse the value using the schema's field validator
  const fieldValidator = schema.shape[fieldName as keyof typeof schema.shape];
  const result = (fieldValidator as z.ZodTypeAny).safeParse(value);

  return result.success ? "" : result.error.errors[0].message;
};
