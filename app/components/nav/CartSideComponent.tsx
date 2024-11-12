'use client'

import { FaTimes } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Link from 'next/link';

interface CartSideComponentProps {
    toggleCart: () => void;
}

const CartSideComponent: React.FC<CartSideComponentProps> = ({ toggleCart }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40' onClick={toggleCart}>
            <div
                className='w-full md:w-[350px] h-full bg-white shadow-lg flex flex-col relative'
                onClick={(e) => e.stopPropagation()}
            >

                <div className="h-16 flex justify-between items-center px-4">
                    <h2 className="text-lg font-semibold">Shopping Cart</h2>
                    <button className="flex items-center text-gray-500" onClick={toggleCart}>
                        <FaTimes className="text-xl" /> <span className="ml-1">Close</span>
                    </button>
                </div>

                <hr className="absolute top-16 left-0 w-full border-t border-gray-300" />

                <div className="flex flex-col items-center text-center space-y-4 mt-8 p-6">
                    <FiShoppingCart className="text-8xl text-gray-400" />
                    <p className="font-medium text-base">No shopping product</p>
                    <Link href='/shop'>
                        <button className="bg-green-700 text-white py-2 px-4 rounded" onClick={toggleCart}>
                            Return to Shop
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default CartSideComponent;
