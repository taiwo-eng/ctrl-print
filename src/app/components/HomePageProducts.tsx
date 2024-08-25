"use client";

import React, { useContext } from 'react';

import { ProductItem } from "./ProductItem"
import { ProductItemsContext } from '../context/product.context';

export function HomePageProducts () {
    const { products } = useContext(ProductItemsContext);

    return (
        <div className="homepage-products">
            {products.map((product: { name: string, id: string, description: string}) => <ProductItem description={product.description} name={product.name} key={product.id} slug={product.id} />)}
        </div>
    )
}