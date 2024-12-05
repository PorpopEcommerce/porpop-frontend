import { VendorData } from "./vendor";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: string[];
  username: string;
  email: string;
  password: string;
  address: string;
  city: string;
  postalcode: string;
  phone: string;
  country: string;
  vendorData?: VendorData;
  isAuthenticated: boolean;
  createdAt: string;
  updatedAt: string;
}
