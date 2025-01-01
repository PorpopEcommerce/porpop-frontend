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
import { fetchProducts } from "@/app/redux/features/products/productSlice";

interface AddProductFormProp {
  productId: string | null;
}


const AddProductForm: React.FC<AddProductFormProp> = ({ productId }) => {

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  const { formData, setFormData, handleChange, handleToggle, handleTagsChange, handleUpdateCategories, handleSubmit, handleImagesChange } = useAddProductForm();

  useEffect(() => {
    if (productId) {
      const product = products.find((prod) => prod.id === productId);
      if (product) {
        setFormData(product); // Pre-fill form with product data
      }
    }
  }, [productId, products]);

  useEffect(() => {
    dispatch(fetchProducts()); // Ensure products are loaded
  }, [dispatch]);

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        {/* First Row */}
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <TitleField value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
            <ProductTypeForm
              productType={formData.productType}
              onProductTypeChange={(value) => handleChange("productType", value)}
            />
            <PriceForm
              price={formData.price}
              discountedPrice={formData.discountedPrice}
              scheduleDate={formData.scheduleDate}
              scheduledFrom={formData.scheduledFrom}
              scheduledTo={formData.scheduledTo}
              onChange={handleChange}
              onScheduleToggle={() => handleToggle("scheduleDate")}
            />
            <CategoryForm
              categories={formData.categories}
              onUpdateCategories={handleUpdateCategories}
            />
            <TagField tags={formData.tags} onTagsChange={handleTagsChange} />
          </div>
          <ImageUploadField onImageUpload={(imageUrl) => handleImagesChange(imageUrl)} />

        </div>

        {/* Description Fields */}
        <ShortDescriptionForm
          shortDescription={formData.shortDescription}
          onChange={handleChange}
        />
        <DescriptionForm
          productDescription={formData.productDescription}
          onChange={handleChange}
        />

        {/* Inventory Management */}
        <InventoryForm
          SKU={formData.SKU}
          stockType={formData.stockType}
          allowType={formData.allowType}
          isStockManagementEnabled={formData.isStockManagementEnabled}
          onSKUChange={(value) => handleChange("SKU", value)}
          onStockTypeChange={(value) => handleChange("stockType", value)}
          onAllowTypeChange={(value) => handleChange("allowType", value)}
          onStockManagementToggle={() => handleToggle("isStockManagementEnabled")}
          stockQuantity={formData.stockQuantity}
          lowStockThreshold={formData.lowStockThreshold}
          onStockQuantityChange={(value) => handleChange("stockQuantity", value)}
          onLowStockThresholdChange={(value) => handleChange("lowStockThreshold", value)}
        />


        {/* Other Fields */}
        {/* <GeolocationForm />
        <LinkedProductForm /> */}
        <DeliveryForm
          deliveryTime={formData.deliveryTime}
          backorderDeliveryTime={formData.backorderDeliveryTime}
          outOfStockDeliveryTime={formData.outOfStockDeliveryTime}
          onChange={handleChange}
        />
        <ShippingForm
          dimensions={formData.dimensions}
          shippingClass={formData.shippingClass}
          taxStatus={formData.taxStatus}
          taxClass={formData.taxClass}
          isShippingManagementEnabled={formData.isShippingManagementEnabled}
          onChange={handleChange}
        />

        <DiscountForm
          minQuantityForDiscount={formData.minQuantityForDiscount}
          discountPercentage={formData.discountPercentage}
          onChange={handleChange}
        />

        <WholesaleForm
          minQuantityForWholesale={formData.minQuantityForWholesale}
          wholesalePrice={formData.wholesalePrice}
          onChange={handleChange} />

        <MinMaxForm />

        <ProductOption
          productStatusType={formData.productStatusType}
          visibilityType={formData.visibilityType}
          onProductStatusTypeChange={(value) => handleChange("productStatusType", value)}
          onVisibilityTypeChange={(value) => handleChange("visibilityType", value)}
          productNote={formData.productNote}
          reviewType={formData.reviewType}
          onReviewTypeChange={(value) => handleChange("reviewType", value)}
          onChange={handleChange}
        />

        <CatalgoForm />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {productId ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};



export default AddProductForm;
