'use client';

import { FiShoppingCart } from "react-icons/fi";

interface CartComponentProps {
  toggleCart: () => void
}

const Cart: React.FC<CartComponentProps> = ({ toggleCart }) => {
  return (
    <div className="h-full cursor-pointer flex gap-2"
      onClick={toggleCart}>
      <div className=" flex justify-center items-center">
        <FiShoppingCart className="text-3xl" />
      </div>

      <div className="text-sm hidden lg:flex flex-col border-l border-zinc-500 px-2">
        <p>NGN N0.00</p>
        <p>0 <span>Item(s)</span></p>
      </div>
    </div>
  )
}

export default Cart
