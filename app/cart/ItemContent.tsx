'use client'

import Link from "next/link";
import { CartProductType } from "../components/product/ProductDetails";
import { formatPrice } from "../utils/formatter";
import { truncateText } from "../utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/product/SetQuantity";
import { useCart } from "../hooks/useCart";

interface ItemContentProps {
    item: CartProductType
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const {handleRemoveProductFromCart, handleQtyProductIncrease, handleQtyProductDecrease} = useCart();


    return (
        <div className="grid grid-cols-5 text-sm md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image src={item.selectedImg?.image || 'image'} alt={item.title} fill className="object-contain" />

                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`}>
                        {truncateText(item.title)}
                    </Link>
                    {/* <div>{item.selectedImg.color}</div> */}
                    <div className="w-[70px]">
                        <button className="text-slate-400 underline" onClick={() => handleRemoveProductFromCart(item)}>Remove</button>
                    </div>

                </div>
            </div>
            <div className="justify-self-center">{formatPrice(item.price)}</div>
            <div className="justify-self-center">
                <SetQuantity
                    cartCounter={true}
                    cartProduct={item}
                    handleQtyIncrease={() => { 
                        handleQtyProductIncrease(item)
                    }}
                    handleQtyDecrease={() => {
                        handleQtyProductDecrease(item)
                     }} />
            </div>
            <div className="justify-self-center font-semibold">{formatPrice(item.price * item.quantity)}</div>
        </div>
    );
}

export default ItemContent;