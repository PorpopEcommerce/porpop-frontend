import Link from 'next/link';
import React from 'react'
import { TbExclamationCircle } from "react-icons/tb";

const RequestQuotes = () => {
    return (
        <div>
            <div className='bg-red-500 flex items-center p-4 gap-2'>
                <TbExclamationCircle />
                <Link href='/shop'>Go to shop</Link>
                <span>No quotes has been made yet</span>

            </div>
        </div>
    )
}

export default RequestQuotes
