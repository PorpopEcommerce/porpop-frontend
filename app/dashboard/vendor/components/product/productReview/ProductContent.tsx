"use client";
import { useEffect } from "react";
import Link from "next/link";
import { formatDate, formatPrice } from "@/app/utils/formatter";
import { truncateText } from "@/app/utils/truncateText";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/app/redux/store";
import {
  deleteProductByVendor,
  fetchProductsByVendorId,
} from "@/app/redux/features/products/productSlice";
import { Product } from "@/app/types/product";
import SubHeading from "@/app/components/product/SubHeading";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/app/context/AuthContext";

interface ProductContentProps {
  item: Product;
  handleEditClick: (productId: string) => void;
  removeProductFromUI: (productId: string) => void;
  // handleDeleteClick: (ProductID: string) => void;
}

const ProductContent: React.FC<ProductContentProps> = ({
  item,
  handleEditClick,
  removeProductFromUI,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteClick = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Dispatch the delete thunk
        const resultAction = await dispatch(deleteProductByVendor(productId));

        // Check if the delete operation was successful
        if (deleteProductByVendor.fulfilled.match(resultAction)) {
          // Call the removeProductFromUI function to update the UI
          removeProductFromUI(productId);
        } else {
          // Handle the rejected case
          alert(
            resultAction.payload ||
              "Failed to delete the product. Please try again."
          );
        }
      } catch (error) {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="grid grid-cols-10 text-sm md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4">
      <div className="justify-self-center">
        <Link href={`/product/${item.ProductID}`}>
          <div className="relative w-[70px] aspect-square">
            {/* <Image src={item.Images} alt={item.Name} fill className="object-contain" /> */}
          </div>
        </Link>
      </div>
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.ProductID}`}>
            <SubHeading title={truncateText(item.Name)} />
          </Link>
          <div className="flex flex-wrap gap-1">
            <button
              className="text-slate-400 text-[10px]"
              onClick={() => {
                handleEditClick(item.ProductID);
              }}
            >
              Edit
            </button>
            <button
              className="text-slate-400 text-[10px]"
              onClick={() => {
                handleDeleteClick(item.ProductID);
              }}
            >
              Delete Permanently
            </button>
            <button
              className="text-slate-400 text-[10px]"
              onClick={() => router.push(`/product/${item.ProductID}`)}
            >
              View
            </button>
          </div>
        </div>
      </div>
      <div className="">{item.ProductStatus}</div>
      <div className="">{item.StockType}</div>
      <div className="">
        {formatPrice(item.RegularPrice)}
      </div>
      <div className="">{item.Type}</div>
      <div className="">View</div>
      <div className="">
        {formatDate(item.UpdatedAt)}
        <p>Published</p>
      </div>
    </div>
  );
};

export default ProductContent;
