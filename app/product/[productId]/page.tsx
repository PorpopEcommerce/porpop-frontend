'use client'

import ProductDetails from "@/app/components/product/ProductDetails";
import ListRating from "./ListRating";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useRouter } from 'next/router';

// import { products } from "@/app/utils/Products";

interface ProductPageProps {
    params: { productId: string };
  }



  const Product: React.FC<ProductPageProps> = ({ params }) => {

    const productId = params.productId;
    const product = useSelector((state: RootState) =>
      state.products.products.find((product) => product.id === String(productId))
    );

    
    if (!product) return <p>Product not found!</p>;


    return <div className="p-5 mx-auto">
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
            {/* <ListRating product={product} /> */}
        </div>
    </div>
};

export default Product;