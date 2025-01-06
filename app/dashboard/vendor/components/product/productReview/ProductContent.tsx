'use client'

import Link from "next/link";
import { formatDate, formatPrice } from "@/app/utils/formatter";
import { truncateText } from "@/app/utils/truncateText";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/app/redux/store";
import Image from "next/image";
import { Product } from "@/app/types/product";
import SubHeading from "@/app/components/product/SubHeading";
import { useDispatch } from "react-redux";

interface ProductContentProps {
    item: Product;
    handleEditClick: (ProductID: string) => void;
    handleDeleteClick: (ProductID: string) => void;
}

const ProductContent: React.FC<ProductContentProps> = ({ item, handleEditClick, handleDeleteClick }) => {

    const router = useRouter();

    return (
        <div className="grid grid-cols-11 text-sm md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4">
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
                        <button className="text-slate-400 text-[10px]"
                            onClick={() => {}}
                        >
                            Edit
                        </button>
                        <button className="text-slate-400 text-[10px]"
                            onClick={() => {}}
                        >
                            Delete Permanently
                        </button>
                        <button className="text-slate-400 text-[10px]" onClick={() => router.push(`/product/${item.ProductID}`)}>View</button>
                    </div>

                </div>
            </div>
            <div className="">{item.ProductStatus}</div>
            <div className="">aliExpress ID</div>
            <div className="flex flex-wrap"><p>{item.SKU}</p></div>
            <div className="">{item.StockType}</div>
            <div className="">{formatPrice(item.DiscountedPrice)} - {formatPrice(item.RegularPrice)}</div>
            <div className="">
                {item.Type}
            </div>
            <div className="">View</div>
            <div className="">
                {formatDate(item.UpdatedAt)}
                <p>Published</p>
            </div>
        </div>
    );
}

export default ProductContent;