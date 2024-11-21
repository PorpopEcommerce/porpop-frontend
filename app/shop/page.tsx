import React from 'react'
import { products } from '../utils/Products'
import ProductCard from '../components/product/ProductCard'

const ProductList = () => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
      {products.map((product: any) => {
        return <ProductCard key={product.id} data={product}/>
      })}
    </div>
  )
}

export default ProductList
