import { useState } from 'react'

const DiscountForm = () => {

    const [isDiscountManagementEnabled, setIsDiscountManagementEnabled] = useState(false);


    return (
        <div className="mb-3 border">
            <div className="p-3 border-b">
                <p className="block text-[14px] font-bold text-gray-700">
                    Discount Options <span className='text-[10px] font-light italic'>Set your discount for this product</span>
                </p>

            </div>
            <div className='p-3 flex gap-3 items-center'>
                <input type="checkbox"
                    checked={isDiscountManagementEnabled}
                    onChange={(e) => setIsDiscountManagementEnabled(e.target.checked)} // Toggle state
                />
                <label className="text-[12px] font-medium text-gray-700">This product require shipping</label>
            </div>

            {isDiscountManagementEnabled && (
                <div className="p-3 grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[12px] font-medium text-gray-700 mb-2">Minimun quantity</label>
                        <input
                            type="number"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[12px] font-medium text-gray-700 mb-2">Discount %</label>
                        <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>

                </div>

            )}


        </div>
    )
}

export default DiscountForm
