"use client";

import React, { useContext } from 'react';

import { ProductItemsContext } from '../context/product.context';
import ProductCard from './ProductCard';

export function HomePageProducts () {
    const { products } = useContext(ProductItemsContext);
    const fallProducts = products.filter(product => product.tag === "fall")
    const summerSaleProducts = products.filter(product => product.tag === 'long dress' || product.tag === "short dress");
    const jewelryProducts = products.filter(product => product.tag === 'jewelry');
    return (
        <div className="homepage-products">
            <h2>Fall collection</h2>
            <ProductCard products={fallProducts} exclude={0} limit={16} />
            <h2>Summer sales</h2>
            <ProductCard products={summerSaleProducts} exclude={0} limit={7} />
            <h2>Accessories</h2>
            <ProductCard products={jewelryProducts} exclude={0} limit={10} />
        </div>
    )
}