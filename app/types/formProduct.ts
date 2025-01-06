export type FormProduct = {
    name: string;
    type: string; 
    price_info: {
      regular_price: number;
      discounted_price: number;
      allow_discount_schedule_date: boolean;
      discount_scheduled_from: string;
      discount_scheduled_to: string;
    }
    // price: number;
    // discountedPrice: number;
    // scheduleDate: boolean;
    // scheduledFrom: string;
    // scheduledTo: string;
    // categories: string[];
    // tags: string[];
    // shortDescription: string;
    // productDescription: string;
    // SKU: string;
    // stockType: string; // Adjust if necessary
    // allowType: boolean;
    // isStockManagementEnabled: boolean;
    // stockQuantity: number;
    // lowStockThreshold: number;
    // shippingMethod: string; // Adjust according to options
    // shippingCost: number;
    // isFreeShippingEnabled: boolean;
    // latitude: string;
    // longitude: string;
    // linkedProducts: string[]; // Array of linked product IDs
    // deliveryOptions: string[]; // Can define more structure if needed
    // deliveryTime: string;
    // discountPercentage: number;
    // discountStartDate: string;
    // discountEndDate: string;
    // images: string; // You can make this an array if there are multiple images
    // createdAt: string;
    // updatedAt: string;
    // backorderDeliveryTime: string;
    // outOfStockDeliveryTime: string;
    // isDiscountEnabled: boolean;
    // minQuantityForDiscount: number;
    // minQuantityForWholesale: number;
    // wholesalePrice: number;
    // isWholesaleEnabled: boolean;
    // productStatusType: string; // Adjust based on the valid statuses
    // visibilityType: string; // Adjust according to the valid values
    // reviewType: boolean;
    // productNote: string;
    // dimensions: { weight: number; height: number; length: number; width: number };
    // shippingClass: string;
    // taxStatus: string;
    // taxClass: string;
    // isShippingManagementEnabled: boolean;
  };
  