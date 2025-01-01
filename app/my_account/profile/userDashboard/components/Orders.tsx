import React from 'react'

const Orders = () => {
  return (
    <div>
       <div className='grid grid-cols-6 text-xs gap-4 pb-2 items-center mt-8'>
        <div className=''>ORDER</div>
        <div className='justify-self-start'>DATE</div>
        <div className='justify-self-start'>SHIPMENT</div>
        <div className='justify-self-start'>STATUS</div>
        <div className='justify-self-start'>TOTAL</div>
        <div className='justify-self-start'>ACTIONS</div>
      </div>
    </div>
  )
}

export default Orders
