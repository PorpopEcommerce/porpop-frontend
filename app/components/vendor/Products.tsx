import React from 'react'

const productData = [
    { label: 'Total', value: '0' },
    { label: 'Live', value: '0' },
    { label: 'Offline', value: '0' },
    { label: 'Pending Review', value: '0' },
    
]

const Products = () => {
    return (
        <div className='border w-full p-3 mb-4'>
            <div className='border-b w-full flex justify-between items-center'>
                <h2>Products</h2>
                <div>Add new Product</div>
            </div>
            <ul>
                {productData.map((order) => {
                    return <li key={order.label} className='flex justify-between items-center'>
                        <span>{order.label}</span>
                        <span>{order.value}</span>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Products
