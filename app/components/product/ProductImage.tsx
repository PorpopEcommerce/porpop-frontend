"use client";

import React from "react";
import { CartProductType, SelectedImageType } from "./ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleSelect?: (value: SelectedImageType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      {product.images?.map((image: string, index: number) => {
          const formattedImage = { image };
          return (
            <div
              key={index}
              onClick={() => handleSelect?.(formattedImage)}
              className={`relative w-[80%] aspect-square rounded border-teal-300 `}
            >
              <Image
                src={formattedImage.image || "placeholder"}
                alt={`Product image ${index}`}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>

      <div className="col-span-5 relative aspect-square ">
        <Image
          src={cartProduct.selectedImg?.image || "placeholder"}
          alt={cartProduct.title}
          fill
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default ProductImage;
