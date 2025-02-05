"use client";

import { useState, useEffect } from "react";
import Button from "@/app/components/product/Button";
import { Product } from "@/app/types/product";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";

interface ProductHeaderProp {
  handleAddProductClick: () => void;
  handleViewProductClick: () => void;
  handleImportAliProduct: () => void;
}

const ProductHeader: React.FC<ProductHeaderProp> = ({
  handleAddProductClick,
  handleViewProductClick,
  handleImportAliProduct,
}) => {
  const { vendor } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    all: 0,
    online: 0,
    draft: 0,
    inStock: 0,
  });

  useEffect(() => {
    if (!vendor?.vendor_id) {
      return;
    }

    const fetchVendorProducts = async () => {
      setStatus("loading");
      setError(null); // Reset error before fetching

      try {
        const response = await axios.get(
          `https://backend-porpop.onrender.com/api/v1/products/vendor?vendor_id=${vendor.vendor_id}`
        );
        const products = response.data.products || [];
        console.log(products);
        setStatus("succeeded");

        // Calculate counts dynamically
        setCounts({
          all: products.length,
          online: products.filter(
            (product: any) => product?.ProductStatus === "Online"
          ).length,
          draft: products.filter(
            (product: any) => product?.ProductStatus === "Draft"
          ).length,
          inStock: products.filter((product: any) => product.Stock > 0).length,
        });
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch products by vendor."
        );
        setStatus("failed");
      }
    };

    fetchVendorProducts();
  }, [vendor?.vendor_id]);

  return (
    <>
      <div className="flex justify-between mb-3">
        <div>
          <ul className="flex gap-2 items-center text-sm text-[#84788c]">
            <li className="cursor-pointer" onClick={handleViewProductClick}>
              All ({counts.all})
            </li>
            <li>Online ({counts.online})</li>
            <li>Draft ({counts.draft})</li>
            <li>In Stock ({counts.inStock})</li>
          </ul>
        </div>
        <div className="flex items-end gap-4">
          <button
            className="max-w-[fit-content] text-sm hover:text-gray-400"
            onClick={handleAddProductClick}
          >
            + Add Product
          </button>
          <button
            className="max-w-[fit-content] text-sm hover:text-gray-400"
            onClick={handleImportAliProduct}
          >
            Import Product from AliExpress
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductHeader;
