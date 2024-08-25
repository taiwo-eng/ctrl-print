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
        setCartItems((prevState) => ([...prevState, {slug: params.slug[0], item: `${params.slug[1]}`, size: 'Medium', price: `${200}.${params.slug[0]}0`, quantity: itemCount}]))
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
                <div className='size-select'>
                    <span className={isSelected.s ? 'selected-S': 'not-selected'} onClick={() => setIsSelected(() => (
                        {s: !isSelected.s, m: false, l: false, xl: false}
                        ))}>S</span>
                    <span className={isSelected.m ? 'selected-M': 'not-selected'}  onClick={() => setIsSelected(() => ({m: !isSelected.m, s: false, l: false, xl: false}))}>M</span>
                    <span className={isSelected.l ? 'selected-L': 'not-selected'}  onClick={() => setIsSelected(() => ({l: !isSelected.l, m: false, s: false, xl: false}))}>L</span>
                    <span className={isSelected.xl ? 'selected-XL': 'not-selected'}  onClick={() => setIsSelected(() => ({xl: !isSelected.xl, m: false, l: false, s: false}))}>XL</span>
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