import ProductDetails from "@/app/components/product/ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/app/utils/Products";


interface IParams {
    productId?: string;
}

const Product = ({ params }: { params: IParams }) => {

    const product = products.find((item) => item.id === params.productId);

    return <div className="p-5 mx-auto">
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
            <ListRating product={product} />
        </div>
    </div>
};

export default Product;