import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { CartItemsContext } from '../context/cart.context';
import { ProductItemsContext } from '../context/product.context';
import YouMightAlsoLike from './YouMightAlsoLike';

export function ProductDetail({ params }) {
    const [itemCount, setItemCount] = useState(1)
    const [isSelected, setIsSelected] = useState({
        s: false,
        m: false,
        l: false,
        xl: false
    });
    const { setCartItems } = useContext(CartItemsContext);
    const { products } = useContext(ProductItemsContext);

    function handleAddToCart () {
        const id = window.crypto.randomUUID();
        setCartItems((prevState) => ([...prevState, {id, slug: params.slug[0], item: `${params.slug[1].replace('%3A', ": ").split("%20").join(" ")}`, price: `${200}.${params.slug[0]}0`, quantity: itemCount}]))
    }
    return (
        <>
            <div className='product-detail'>
            <div className='details-add-to-cart'>
            <div className="product-summary">
                <p className="product-title">
                    {params.slug[1].replace('%3A', ": ").split("%20").join(" ")}
                </p>
                <p className="product-description">{products[params.slug[0] - 1].description}</p>
            </div>
            <div className='item-count_size-selection'>
                <div className='item-count'>
                    <span aria-disabled={itemCount === 1} onClick={() => setItemCount(itemCount - 1)} className='reduce-count'>-</span>
                    <span>{itemCount}</span>
                    <span aria-disabled={itemCount > 10} onClick={() => setItemCount(itemCount + 1)} className='increase-count'>+</span>
                </div>
            </div>
            <div className='price_add-to-cart'>
                <p className='item-price'>$200</p>
                <p className='add-to-cart' onClick={() => handleAddToCart()}>ADD TO CART</p>
            </div>
            </div>
            <div className='image-gallery'>
            <Image src={`/images/products/product-${params.slug[0]}.JPG`} width={350} height={450} alt="Product Image" />
            </div>
        </div>
        <YouMightAlsoLike exclude={params.slug[0]} />
        </>
    )
}