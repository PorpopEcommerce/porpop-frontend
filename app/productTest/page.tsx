'use client'

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/features/products/productSlice";
import { RootState, AppDispatch } from "../redux/store";

const ProductTest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading products...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      {status === "succeeded" && products.length === 0 && (
        <p>No products available.</p>
      )}

      {products.map((product) => (
        <div key={product.ProductID} className="product-card">
          <h2>{product.Name}</h2>
          <p>{product.Description}</p>
          <p>Price: ${product.RegularPrice}</p>
          <p>Discounted Price: ${product.DiscountedPrice}</p>
          <p>Stock: {product.Stock} ({product.StockType})</p>

          <div>
            <h3>Attributes:</h3>
            <ul>
              {product.Attributes.map((attr) => (
                <li key={attr.ProductAttributeID}>
                  {attr.Name}: {attr.Value}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Images:</h3>
            <div className="image-gallery">
              {product.Images.map((img, index) => (
                <img key={index} src={img} alt={`${product.Name} ${index}`} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTest;
