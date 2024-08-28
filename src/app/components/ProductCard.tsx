import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard ({ products, exclude, limit } : {products: [{
    id: number;
    name: string;
    price: string;
    color: string;
}], exclude: number, limit: number}) {

    function formatName(product: {
        name: string;
        color: string;
    }): string {
        const [ collection, name] = product.name.split(':');
        return `${collection}: ${product.color} ${name}`
    }

    return (
        <div className='product-card__container'>
            {products.filter((product) => product.id !== exclude && product.id < limit).map((product) => (
               <div key={product.id} className='product-card'>
                <Image src={`/images/products/product-${product.id}.JPG`} width={300} height={350} className='image' alt="Product Image" />
                <p className="name">
                    <Link href={`/product/${product.id}/${product.name}`}>
                    {formatName(product)}
                    </Link> </p>
                    <p className='price'>${product.price}</p>
               </div>     
            ))}
            </div> 
    )
}