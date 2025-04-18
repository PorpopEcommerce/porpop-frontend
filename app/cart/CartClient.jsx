'use client'

import { IoMdArrowBack } from 'react-icons/io';
import { useCart } from '../hooks/useCart';
import Link from 'next/link';
import Heading from '../components/product/Heading';
import Button from '../components/product/Button';
import ItemContent from './ItemContent';
import { formatPrice } from '../utils/formatter';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const CartClient = () => {

    const { cartProducts, handleClearCart, cartTotalAmount, } = useCart();
    const { user } = useAuth(); // Assuming user is available from AuthContext

    const router = useRouter();

    if (!cartProducts || cartProducts.length === 0) {
        return <div className='flex flex-col items-center h-screen'>
            <div className='text-2xl'>
                Your cart is empty
            </div>
            <div>
                <Link
                    href='/shop'
                    className='text-slate-500 flex items-center gap-1 mt-2'
                >
                    <IoMdArrowBack />
                    <span>Start Shopping</span>
                </Link>
            </div>

        </div>
    }

    const onCartSubmit = () => {
        if (!user) {
          alert('Please log in to proceed to checkout.');
          return;
        }
    
        // Prepare cart data to pass to the checkout page
        const cartDetails = cartProducts.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        }));
    
        const checkoutData = {
          cartDetails,
          subtotal: cartTotalAmount,
        };
    
        // Convert the data to a query string
        const queryString = new URLSearchParams({
          cart: JSON.stringify(checkoutData.cartDetails),
          subtotal: checkoutData.subtotal.toString(),
        }).toString();
    
        // Navigate to the checkout page with the query string
        router.push(`/checkout?${queryString}`);
      };

    return <div>
        <Heading
            title='Shopping Cart'
            center
        />
        <div className='lg:flex gap-5'>
            <div className='flex-1'>
                <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8'>
                    <div className='col-span-2 justify-self-center'>PRODUCT</div>
                    <div className='justify-self-center'>PRICE</div>
                    <div className='justify-self-center'>QUANTITY</div>
                    <div className='justify-self-center'>SUBTOTAL</div>
                </div>
                <div>
                    {cartProducts && cartProducts.map((item) => {
                        return <ItemContent key={item.id} item={item} />
                    })}
                </div>
                <div className='flex py-4 border-t-[1.5px]'>
                    <div className='max-w-[100px]'>
                        <Button small outline label='Clear Cart' onClick={() => { handleClearCart() }} />
                    </div>
                </div>

            </div>
            <div className='lg:w-[400px] border border-slate-300 p-3'>
                <Heading title='Cart Totals' />
                <div className='flex justify-between w-full text-base font-semibold border-t-[1.5px] mt-5 py-5'>
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                </div>
    
                <div className='mt-3'>
                    <Button onClick={onCartSubmit} label='PROCEED TO CHECKOUT' />
                </div>
                <div>
                    <Link
                        href='/shop'
                        className='text-slate-500 flex items-center gap-1 mt-2'
                    >
                        <IoMdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>


    </div>;
}

export default CartClient;