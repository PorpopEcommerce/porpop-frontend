import React from 'react'

const DeliveryForm = () => {
    return (
        <div className="mb-3 border">
            <div className="p-3 border-b">
                <p className="block text-[14px] font-bold text-gray-700">
                    Delivery Time <span className='text-[10px] font-light italic'>Manage your product delivery time</span>
                </p>

            </div>
            <div className="p-3 grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Delivery time:</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Delivery time for backorder</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>

            </div>
            <div className='p-3'>
                <div className="relative lg:max-w-[50%]">
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Delivery time for out of stock</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
                    />


                </div>
            </div>

        </div>
    )
}

export default DeliveryForm
