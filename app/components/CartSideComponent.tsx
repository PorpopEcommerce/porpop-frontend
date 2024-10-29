import { FaTimes } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

interface CartSideComponentProps {
    toggleCart: () => void
}

const CartSideComponent: React.FC<CartSideComponentProps> = ({ toggleCart }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40'
            onClick={toggleCart}>
            <div className='w-[300px] h-full bg-white'
                onClick={(e) => e.stopPropagation()}
            >
                <div className=" h-16 flex justify-between items-center px-2">
                    <span>Shopping Cart</span>
                    <button className="flex gap-2 items-center"
                        onClick={toggleCart}
                    >
                        <FaTimes /> Close
                    </button>
                </div>
                <div className="">
                    <FiShoppingCart />
                    <p>No shopping product</p>
                    <button className='flex justify-center items-center cursor-pointer'
                    >
                        Return to Shop
                    </button>
                </div>

            </div>


        </div>
    )
}

export default CartSideComponent
