import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FormProduct } from "../types/formProduct";

export const useAddProductForm = () => {
  const initialProduct: FormProduct = {
    name: "",
    type: "",
    regular_price: 0,
    discounted_price: 0,
    discount_scheduled_from: "",
    discount_scheduled_to: "",
    same_as_store: true,
    longitude: 0,
    latitude: 0,
    override_option: false,
    rma_type: "exchange",
    rma_label: "30-day exchange",
    rma_length: "30",
    rma_length_value: 0,
    rma_length_duration: "days",
    rma_policy: "Items can be returned within 30 days.",
    refund_reason: "Defective product",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    shipping_class: "",
    tax_class: "",
    tax_status: "",
    allow_wholesales: true,
    wholesales_price: 0,
    wholesales_min_order: 0,
    virtual: false,
    downloadable: false,
    description: "",
    short_desc: "",
    discount_percentage: 0,
    min_quantity_for_discount: 0,
    allow_review: false,
    min_order: 0,
    max_order: 0,
    product_status: "",
    visibility: "",
    purchase_note: "",
    is_published: false,
    add_to_cart: false,
    hide_price: false,
    is_addon_enabled: true,
    addon_cost: 0,
    addon_length: 0,
    addon_duration: "days",
    stock: 0,
    is_stock_management_enabled: false,
    low_stock_threshold: 0,
    allow_back_order: false,
    stock_type: "",
    is_only_one: false,
    image_urls: [""],
  };

  const { vendor } = useAuth();
  const transformToRequestBody = (initialProduct: FormProduct) => {
    return {
      vendor_id: vendor.vendor_id, // Static or fetched from context/state
      type: initialProduct.type,
      name: initialProduct.name,
      // virtual: initialProduct.virtual,
      // downloadable: initialProduct.downloadable,
      description: initialProduct.description,
      short_desc: initialProduct.short_desc,
      discount_percentage: initialProduct.discount_percentage,
      min_quantity_for_discount: initialProduct.min_quantity_for_discount,
      weight: initialProduct.weight,
      length: initialProduct.length,
      width: initialProduct.width,
      allow_review: initialProduct.allow_review,
      min_order: initialProduct.min_order,
      max_order: initialProduct.max_order,
      product_status: initialProduct.product_status,
      visibility: initialProduct.visibility,
      purchase_note: initialProduct.purchase_note,
      // is_published: initialProduct.is_published,
      price_info: {
        regular_price: initialProduct.regular_price,
        discounted_price: initialProduct.discounted_price,
        discount_scheduled_from: initialProduct.discount_scheduled_from,
        discount_scheduled_to: initialProduct.discount_scheduled_to,
      },
      wholesale: {
        allow_wholesales: initialProduct.allow_wholesales,
        wholesales_price: initialProduct.wholesales_price,
        wholesales_min_order: initialProduct.wholesales_min_order,
      },
      catalog: {
        add_to_cart: initialProduct.add_to_cart,
        hide_price: initialProduct.hide_price,
      },
      // addson: {
      //   is_addson_enabled: initialProduct.is_addon_enabled,
      //   addson_cost: initialProduct.addon_cost,
      //   addson_lenght: initialProduct.addon_length,
      //   addson_duration: initialProduct.addon_duration,
      // },
      stock_info: {
        stock: initialProduct.stock,
        is_stock_management_enabled: initialProduct.is_stock_management_enabled,
        low_stock_threshold: initialProduct.low_stock_threshold,
        // allow_back_order: initialProduct.allow_back_order,
        stock_type: initialProduct.stock_type,
        is_only_one: initialProduct.is_only_one,
      },
      image_urls: initialProduct.image_urls,
      // category_ids: ["d1c7c5c7-5086-4e3a-a6c5-3457f3e6e5a1"],
      // tag_ids: ["f1b1e2d3-4567-4e8a-9123-567c9b0a8a6c"],
      // attributes: [
      //   { name: "Material", value: "100% Cotton" },
      //   { name: "Color", value: "Black" },
      //   { name: "Size", value: "Medium" },
      // ],
      // geo_info: {
      //   same_as_store_add: initialProduct.same_as_store,
      //   longitude: initialProduct.longitude,
      //   latitude: initialProduct.latitude,
      // },
      // rma_info: {
      //   override_option: initialProduct.override_option,
      //   rma_type: initialProduct.rma_type,
      //   rma_label: initialProduct.rma_label,
      //   rma_lenght: "Limited",
      //   rma_lenght_value: initialProduct.rma_length_value,
      //   rma_lenght_duration: initialProduct.rma_length_duration,
      //   rma_policy: initialProduct.rma_policy,
      //   refund_reason: initialProduct.refund_reason,
      // },
      height: initialProduct.height,
      shipping_class: initialProduct.shipping_class,
      tax_class: initialProduct.tax_class,
      tax_status: initialProduct.tax_status,
    };
  };

  const [formData, setFormData] = useState<FormProduct>(initialProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generalized change handler
  const handleChange = (field: keyof FormProduct, value: any) => {
    setFormData((prev) => {
      if (prev[field] === value) return prev; // Avoid redundant updates
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleToggle = (field: keyof FormProduct) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleImagesChange = (files: File[]) => {
    const imageUrls = files.map((file) => URL.createObjectURL(file)); // Convert files to preview URLs (for frontend use)

    setFormData((prev) => ({
      ...prev,
      image_urls: imageUrls, // Store the image URLs in formData
    }));
  };

  const handleMinMaxChange = (
    field: "minQuantity" | "maxQuantity",
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // const handleTagsChange = (tags: string[]) => handleChange("tags", tags);

  const handleUpdateCategories = useCallback((updatedCategories: any) => {
    setFormData((prev) => ({ ...prev, categories: updatedCategories }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true); // Optional: Set loading state

      try {
        // Log the data for debugging
        console.log("Form Data before submission:", formData);

        const requestBody = transformToRequestBody(formData);

        // Send the request to the API
        const response = await fetch(
          "https://backend-porpop.onrender.com/api/v1/product/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        // Check if the response is successful
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error Response:", errorData);
          alert("Error creating product: " + errorData.message); // Display error message
          return;
        }

        // Parse the response
        const responseData = await response.json();
        console.log("Product created successfully:", responseData);

        // Reset the form or provide feedback
        setFormData(initialProduct);
        setIsSuccess(true);
        alert("Product created successfully!");
      } catch (error) {
        console.error("Submission error:", error);
        alert("An error occurred while creating the product.");
      } finally {
        setIsSubmitting(false); // Reset loading state
      }
    },
    [formData, initialProduct]
  );

  return {
    formData,
    setFormData,
    isSubmitting,
    isSuccess,
    handleChange,
    handleToggle,
    // handleTagsChange,
    handleMinMaxChange,
    handleUpdateCategories,
    handleImagesChange,
    handleSubmit,
  };
};
