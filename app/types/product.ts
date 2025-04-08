export interface ProductAttribute {
  IsGlobal: boolean;
  IsVisible: boolean;
  Name: string;
  ProductAttributeID: string;
  ProductID: string;
  Value: string;
}

export interface ShippingInfo {
  Height: number;
  Length: number;
  ProductID: string;
  ShippingClass: string;
  ShippingID: string;
  Weight: number;
  Width: number;
}



export type Product = {
  AllowBackOrder: boolean;
  AllowDiscountScheduleDate: boolean;
  AllowReview: boolean;
  Attributes: ProductAttribute[];
  BackOrderDeliveryTime: number;
  Categories: string;
  CreatedAt: string;
  DeliveryTime: number;
  Description: string;
  DiscountPercentage: number;
  DiscountScheduledFrom: string;
  DiscountScheduledTo: string;
  DiscountedPrice: number;
  images: string[];
  IsDiscountEnabled: boolean;
  IsDownloadable: boolean;
  IsFeatured: boolean;
  IsImported: boolean;
  IsOnlyOne: boolean;
  IsStockManagementEnabled: boolean;
  IsWholesalesEnabled: boolean;
  LowStockThreshold: number;
  MinQuantityForDiscount: number;
  MinQuantityForWholesales: number;
  name: string;
  id: string;
  ProductNotes: string;
  ProductStatus: string;
  Published: boolean;
  RegionalPricing: null;
  Price: number;
  SKU: string;
  SaleEndDate: string | null;
  SalePrice: number;
  SaleStartDate: string | null;
  ShippingInfo: ShippingInfo;
  Stock: number;
  StockType: string;
  ProductType: string;
  UpdatedAt: string;
  VendorID: string;
  Visibility: boolean;
  WholesalesPrice: number;
};
