"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchUserThunk } from "@/app/redux/features/users/userSlice";
import { fetchProductsByVendorId } from "@/app/redux/features/products/productSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const { activeUser } = useSelector((state: RootState) => state.user);
  const { user, vendor } = activeUser;
  const vendorProducts =
    useSelector((state: RootState) => state.products.vendorProducts) || [];

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserThunk());
    }
  }, [user, dispatch]);

  useEffect(() => {
    console.log(vendor?.id);
    if (vendor?.id) {
      dispatch(fetchProductsByVendorId(vendor?.id));
    }
  }, [vendor?.id, dispatch]);


  const onlineStatus = vendorProducts.filter((product) => product.visibility === true)

  const [counts, setCounts] = useState({
    all: vendorProducts.length,
    online: onlineStatus.length,
    draft: 0,
    inStock: onlineStatus.length,
  });

  return (
    <>
      <div className="md:flex md:justify-between mb-3">
        <div className="mb-3 md:mb-0">
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
