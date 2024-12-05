import React from 'react'

const LinkedProductForm = () => {
    return (
        <div className="mb-3 border">
            <div className="p-3 border-b">
                <p className="block text-[14px] font-bold text-gray-700">
                    Linked Products<span className='text-[10px] font-light italic'>Set your linked products for upsell and cross-sells
                    </span>
                </p>
            </div>
            <div className="p-3 grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Upsells</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Cross-sells</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>

            </div>


        </div>
    )
}

export default LinkedProductForm
