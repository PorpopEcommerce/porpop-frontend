import SubHeading from '@/app/components/product/SubHeading'
import React from 'react'

const ReturnAndRefund = () => {
    return (
        <div className='p-4'>
            <SubHeading title='ALL REQUESTS' />
            <div className='grid grid-cols-4 text-xs gap-4 pb-2 items-center mt-8'>
                <div className=''>ORDER</div>
                <div className='justify-self-start'>VENDOR</div>
                <div className='justify-self-start'>TYPE</div>
                <div className='justify-self-start'>STATUS</div>

            </div>
        </div>
    )
}

export default ReturnAndRefund
