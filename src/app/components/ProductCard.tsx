import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard ({ products, exclude, limit } : {products: [{
    id: number;
    name: string;
    price: string;
    color: string;
    category: string;
    tag: string;
}], exclude: number, limit: number}) {

    function formatName(product: {
        name: string;
        color: string;
        category: string;
        tag: string;
    }): string {
        if (product.tag === 'long dress' || product.tag === "short dress") {
            const [ collection, name] = product.name.split(':');
            return `${collection}: ${product.color} ${name}`
        } else {
            return `${product.name}`
        }
    }

    function discountPrice(product: {
        name: string;
        color: string;
        category: string;
        price: string;
        tag: string
    }): number | undefined {
        if (product.tag === 'long dress') {
            const discountPrice = parseFloat(product.price) - (parseFloat(product.price) * 0.2);
            return discountPrice
        } else if (product.tag === 'short dress') {
            const discountPrice = parseFloat(product.price) - (parseFloat(product.price) * 0.1);
            return discountPrice
        }
    }

    return (
        <div className='product-card__container'>
            {products.filter((product) => product.id !== exclude).filter(product => product.id <= limit).map((product) => (
               <div key={product.id} className='product-card'>
                <Link href={`/product/${product.id}/${product.name}`}>
                    <Image src={`/images/products/product-${product.id}.JPG`} width={300} height={350} className='image' alt="Product Image" />
                </Link>
                <p className="name">
                    <Link href={`/product/${product.id}/${product.name}`}>
                    {formatName(product)}
                    </Link> </p>
                    {(product.tag === 'long dress' || product.tag === "short dress") && <p className='price'>$<span className='full-price'>{product.price}</span>  $<span>{discountPrice(product)}</span></p>}
                    {(product.tag === 'jewelry' || product.tag === "fall") && <p className='price'>${product.price} </p>}
               </div>     
            ))}
            </div> 
    )
}