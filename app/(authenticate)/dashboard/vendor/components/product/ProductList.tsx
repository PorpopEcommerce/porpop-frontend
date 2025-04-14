"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchUserThunk } from "@/app/redux/features/users/userSlice";
import { fetchProductsByVendorId } from "@/app/redux/features/products/productSlice";
import ProductHeader from "./productReview/ProductHeader";
import ProductContent from "./productReview/ProductContent";
import Spinner from "@/app/components/Spinner";

interface ProductListProps {
  handleEditClick: (productId: string) => void;
  handleAddProductClick: () => void;
  handleViewProductClick: () => void;
  handleImportAliProduct: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  handleEditClick,
  handleAddProductClick,
  handleViewProductClick,
  handleImportAliProduct,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeUser } = useSelector((state: RootState) => state.user);
  const {user, vendor} = activeUser
  const vendorProducts =
    useSelector((state: RootState) => state.products.vendorProducts) || [];
  const productStatus = useSelector(
    (state: RootState) => state.products.status
  );
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserThunk());
    }
  }, [user, dispatch]);

  useEffect(() => {
    console.log(vendor?.id)
    if (vendor?.id) {
      dispatch(fetchProductsByVendorId(vendor?.id));
    }
  }, [vendor?.id, dispatch]);


  return (
    <div className="flex-1">
      <ProductHeader
        handleAddProductClick={handleAddProductClick}
        handleViewProductClick={handleViewProductClick}
        handleImportAliProduct={handleImportAliProduct}
      />

      {productStatus === "loading" && <Spinner />}
      {productStatus === "failed" && (
        <p className="text-red-500">Error: {error}</p>
      )}

      {productStatus === "succeeded" && vendorProducts.length > 0 && (
        <>
          <div className="grid grid-cols-10 text-xs gap-4 pb-2 items-center mt-8">
            <div>IMAGE</div>
            <div className="col-span-2 justify-self-start">NAME</div>
            <div className="justify-self-start">STATUS</div>
            <div className="justify-self-start">STOCK</div>
            <div className="justify-self-start">PRICE</div>
            <div className="justify-self-start">TYPE</div>
            <div className="justify-self-start">VIEWS</div>
            <div className="justify-self-start">DATE</div>
          </div>
          <div>
            {vendorProducts.map((item) => (
              <ProductContent
                key={item.id}
                item={item}
                handleEditClick={handleEditClick}
                vendorId={vendor?.id}
              />
            ))}
          </div>
        </>
      )}

      {productStatus === "succeeded" && vendorProducts.length === 0 && (
        <div className="flex justify-center mt-[150px]">
          <p className="text-sm text-white text-center mt-3">
            No Products Found!! Ready to start selling something awesome? Add a
            product now!
          </p>
        </div>
      )}

      {/* Handle if user is not a vendor or vendor is undefined */}
      {!vendor?.id && productStatus === "idle" && (
        <div className="flex justify-center mt-[150px]">
          <p className="text-sm text-yellow-300 text-center mt-3">
            Vendor account not found. Please register as a vendor to start
            adding products.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
