import Image from 'next/image';
import React, { useState } from 'react';

export function ProductDetail({ params }: { params: { slug: string } }) {
    const [itemCount, setItemCount] = useState(1)
    const [isSelected, setIsSelected] = useState({
        s: false,
        m: false,
        l: false,
        xl: false
    });
    return (
        <div className='product-detail'>
            <div className='details-add-to-cart'>
            <div className="product-summary">
                <p className="product-title">
                    Blue and Pink Mini Agbada with yellow asooke
                </p>
                <p className="product-description">Our signature Agbada in blue and pink with hand-woven asooke in a contrasting color. 
                This versatile yet sophisticated loungewear in these colors and bold prints is your new wardrobe staple.</p>
            </div>
            <div className='item-count_size-selection'>
                <div className='item-count'>
                    <span aria-disabled={itemCount === 1} onClick={() => setItemCount(itemCount - 1)} className='reduce-count'>-</span>
                    <span>{itemCount}</span>
                    <span aria-disabled={itemCount > 10} onClick={() => setItemCount(itemCount + 1)} className='increase-count'>+</span>
                </div>
                <div className='size-select'>
                    <span className={isSelected.s ? 'selected-S': 'not-selected'} onClick={() => setIsSelected((prevState) => ({...prevState, s: !isSelected.s}))}>S</span>
                    <span className={isSelected.m ? 'selected-M': 'not-selected'}  onClick={() => setIsSelected((prevState) => ({...prevState, m: !isSelected.m}))}>M</span>
                    <span className={isSelected.l ? 'selected-L': 'not-selected'}  onClick={() => setIsSelected((prevState) => ({...prevState, l: !isSelected.l}))}>L</span>
                    <span className={isSelected.xl ? 'selected-XL': 'not-selected'}  onClick={() => setIsSelected((prevState) => ({...prevState, xl: !isSelected.xl}))}>XL</span>
                </div>
            </div>
            </div>
            <div className='image-gallery'>
            <Image src={`/images/products/product-${params.slug}.JPG`} width={350} height={450} alt="Product Image" />
            </div>
        </div>
    )
}