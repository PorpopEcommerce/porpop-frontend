import React from 'react'

const GeolocationForm = () => {
    return (
        <div className="mb-3 border">
            <div className="p-3 border-b">
                <p className="block text-[14px] font-bold text-gray-700">Geolocation</p>
            </div>
            <div className='flex items-center p-3 gap-2'>
                <input type="checkbox" /> 
                <label className="text-[12px] font-medium text-gray-700">Same as Store</label>
            </div>


        </div>
    )
}

export default GeolocationForm
