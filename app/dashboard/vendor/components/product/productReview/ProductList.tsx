"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByVendorId } from "@/app/redux/features/products/productSlice";
import { RootState, AppDispatch } from "@/app/redux/store";
import { useAuth } from "@/app/context/AuthContext";
import ProductContent from "./ProductContent";
import Spinner from "@/app/components/Spinner";

interface ProductListProps {
  handleEditClick: (productId: string) => void;
  handleDeleteClick: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ handleEditClick, handleDeleteClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status} = useSelector(
    (state: RootState) => state.products
  );
  const { vendor } = useAuth();

  // Fetch products by vendor ID when the vendor ID changes
  useEffect(() => {
    if (vendor?.vendor_id) {
      dispatch(fetchProductByVendorId(vendor.vendor_id));
    }
  }, [dispatch, vendor?.vendor_id]);



  return (
    <div className="flex-1">
      {status === "loading" && (
        <div>
          <Spinner />
        </div>
      )}

      {/* {status === "failed" && <p>Error: {error}</p>} */}

      {status === "succeeded" && (
        <>
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-11 text-xs gap-4 pb-2 items-center mt-8">
                <div>IMAGE</div>
                <div className="col-span-2 justify-self-start">NAME</div>
                <div className="justify-self-start">STATUS</div>
                <div className="justify-self-start"></div>
                <div className="justify-self-start">SKU</div>
                <div className="justify-self-start">STOCK</div>
                <div className="justify-self-start">PRICE</div>
                <div className="justify-self-start">TYPE</div>
                <div className="justify-self-start">VIEWS</div>
                <div className="justify-self-start">DATE</div>
              </div>

              <div>
                {products.map((item) => (
                  <ProductContent
                    key={item.ProductID}
                    item={item}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center mt-[150px]">
              <div>
                <p className="text-sm text-gray-500 text-center mt-3">
                  No Products Found!!.
                </p>
                <p className="text-sm text-gray-500 text-center mt-3">
                  Ready to start selling something awesome? Add a product now!.
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
