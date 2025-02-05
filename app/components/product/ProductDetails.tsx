"use client";

import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SetColor from "./SetColor";
import SetQuantity from "./SetQuantity";
import Button from "./Button";
import ProductImage from "./ProductImage";
import { useCart } from "@/app/hooks/useCart";
import { Product } from "@/app/types/product";
import { formatPrice } from "@/app/utils/formatter";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  title: string;
  description: string;
  category?: string;
  // brand: string,
  selectedImg?: SelectedImageType;
  quantity: number;
  price: number;
};

export type SelectedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();

  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.ProductID,
    title: product.Name,
    description: product.Description,
    // brand: product.brand,
    // selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.RegularPrice,
  });

  useEffect(() => {
    // Check if the product is already in the cart
    const productExists = cartProducts?.some(
      (item) => item.id === product.ProductID
    );
    setIsProductInCart(productExists || false);
  }, [cartProducts, product.ProductID]);

  const handleBuyProduct = () => {
    const orderDetails = {
      id: cartProduct.id,
      title: cartProduct.title,
      description: cartProduct.description,
      price: cartProduct.price,
      quantity: cartProduct.quantity,
    };

    const checkoutData = {
      id: orderDetails.id.toString(),
      title: orderDetails.title,
      description: orderDetails.description,
      price: orderDetails.price.toString(),
      quantity: orderDetails.quantity.toString(),
    };

    // Manually construct the query string
    const queryString = new URLSearchParams({
      product: JSON.stringify(checkoutData),
    }).toString();

    // Pass the full URL as a string to `router.push()`
    router.push(`/checkout?${queryString}`);
  };

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, []);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      const newQuantity = Math.max(prev.quantity - 1, 1); // Ensure it doesn't go below 1
      return { ...prev, quantity: newQuantity };
    });
  }, []);

  const handleAddToCart = () => {
    handleAddProductToCart(cartProduct);
    setIsProductInCart(true); // Update state to reflect the product is now in the cart
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* <ProductImage cartProduct={cartProduct} product={product} 
       /> */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold">{product.Name}</h1>
        <div>
          <h2>{formatPrice(product.RegularPrice)}</h2>
        </div>

        <div className="text-justify">{product.Description}</div>

        <div className="text-xl font-normal">{product.StockType}</div>

        <Horizontal />

        {isProductInCart ? (
          <>
            <div>
              <p className="mb-2 text-slate-500 flex items-center gap-1">
                <IoMdCheckmarkCircle className="text-teal-400" size={20} />
                <span>Product added to cart</span>
              </p>
              <div className="max-w-[300px]">
                <Button
                  label="View Cart"
                  outline
                  onClick={() => {
                    router.push("/cart");
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            /> */}
            <Horizontal />
            <div className="flex gap-2">
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
              <div className="max-w-[300px]">
                <Button label="Add To Cart" onClick={handleAddToCart} />
              </div>
              <div className="max-w-[300px]">
                <Button label="Buy Now" onClick={() => handleBuyProduct()} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
