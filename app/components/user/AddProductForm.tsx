import { useEffect } from "react";
import ShortDescriptionForm from "./addProductFormComponents/ShortDescriptionForm";
import DescriptionForm from "./addProductFormComponents/DescriptionForm";
import InventoryForm from "./addProductFormComponents/InventoryForm";
import GeolocationForm from "./addProductFormComponents/GeolocationForm";
import ProductTypeForm from "./addProductFormComponents/ProductTypeForm";
import DeliveryForm from "./addProductFormComponents/DeliveryForm";
import ShippingForm from "./addProductFormComponents/ShippingForm";
import PriceForm from "./addProductFormComponents/PriceForm";
import CategoryForm from "./addProductFormComponents/CategoryForm";
import DiscountForm from "./addProductFormComponents/DiscountForm";
import LinkedProductForm from "./addProductFormComponents/LinkedProductForm";
import ImageUploadField from "./addProductFormComponents/ImageUploadField";
import TitleField from "./addProductFormComponents/TitleField";
import TagField from "./addProductFormComponents/TagField";
import { useAddProductForm } from "@/app/hooks/useAddProductForm";
import WholesaleForm from "./addProductFormComponents/WholesaleForm";
import MinMaxForm from "./addProductFormComponents/MinMaxForm";
import ProductOption from "./addProductFormComponents/ProductOption";
import CatalgoForm from "./addProductFormComponents/CatalgoForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import Spinner from "../Spinner";

interface AddProductFormProp {
  productId: string | null;
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
            {/* <CategoryForm
              categories={formData.category_ids}
              onUpdateCategories={handleUpdateCategories}
            /> */}
            {/* <TagField tags={formData.tags} onTagsChange={handleTagsChange} /> */}
          </div>
          {/* <ImageUploadField
            onImageUpload={(imageUrl) => handleImagesChange(imageUrl)}
          /> */}
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
        <GeolocationForm />
        {/* <LinkedProductForm /> */}
        {/* <DeliveryForm
          deliveryTime={formData.delivery_time}
          backorderDeliveryTime={formData.backorderDeliveryTime}
          outOfStockDeliveryTime={formData.outOfStockDeliveryTime}
          onChange={handleChange}
        /> */}
        {/* <ShippingForm
          dimensions={formData.dimensions}
          shippingClass={formData.shippingClass}
          taxStatus={formData.taxStatus}
          taxClass={formData.taxClass}
          isShippingManagementEnabled={formData.isShippingManagementEnabled}
          onChange={handleChange}
        /> */}

        <DiscountForm
          min_quantity_for_discount={formData.min_quantity_for_discount}
          discount_percentage={formData.discount_percentage}
        />

        <WholesaleForm
          minQuantityForWholesale={formData.wholesales_min_order}
          wholesalePrice={formData.wholesales_price}
          onChange={handleChange}
        />

        {/* <MinMaxForm
          minQuantity={formData.min_order || 0}
          maxQuantity={formData.max_order || 0}
          onMinMaxChange={handleMinMaxChange}
        /> */}

        {/* <ProductOption
          productStatusType={formData.product_status}
          visibilityType={formData.visibility}
          onProductStatusTypeChange={(value) =>
            handleChange("product_status", value)
          }
          onVisibilityTypeChange={(value) => handleChange("visibility", value)}
          purchase_note={formData.purchase_note}
          reviewType={formData.allow_review}
          onReviewTypeChange={(value) => handleChange("allow_review", value)}
          onChange={handleChange}
        /> */}

        {/* <CatalgoForm
          productPriceToggle={formData.hide_price}
          addToCartToggle={formData.add_to_cart}
        /> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {isSubmitting ? (
            <div>
              Submitting....
            </div>
          ) : (
            <>{productId ? "Update Product" : "Add Product"}</>
          )}
        </button>

      </form>
    </div>
  );
};

export default AddProductForm;
