// components/ProductCard.tsx
"use client";

import Image from "next/image";
import { truncateText } from "../../utils/truncateText";
import { formatPrice } from "../../utils/formatter";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  // getting the average reviews for our rating
//   const productRating =
//     data?.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
//     data?.reviews.length;

  return (
    <div
      className="col-span-1 cursor-pointer border-slate-200 border-[1.2px] bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
      onClick={() => router.push(`/product/${data.ProductID}`)}
    >
      <div className="w-full text-start">
        <div className="aspect-square overflow-hidden relative w-full">
          {/* <Image
            fill
            src={data.images[0].image || "No image display"}
            alt={data.Name}
            className="w-full h-full object-contain"
          /> */}
        </div>
        <div className="p-3">
          <div className="mt-4">
            <p>{truncateText(data.Name)}</p>
          </div>
          <div>
            {/* <Rating value={productRating} readOnly /> */}
          </div>
          <div>
            {/* <p>{data?.reviews.length} reviews</p> */}
          </div>
          <div className="font-semibold">
            <p>{formatPrice(data.RegularPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
