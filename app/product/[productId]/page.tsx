"use client";

import ProductDetails from "@/app/components/product/ProductDetails";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchAllProducts } from "@/app/redux/features/products/productSlice";
import Spinner from "@/app/components/Spinner";

interface ProductPageProps {
  params: { productId: string };
}

const Product: React.FC<ProductPageProps> = ({ params }) => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const productId = params.productId;
  

  useEffect(() => {
    // Fetch all products and manage loading state
    const fetchProducts = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        await dispatch(fetchAllProducts()).unwrap(); // Unwrap ensures promise rejection is caught
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchProducts();
  }, [dispatch]);

  const product = useSelector((state: RootState) =>
    state.products.allProducts.find(
      (product) => product.id === String(productId)
    )
  );

  if (isLoading) {
    return <Spinner />; // Show loading state while fetching data
  }

  if (!product) return <p>Product not found!</p>;

  return (
    <div className="p-5 mx-auto">
      <ProductDetails product={product} />
    </div>
  );
};

export default Product;
