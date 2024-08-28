"use cleint";

import React, { useContext } from 'react';
import { ProductItemsContext } from '../context/product.context';
import ProductCard from './ProductCard';


export default function YouMightAlsoLike({ exclude }) {
    const { products } = useContext(ProductItemsContext);

    return (
        <div className='you-might-also-like'>
            <p className='section-title'>You might also like</p>
            <ProductCard products={products} exclude={exclude} limit={7} />
        </div>
    )
}