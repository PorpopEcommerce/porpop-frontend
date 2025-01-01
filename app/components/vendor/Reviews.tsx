import React from 'react'

const reviewData = [
    { label: 'All', value: '0' },
    { label: 'Pending', value: '0' },
    { label: 'Spam', value: '0' },
    { label: 'Trash', value: '0' },
    
]

const Reviews = () => {
    return (
        <div className='border w-full p-3 mb-4'>
            <div className='border-b w-full'>
                <h2>Reviews</h2>
            </div>
            <ul>
                {reviewData.map((order) => {
                    return <li key={order.label} className='flex justify-between items-center'>
                        <span>{order.label}</span>
                        <span>{order.value}</span>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Reviews
