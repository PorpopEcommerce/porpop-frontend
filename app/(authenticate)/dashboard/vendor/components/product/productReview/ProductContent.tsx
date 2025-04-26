"use client";

import Link from "next/link";
import { formatDate, formatPrice } from "@/app/utils/formatter";
import { truncateText } from "@/app/utils/truncateText";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/app/redux/store";
import { deleteProductByVendor, fetchProductsByVendorId } from "@/app/redux/features/products/productSlice";
import SubHeading from "@/app/components/product/SubHeading";
import { useDispatch } from "react-redux";
import { useState } from "react";
// Import Material UI components but use Tailwind for styling
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      // Dispatch the delete thunk
      const resultAction = await dispatch(deleteProductByVendor(item.id));

      // Check if the delete operation was successful
      if (deleteProductByVendor.fulfilled.match(resultAction)) {
        // Call the removeProductFromUI function to update the UI
        dispatch(fetchProductsByVendorId(vendorId));
        handleCloseDeleteDialog();
      } else {
        // Handle the rejected case
        console.error(resultAction.payload || "Failed to delete the product");
        // You could use a toast notification here instead of alert
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
                onClick={handleOpenDeleteDialog}
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

      {/* Material UI Dialog with Tailwind styling */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // Override MUI styles with some inline styles that can't be done with Tailwind
        PaperProps={{
          className: "rounded-lg shadow-xl max-w-md w-full overflow-hidden"
        }}
        BackdropProps={{
          className: "bg-black/50"
        }}
      >
        <DialogTitle id="alert-dialog-title" className="p-6 pb-0">
          <div className="flex items-center">
            {/* Warning icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Confirm Product Deletion
            </h3>
          </div>
        </DialogTitle>
        
        <DialogContent className="px-6 pt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete <span className="font-medium text-gray-700">{item.name}</span>? This action cannot be undone.
          </p>
        </DialogContent>
        
        <DialogActions className="p-6 pt-4">
          <div className="flex items-center justify-end gap-3 w-full">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              onClick={handleCloseDeleteDialog}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 flex items-center"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete Product
                </>
              )}
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductContent;