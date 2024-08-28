"use client";

import React, { useContext } from 'react';

import { ProductItem } from "./ProductItem"
import { ProductItemsContext } from '../context/product.context';
import ProductCard from './ProductCard';

export function HomePageProducts () {
    const { products } = useContext(ProductItemsContext);

    return (
        <div className="homepage-products">
            <h2>Welcome to my store</h2>
            <ProductCard products={products} exclude={0} limit={products.length} />
        </div>
    )
}