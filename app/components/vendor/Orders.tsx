import React from 'react'

const orderData = [
    { label: 'Total', value: '0' },
    { label: 'Completed', value: '0' },
    { label: 'Pending', value: '0' },
    { label: 'Processing', value: '0' },
    { label: 'Cancelled', value: '0' },
    { label: 'Refunded', value: '0' },
    { label: 'On hold', value: '0' },
]

const Orders = () => {
    return (
        <div className='border w-full p-3 mb-4'>
            <div className='border-b w-full'>
                <h2>Order</h2>
            </div>
            <ul>
                {orderData.map((order) => {
                    return <li key={order.label} className='flex justify-between items-center'>
                        <span>{order.label}</span>
                        <span>{order.value}</span>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Orders
