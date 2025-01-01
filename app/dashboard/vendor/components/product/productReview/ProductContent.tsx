'use client'

import Link from "next/link";
import { formatDate, formatPrice } from "@/app/utils/formatter";
import { truncateText } from "@/app/utils/truncateText";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/app/redux/store";
import { deleteProduct, editProduct } from "@/app/redux/features/products/productSlice";
import Image from "next/image";
import { Product } from "@/app/types/product";
import SubHeading from "@/app/components/product/SubHeading";
import { useDispatch } from "react-redux";

interface ProductContentProps {
    item: Product
    handleEditClick: (productId: string) => void;
}

const ProductContent: React.FC<ProductContentProps> = ({ item, handleEditClick }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleDelete = (productId: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(productId));
        }
    };

    const handleEdit = async (productId: string) => {
        const updatedData = {
            title: prompt("Enter new product title:", item.title) || item.title,
            price: parseFloat(prompt("Enter new price:", item.price.toString()) || item.price.toString()),
        };

        // Dispatch the edit thunk
        dispatch(editProduct({ productId, updatedData }));
    };

    return (
        <div className="grid grid-cols-11 text-sm md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4">
            <div className="justify-self-center">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image src={item.images} alt={item.title} fill className="object-contain" />

                    </div>
                </Link>
            </div>
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">

                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`}>
                        <SubHeading title={truncateText(item.title)} />
                    </Link>
                    <div className="flex flex-wrap gap-1">
                        <button className="text-slate-400 text-[10px]"
                            onClick={() => handleEditClick(item.id)}
                        >
                            Edit
                        </button>
                        <button className="text-slate-400 text-[10px]"
                            onClick={() => handleDelete(item.id)}
                        >
                            Delete Permanently
                        </button>
                        <button className="text-slate-400 text-[10px]" onClick={() => router.push(`/product/${item.id}`)}>View</button>
                    </div>

                </div>
            </div>
            <div className="">{item.productStatusType}</div>
            <div className="">aliExpress ID</div>
            <div className="">{item.SKU}</div>
            <div className="">{item.stockType}</div>
            <div className="">{formatPrice(item.discountedPrice)} - {formatPrice(item.price)}</div>
            <div className="">
                {item.productType}
            </div>
            <div className="">View</div>
            <div className="">
                {formatDate(item.updatedAt)}
                <p>Published</p>
            </div>
        </div>
    );
}

export default ProductContent;