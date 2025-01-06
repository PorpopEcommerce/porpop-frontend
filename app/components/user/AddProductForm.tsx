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

interface AddProductFormProp {
  productId: string | null;
}


const AddProductForm: React.FC<AddProductFormProp> = ({ productId }) => {

  const { formData, setFormData, handleChange, handleToggle, handleUpdateCategories, handleSubmit, handleImagesChange } = useAddProductForm();



  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        {/* First Row */}
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <TitleField value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
            <ProductTypeForm
              productType={formData.type}
              onProductTypeChange={(value) => handleChange("type", value)}
            />
            <PriceForm
              price={formData.price_info}
              onChange={handleChange}
              onScheduleToggle={() => handleToggle("scheduleDate")}
            />
            {/* <CategoryForm
              categories={formData.categories}
              onUpdateCategories={handleUpdateCategories}
            /> */}
            {/* <TagField tags={formData.tags} onTagsChange={handleTagsChange} /> */}
          </div>
          {/* <ImageUploadField onImageUpload={(imageUrl) => handleImagesChange(imageUrl)} /> */}

        </div>

        {/* Description Fields */}
        {/* <ShortDescriptionForm
          shortDescription={formData.shortDescription}
          onChange={handleChange}
        />
        <DescriptionForm
          productDescription={formData.productDescription}
          onChange={handleChange}
        /> */}

        {/* Inventory Management */}
        {/* <InventoryForm
          stockType={formData.stockType}
          allowType={formData.allowType}
          isStockManagementEnabled={formData.isStockManagementEnabled}
          onStockTypeChange={(value) => handleChange("stockType", value)}
          onAllowTypeChange={(value) => handleChange("allowType", value)}
          onStockManagementToggle={() => handleToggle("isStockManagementEnabled")}
          stockQuantity={formData.stockQuantity}
          lowStockThreshold={formData.lowStockThreshold}
          onStockQuantityChange={(value) => handleChange("stockQuantity", value)}
          onLowStockThresholdChange={(value) => handleChange("lowStockThreshold", value)}
        /> */}


        {/* Other Fields */}
        {/* <GeolocationForm />
        <LinkedProductForm /> */}
        {/* <DeliveryForm
          deliveryTime={formData.deliveryTime}
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

        {/* <DiscountForm
          minQuantityForDiscount={formData.minQuantityForDiscount}
          discountPercentage={formData.discountPercentage}
          onChange={handleChange}
        /> */}

        {/* <WholesaleForm
          minQuantityForWholesale={formData.minQuantityForWholesale}
          wholesalePrice={formData.wholesalePrice}
          onChange={handleChange} /> */}

        {/* <MinMaxForm />

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

        <CatalgoForm /> */}

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
