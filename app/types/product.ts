export interface Category {
  id: number;
  value: string;
}

interface Dimension {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export type Product = {
  id: string;
  title: string;
  productType: string;
  price: number;
  discountedPrice: number;
  scheduleDate: boolean;
  scheduledFrom: string;
  scheduledTo: string;
  categories: Category[];
  tags: string[];
  shortDescription: string;
  productDescription: string;
  SKU: string;
  stockType: string;
  allowType: boolean;
  isStockManagementEnabled: boolean;
  stockQuantity: number;
  lowStockThreshold: number;
  shippingMethod: string;
  shippingCost: number;
  isFreeShippingEnabled: boolean;
  latitude: string;
  longitude: string;
  linkedProducts: string[];
  deliveryOptions: string[];
  deliveryTime: string;
  backorderDeliveryTime: string;
  outOfStockDeliveryTime: string;
  discountPercentage: number;
  discountStartDate: string;
  discountEndDate: string;
  images: string;
  isDiscountEnabled: false;
  minQuantityForDiscount: number;
  isWholesaleEnabled: false;
  minQuantityForWholesale: number;
  wholesalePrice: number;
  visibilityType: string;
  productStatusType: string;
  productNote: string;
  reviewType: boolean;
  dimensions: {
    weight: number;
    length: number;
    width: number;
    height: number;
  };
  shippingClass: string;
  taxStatus: string;
  taxClass: string;
  isShippingManagementEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};
