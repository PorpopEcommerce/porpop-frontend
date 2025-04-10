"use client";

import DescriptionForm from "./addProductFormComponents/DescriptionForm";
import InventoryForm from "./addProductFormComponents/InventoryForm";
import ProductTypeForm from "./addProductFormComponents/ProductTypeForm";
import ShippingForm from "./addProductFormComponents/ShippingForm";
// import Category from "./addProductFormComponents/Category";
import PriceForm from "./addProductFormComponents/PriceForm";
import DiscountForm from "./addProductFormComponents/DiscountForm";
import TitleField from "./addProductFormComponents/TitleField";
import { useAddProductForm } from "@/app/hooks/useAddProductForm";
import WholesaleForm from "./addProductFormComponents/WholesaleForm";
import ProductOption from "./addProductFormComponents/ProductOption";
// import CatalogForm from "./addProductFormComponents/CatalogForm";
import ImageUploadField from "./addProductFormComponents/ImageUploadField";

interface AddProductFormProp {
  productId?: string | null;
}

const AddProductForm: React.FC<AddProductFormProp> = ({ productId }) => {
  const {
    formData,
    handleChange,
    isSubmitting,
    handleToggle,
    handleSubmit,
    handleImagesChange,
  } = useAddProductForm();

  return (
    <div className="add-product-form">
      <form>
        {/* First Row */}
        <div className="">
          <div className="bg-[#1f2937] p-5 rounded-xl mb-4">
            <TitleField
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <ProductTypeForm
              productType={formData.product_type}
              onProductTypeChange={(value) => handleChange("product_type", value)}
            />

            <DescriptionForm
              productDescription={formData.description}
              onChange={handleChange}
            />

            <ImageUploadField onImageUpload={handleImagesChange} />

            <PriceForm
              price={formData.price}
              discounted_price={formData.discounted_price}
              discount_scheduled_to={formData.discount_scheduled_to}
              discount_scheduled_from={formData.discount_scheduled_from}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <div className="bg-[#1f2937] p-5 rounded-xl mb-4">
          <Category
            selectedCategory={formData.category} // Pass selected category to Category component
            onCategorySelect={(value) => handleChange("category", value)} // Handle category selection
          />{" "}
        </div> */}
        

        <div className="bg-[#1f2937] p-5 rounded-xl mb-4">
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
        </div>

        <div className="bg-[#1f2937] p-5 rounded-xl mb-4">
          <DiscountForm
            min_quantity_for_discount={formData.min_quantity_for_discount}
            discount_percentage={formData.discount_percentage}
            onChange={handleChange}
          />

          <WholesaleForm
            min_quantity_for_wholesales={formData.min_quantity_for_wholesales}
            wholesales_price={formData.wholesales_price}
            onChange={handleChange}
          />

        </div>

        <div className="bg-[#1f2937] p-5 rounded-xl mb-4">
          <ProductOption
            productStatusType={formData.product_status}
            visibilityType={formData.visibility}
            product_notes={formData.product_notes}
            reviewType={formData.allow_review}
            onReviewTypeChange={(value) => handleChange("allow_review", value)}
            onChange={handleChange}
          />

          {/* <CatalogForm
            productPriceToggle={formData.hide_price}
            addToCartToggle={formData.add_to_cart}
            onAddToCartChange={(value) => handleChange("add_to_cart", value)}
            onAllowHidePriceChange={(value) =>
              handleChange("hide_price", value)
            }
          /> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-[#a4cd3a] text-white rounded-md"
          onClick={handleSubmit}
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
