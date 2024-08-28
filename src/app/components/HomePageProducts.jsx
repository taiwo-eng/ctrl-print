"use client";

import React, { useContext } from 'react';

import { ProductItemsContext } from '../context/product.context';
import ProductCard from './ProductCard';

export function HomePageProducts () {
    const { products } = useContext(ProductItemsContext);
    const jewelryProducts = products.slice(7);
    return (
        <div className="homepage-products">
            <h2>Welcome to my store</h2>
            <ProductCard products={products} exclude={0} limit={products.length - 8} />
            <h2>Accessories</h2>
            <ProductCard products={jewelryProducts} exclude={0} limit={17} />
        </div>
    )
}