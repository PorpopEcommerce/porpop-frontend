import React from 'react'

const MinMaxForm = () => {
    return (
        <div className='mb-3 border'>

            <div className="p-3 border-b">
                <p className="block text-[14px] font-bold text-gray-700">
                    Min/Max Options{" "}
                    <span className="text-[10px] font-light italic">
                        Manage min and max option for this product
                    </span>
                </p>
            </div>
            <div className='p-3 space-y-2'>
                <div className='lg:max-w-[50%] w-full'>
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Minimum quantity to order</label>
                    <input
                        type="number"
                        min="0" // Ensure the minimum value is 0
                        onChange={(e) => {
                            const value = Math.max(0, Number(e.target.value)); // Ensure value is not below 0
                            e.target.value = value.toString(); // Update the input field value
                        }}
                        placeholder='Minimum Quantity'
                        className="mt-1  w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>
                <div className='lg:max-w-[50%] w-full'>
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Maximum quantity to order</label>
                    <input
                        type="number"
                        min="0" // Ensure the minimum value is 0
                        onChange={(e) => {
                            const value = Math.max(0, Number(e.target.value)); // Ensure value is not below 0
                            e.target.value = value.toString(); // Update the input field value
                        }}
                        placeholder='Maximum Quantity'
                        className="mt-1  w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>
                <span className='text-[10px] font-light italic'>Please leave both fields empty or set to 0 to disable the minimum and maximum product quantity. Ensure the minimum quantity is not greater than the maximum quantity.</span>
            </div>


        </div>
    )
}

export default MinMaxForm
