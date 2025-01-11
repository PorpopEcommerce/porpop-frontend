"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import ProductContent from "./ProductContent";
import Spinner from "@/app/components/Spinner";

import axios from "axios";
import { Product } from "@/app/types/product";

interface ProductListProps {
  // product: Product[]
  handleEditClick: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ handleEditClick, }) => {
  const { vendor } = useAuth();

  // Local state management
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vendor?.vendor_id) {
      return;
    }

    const fetchVendorProducts = async () => {
      setStatus("loading");
      setError(null); // Reset error before fetching

      try {
        const response = await axios.get(
          `https://backend-porpop.onrender.com/api/v1/products/vendor?vendor_id=${vendor.vendor_id}`,
        );
        setVendorProducts(response.data.products || []);
        console.log(vendorProducts)
        setStatus("succeeded");
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch products by vendor.");
        setStatus("failed");
      }
    };

    fetchVendorProducts();
  }, [vendor?.vendor_id]);





  return (
    <div className="flex-1">
      {status === "loading" && (
        <div>
          <Spinner />
        </div>
      )}

      {/* {status === "failed" && <p className="text-red-500">Error: {error}</p>} */}

      {status === "succeeded" && (
        <>
          {vendorProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-11 text-xs gap-4 pb-2 items-center mt-8">
                <div>IMAGE</div>
                <div className="col-span-2 justify-self-start">NAME</div>
                <div className="justify-self-start">STATUS</div>
                <div className="justify-self-start">SKU</div>
                <div className="justify-self-start">STOCK</div>
                <div className="justify-self-start">PRICE</div>
                <div className="justify-self-start">TYPE</div>
                <div className="justify-self-start">VIEWS</div>
                <div className="justify-self-start">DATE</div>
              </div>

              <div>
                {vendorProducts.map((item) => (
                  <ProductContent
                    key={item.ProductID}
                    item={item}
                    handleEditClick={handleEditClick}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center mt-[150px]">
              <div>
                <p className="text-sm text-gray-500 text-center mt-3">
                  No Products Found!! Ready to start selling something awesome? Add a product now!.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
