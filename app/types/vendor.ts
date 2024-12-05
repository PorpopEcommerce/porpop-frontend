import { Product } from "./product";

export type VendorData = {
  id: string;
  products?: Product[];
  accountNumber: string;
  bankName: string;
  companyId: string;
  phone: string;
  shopName: string;
  shopUrl: string;
  vatId: string;
  createdAt: string;
  updatedAt: string;
}
