'use client';

import { FiShoppingCart } from "react-icons/fi";
import { formatPrice } from "../../utils/formatPrice";
import { useCart } from "../../hooks/useCart";
import { useRouter } from "next/navigation";

interface CartComponentProps {
  toggleCart: () => void
}

const Cart: React.FC<CartComponentProps> = ({ toggleCart }) => {

  const router = useRouter()

  const { cartTotalAmount, cartTotalQty } = useCart();

  const handleCartToggle = () => {
    if (cartTotalQty > 0) {
      router.push('/cart')
    } else {
      toggleCart();
    }
  }


  return (
    <div className="h-full cursor-pointer flex gap-2"
      onClick={handleCartToggle}>
      <div className="relative flex justify-center items-center">
        <FiShoppingCart className="text-3xl" />
        {cartTotalQty > 0 && (
          <span className="absolute top-[-10px] left-[-10px] text-white h-6 w-6 rounded-full flex items-center justify-center bg-teal-400">
            {cartTotalQty}
          </span>
        )}
      </div>

      <div className="text-sm hidden lg:flex flex-col border-l border-zinc-500 px-2">
        <p>{formatPrice(cartTotalAmount)}</p>
        <p>{cartTotalQty} <span>Item(s)</span></p>
      </div>
    </div>
  )
}

export default Cart
