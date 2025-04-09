"use client";

import Link from "next/link";
import { formatDate, formatPrice } from "@/app/utils/formatter";
import { truncateText } from "@/app/utils/truncateText";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/app/redux/store";
import { deleteProductByVendor, fetchProductsByVendorId } from "@/app/redux/features/products/productSlice";
import SubHeading from "@/app/components/product/SubHeading";
import { useDispatch } from "react-redux";

interface ProductContentProps {
  item: any;
  handleEditClick: (productId: string) => void;
  vendorId: string;
}

const ProductContent: React.FC<ProductContentProps> = ({
  item,
  handleEditClick,
  vendorId
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
          dispatch(fetchProductsByVendorId(vendorId));
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
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <img
              src={item.images?.[0] || "/placeholder.jpg"}
              alt={truncateText(item.name) || "No Image"}
              className="object-contain"
            />{" "}
          </div>
        </Link>
      </div>
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>
            <SubHeading title={truncateText(item.name)} />
          </Link>
          <div className="flex flex-wrap gap-1">
            <button
              className="text-slate-400 text-[10px]"
              onClick={() => {
                handleEditClick(item.id);
              }}
            >
              Edit
            </button>
            <button
              className="text-slate-400 text-[10px]"
              onClick={() => {
                handleDeleteClick(item.id);
              }}
            >
              Delete Permanently
            </button>
            <button
              className="text-slate-400 text-[10px]"
              onClick={() => router.push(`/product/${item.id}`)}
            >
              View
            </button>
          </div>
        </div>
      </div>
      <div className="">{item.product_status}</div>
      <div className="">{item.stock_type}</div>
      <div className="">{formatPrice(item.price)}</div>
      <div className="">{item.product_type}</div>
      <div className="">View</div>
      <div className="">
        {formatDate(item.updated_at)}
        <p>Published</p>
      </div>
    </div>
  );
};

export default ProductContent;
