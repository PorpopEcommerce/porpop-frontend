"use client";

import { useState, useEffect } from "react";
import Button from "@/app/components/product/Button";
import { Product } from "@/app/types/product";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import AliExpressImportModal from "@/app/dashboard/vendor/components/AliExpressImportModal"; // Adjust the path as needed

interface ProductHeaderProp {
  handleAddProductClick: () => void;
  handleImportClick: () => void;
  handleExportClick: () => void;
  handleViewProductClick: () => void;
}

const ProductHeader: React.FC<ProductHeaderProp> = ({
  handleAddProductClick,
  handleImportClick,
  handleExportClick,
  handleViewProductClick,
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
        console.log(products)
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
      <div className="grid grid-cols-2 gap-5 mb-3">
        <div>
          <ul className="flex gap-2 items-center text-sm text-[#84788c]">
            <li className="cursor-pointer" onClick={handleViewProductClick}>All ({counts.all})</li>
            <li>Online ({counts.online})</li>
            <li>Draft ({counts.draft})</li>
            <li>In Stock ({counts.inStock})</li>
          </ul>
        </div>
        <div className="flex flex-col items-end gap-4">
          <Button
            label="Add Product"
            custom="max-w-[fit-content] bg-red-700 border-red-700"
            onClick={handleAddProductClick}
          />

          <Button
            label="Import Product from AliExpress"
            custom="max-w-[fit-content] bg-red-700 border-red-700"
            onClick={() => setModalOpen(true)}
          />
          <div className="flex gap-3">
            <Button
              label="Import AliExpress settings"
              custom="max-w-[fit-content] bg-red-700 border-red-700"
            />
            <Button
              label="Import"
              custom="max-w-[fit-content] bg-red-700 border-red-700"
              onClick={handleImportClick}
            />
            <Button
              label="Export"
              custom="max-w-[fit-content] bg-red-700 border-red-700"
              onClick={handleExportClick}
            />
          </div>
        </div>
      </div>

      {/* AliExpress Import Modal */}
      <AliExpressImportModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProductHeader;
