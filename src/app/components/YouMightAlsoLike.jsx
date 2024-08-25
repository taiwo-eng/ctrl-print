"use cleint";

import React, { useContext } from 'react';
import { ProductItemsContext } from '../context/product.context';
import Image from 'next/image';
import Link from 'next/link';

export default function YouMightAlsoLike({ exclude }) {
    const { products } = useContext(ProductItemsContext);

    function formatName(product) {
        const [ collection, name] = product.name.split(':');
        return `${collection}: ${product.color} ${name}`
    }

    return (
        <div className='you-might-also-like'>
            <p className='section-title'>You might also like</p>
            <div className='product-card__container'>
            {products.filter((product) => product.id !== exclude && product.id < 7).map((product) => (
               <div key={product.id} className='product-card'>
                <Image src={`/images/products/product-${product.id}.JPG`} width={300} height={350} className='image' alt="Product Image" />
                <p className="name">
                    <Link href={`/product/${product.id}/${product.name}`}>
                    {formatName(product)}
                    </Link> </p>
               </div>     
            ))}
            </div>
        </div>
    )
}