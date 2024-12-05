'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/app/redux/features/products/productSlice';
import { RootState, AppDispatch } from '@/app/redux/store';
import ProductContent from './ProductContent';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p className="text-center text-gray-500">Loading products...</p>;
  if (status === 'failed') return <p className="text-center text-red-500">Error: {error}</p>;

  if (!products || products.length === 0) {
    return <div className='flex flex-col items-center'>
      <div className='text-2xl'>
        Your Product is empty
      </div>
    </div>
  }

  return (
    <div className='flex-1'>
      <div className='grid grid-cols-11 text-xs gap-4 pb-2 items-center mt-8'>
        <div className=''>IMAGE</div>
        <div className='col-span-2 justify-self-start'>NAME</div>
        <div className='justify-self-start'>STATUS</div>
        <div className='justify-self-start'></div>
        <div className='justify-self-start'>SKU</div>
        <div className='justify-self-start'>STOCK</div>
        <div className='justify-self-start'>PRICE</div>
        <div className='justify-self-start'>TYPE</div>
        <div className='justify-self-start'>VIEWS</div>
        <div className='justify-self-start'>DATE</div>
      </div>
      <div>
        {products && products.map((item) => {
          return <ProductContent key={item.id} item={item} />
        })}
      </div>
    </div>
  );
};

export default ProductList;