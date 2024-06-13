import Image from 'next/image';
import React from 'react';

export function ProductDetail({ params }: { params: { slug: string } }) {
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
            </div>
            <div className='image-gallery'>
            <Image src={`/images/products/product-${params.slug}.JPG`} width={450} height={650} alt="Product Image" />
            </div>
        </div>
    )
}