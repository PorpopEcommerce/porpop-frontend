import { useState, useCallback } from "react";
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
import { useAuth } from "@/app/context/AuthContext";
import { useAddProductForm } from "@/app/hooks/useAddProductForm";




const AddProductForm = () => {

  const { formData, handleChange, handleToggle, handleTagsChange, handleUpdateCategories, handleSubmit, } = useAddProductForm();

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
          <ImageUploadField />
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
        <GeolocationForm />
        <LinkedProductForm />
        <DeliveryForm />
        <ShippingForm />
        <DiscountForm />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};



export default AddProductForm;
