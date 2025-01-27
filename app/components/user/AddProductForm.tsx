"use client";

import ShortDescriptionForm from "./addProductFormComponents/ShortDescriptionForm";
import DescriptionForm from "./addProductFormComponents/DescriptionForm";
import InventoryForm from "./addProductFormComponents/InventoryForm";
import GeolocationForm from "./addProductFormComponents/GeolocationForm";
import ProductTypeForm from "./addProductFormComponents/ProductTypeForm";
import ShippingForm from "./addProductFormComponents/ShippingForm";
import PriceForm from "./addProductFormComponents/PriceForm";
import DiscountForm from "./addProductFormComponents/DiscountForm";
import TitleField from "./addProductFormComponents/TitleField";
import { useAddProductForm } from "@/app/hooks/useAddProductForm";
import WholesaleForm from "./addProductFormComponents/WholesaleForm";
import MinMaxForm from "./addProductFormComponents/MinMaxForm";
import ProductOption from "./addProductFormComponents/ProductOption";
import CatalogForm from "./addProductFormComponents/CatalogForm";

interface AddProductFormProp {
  productId?: string | null;
}

const AddProductForm: React.FC<AddProductFormProp> = ({ productId }) => {
  const {
    formData,
    setFormData,
    handleChange,
    isSubmitting,
    handleToggle,
    handleUpdateCategories,
    handleSubmit,
    handleImagesChange,
    handleMinMaxChange,
  } = useAddProductForm();

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        {/* First Row */}
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <TitleField
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <ProductTypeForm
              productType={formData.type}
              onProductTypeChange={(value) => handleChange("type", value)}
            />
            <PriceForm
              regular_price={formData.regular_price}
              discounted_price={formData.discounted_price}
              discount_scheduled_to={formData.discount_scheduled_to}
              discount_scheduled_from={formData.discount_scheduled_from}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description Fields */}
        <ShortDescriptionForm
          shortDescription={formData.short_desc}
          onChange={handleChange}
        />
        <DescriptionForm
          productDescription={formData.description}
          onChange={handleChange}
        />

        {/* Inventory Management */}
        <InventoryForm
          stockType={formData.stock_type}
          allowType={formData.is_only_one}
          isStockManagementEnabled={formData.is_stock_management_enabled}
          onStockTypeChange={(value) => handleChange("stock_type", value)}
          onAllowTypeChange={(value) => handleChange("is_only_one", value)}
          onStockManagementToggle={() =>
            handleToggle("is_stock_management_enabled")
          }
          stockQuantity={formData.stock}
          lowStockThreshold={formData.low_stock_threshold}
          onStockQuantityChange={(value) => handleChange("stock", value)}
          onLowStockThresholdChange={(value) =>
            handleChange("low_stock_threshold", value)
          }
        />

        {/* Other Fields */}
        {/* <GeolocationForm /> */}
        <ShippingForm
          weight={formData.weight}
          length={formData.length}
          width={formData.width}
          height={formData.height}
          shippingClass={formData.shipping_class}
          taxStatus={formData.tax_status}
          taxClass={formData.tax_class}
          onChange={handleChange}
        />

        <DiscountForm
          min_quantity_for_discount={formData.min_quantity_for_discount}
          discount_percentage={formData.discount_percentage}
          onChange={handleChange}
        />

        <WholesaleForm
          wholesales_min_order={formData.wholesales_min_order}
          wholesales_price={formData.wholesales_price}
          onChange={handleChange}
        />

        <MinMaxForm
          max_order={formData.max_order}
          min_order={formData.min_order}
          onChange={handleChange}
        />

        <ProductOption
          productStatusType={formData.product_status}
          visibilityType={formData.visibility}
          purchase_note={formData.purchase_note}
          reviewType={formData.allow_review}
          onReviewTypeChange={(value) => handleChange("allow_review", value)}
          onChange={handleChange}
        />

        <CatalogForm
          productPriceToggle={formData.hide_price}
          addToCartToggle={formData.add_to_cart}
          onAddToCartChange={(value) => handleChange("add_to_cart", value)}
          onAllowHidePriceChange={(value) => handleChange("hide_price", value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {isSubmitting ? (
            <div>Submitting....</div>
          ) : (
            <>{productId ? "Update Product" : "Add Product"}</>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
