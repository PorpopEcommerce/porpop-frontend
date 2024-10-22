'use client';

import { FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  return (
    <div className="h-full flex gap-2">
      <div className=" flex justify-center items-center">
        <FiShoppingCart className="text-3xl"/>
      </div>
      
      <div className="text-sm hidden lg:flex flex-col border-l border-zinc-500 px-2">
        <p>NGN N0.00</p>
        <p>0 <span>Item(s)</span></p>
      </div>
    </div>
  )
}

export default Cart
