import { useState } from 'react'

const shippingStatusData = [
    { id: 1, label: 'No shipping class (US$0)' },
    { id: 2, label: 'TVs' },
    { id: 3, label: 'Generator' },
    { id: 4, label: 'Sewing machines' },
    { id: 5, label: 'Center tables' },
    { id: 6, label: 'Refrigerator' },
    { id: 7, label: 'Engines' },
    { id: 8, label: 'T-Shirts' },
]

const ShippingForm = () => {

    const [taxStatusTypeDropdown, setTaxStatusTypeDropdown] = useState(false);
    const [taxStatusType, setStatusTaxType] = useState("Taxable"); // Selected tax type
    const [taxClassTypeDropdown, setTaxClassTypeDropdown] = useState(false);
    const [taxClassType, setTaxClassType] = useState("Standard"); // Selected tax class type
    const [shippingStatusTypeDropdown, setShippingStatusTypeDropdown] = useState(false);
    const [shippingStatusType, setShippingStatusType] = useState("No shipping class (US$0)"); // Selected tax class type
    const [isShippingManagementEnabled, setIsShippingManagementEnabled] = useState(false)

    const handleTaxStatusTypeSelect = (type: string) => {
        setStatusTaxType(type); // Set the selected tax type
        setTaxStatusTypeDropdown(false); // Close the dropdown
    };

    const handleTaxClassTypeSelect = (type: string) => {
        setTaxClassType(type); // Set the selected tax class type
        setTaxClassTypeDropdown(false); // Close the dropdown
    };

    const handleShippingStatusTypeSelect = (type: string) => {
        setShippingStatusType(type); // Set the selected tax class type
        setShippingStatusTypeDropdown(false); // Close the dropdown
    };
    return (
        <div className="mb-3 border">
            <div className="p-3 border-b">
                <p className="block text-[14px] font-bold text-gray-700">
                    Shipping and Tax <span className='text-[10px] font-light italic'>Manage shipping and tax for this product</span>

                </p>
            </div>

            <div className='p-3 flex gap-3 items-center'>
                <input type="checkbox"
                    checked={isShippingManagementEnabled}
                    onChange={(e) => setIsShippingManagementEnabled(e.target.checked)} // Toggle state
                />
                <label className="text-[12px] font-medium text-gray-700">This product require shipping</label>
            </div>

            {/* Conditional display of "shipping status" field */}
            {isShippingManagementEnabled && (
                <>
                    <div className='grid grid-cols-4 p-3 gap-3'>
                        <div>
                            <input
                                type="number"
                                min="0" // Ensure the minimum value is 0
                                onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value)); // Ensure value is not below 0
                                    e.target.value = value.toString(); // Update the input field value
                                }}
                                placeholder='weight (kg)'
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                min="0" // Ensure the minimum value is 0
                                onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value)); // Ensure value is not below 0
                                    e.target.value = value.toString(); // Update the input field value
                                }}
                                placeholder='length (cm)'
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                min="0" // Ensure the minimum value is 0
                                onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value)); // Ensure value is not below 0
                                    e.target.value = value.toString(); // Update the input field value
                                }}
                                placeholder='width (cm)'
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                min="0" // Ensure the minimum value is 0
                                onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value)); // Ensure value is not below 0
                                    e.target.value = value.toString(); // Update the input field value
                                }}
                                placeholder='height (cm)'
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>

                    </div>

                    <div className='p-3 '>
                        <div className='relative'>
                            <label className="block text-[12px] font-medium text-gray-700 mb-2">shipping class</label>
                            <input
                                type="text"
                                placeholder={shippingStatusType} // Placeholder updates to the selected product type
                                value={shippingStatusType} // Reflect the selected product type in the input field
                                readOnly
                                onClick={() => setShippingStatusTypeDropdown((prev) => !prev)} // Toggle dropdown visibility
                                className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
                            />

                            {shippingStatusTypeDropdown && (
                                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                    {shippingStatusData.map((type) => (
                                        <div
                                            key={type.id}
                                            onClick={() => handleShippingStatusTypeSelect(type.label)} // Handle selection
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {type.label}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                    </div>
                </>
            )}


            <div className='grid grid-cols-2 p-3 gap-3'>
                <div className="relative">
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Tax Status</label>
                    <input
                        type="text"
                        placeholder={taxStatusType} // Placeholder updates to the selected product type
                        value={taxStatusType} // Reflect the selected product type in the input field
                        readOnly
                        onClick={() => setTaxStatusTypeDropdown((prev) => !prev)} // Toggle dropdown visibility
                        className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
                    />

                    {taxStatusTypeDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            {["Taxable", "Shipping only", "None"].map((type) => (
                                <div
                                    key={type}
                                    onClick={() => handleTaxStatusTypeSelect(type)} // Handle selection
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="relative">
                    <label className="block text-[12px] font-medium text-gray-700 mb-2">Stock Status</label>
                    <input
                        type="text"
                        placeholder={taxClassType} // Placeholder updates to the selected product type
                        value={taxClassType} // Reflect the selected product type in the input field
                        readOnly
                        onClick={() => setTaxClassTypeDropdown((prev) => !prev)} // Toggle dropdown visibility
                        className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none cursor-pointer"
                    />

                    {taxClassTypeDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            {["Standard", "Reduced rate", "Zero rate"].map((type) => (
                                <div
                                    key={type}
                                    onClick={() => handleTaxClassTypeSelect(type)} // Handle selection
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>


        </div>
    )
}

export default ShippingForm
