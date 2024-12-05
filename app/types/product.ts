export interface Category {
  id: number;
  value: string;
}

export type Product = {
  id: string,
  title: string,
  productType: string,
  price: number,
  discountedPrice: number,
  scheduleDate: boolean,
  scheduledFrom: string,
  scheduledTo: string,
  categories: Category[],
  tags: string[],
  shortDescription: string,
  productDescription: string,
  SKU: string,
  stockType: string,
  allowType: boolean,
  isStockManagementEnabled: boolean,
  stockQuantity: number,
  lowStockThreshold: number,
  createdAt: string,
  updatedAt: string
}
