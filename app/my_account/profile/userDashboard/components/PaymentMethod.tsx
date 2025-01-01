import Button from '@/app/components/product/Button';
import React from 'react'
import { TbExclamationCircle } from "react-icons/tb";


const PaymentMethod = () => {
    return (
        <div>
            <div className='bg-red-500 flex items-center p-4 gap-2 mb-3'>
                <TbExclamationCircle />
                <span>No saved methods found.</span>
            </div>
            <Button
                label='ADD PAYMENT METHOD'
                custom='max-w-[fit-content]'
            />
        </div>
    )
}

export default PaymentMethod
