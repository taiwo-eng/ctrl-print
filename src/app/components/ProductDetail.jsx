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
    const { setCartItems, cartItems } = useContext(CartItemsContext);
    const { products } = useContext(ProductItemsContext);

    function getProduct() {
        const product = products.find((product) => product.id === params.slug[0]);
        return product;
    }

    function discountPrice(product) {
        if (product.category !== 'jewelry' && product.category === 'long dress') {
            const discountPrice = parseFloat(product.price) - (parseFloat(product.price) * 0.2);
            return discountPrice
        } else if (product.category !== 'jewelry' && product.category === 'short dress') {
            const discountPrice = parseFloat(product.price) - (parseFloat(product.price) * 0.1);
            return discountPrice
        }
    }

    function handleAddToCart (slug) {
        const id = window.crypto.randomUUID();
        const itemExists = cartItems.find(item => item.slug == slug)
        if (itemExists) {
            const updatedCart = cartItems.filter((item) => item.slug !== itemExists.slug);
            setCartItems((prevState) => ([...updatedCart, {
                id: itemExists.id, 
                slug: itemExists.slug, 
                name: `${params.slug[1].replace('%3A', ": ").split("%20").join(" ")}`,
                description: itemExists.description,
                unit_amount: itemExists.unit_amount, 
                quantity: itemExists.quantity + itemCount,
                category: itemExists.category
            }]))
        } else {
            setCartItems((prevState) => ([...prevState, {
                id, 
                slug: params.slug[0], 
                name: `${params.slug[1].replace('%3A', ": ").split("%20").join(" ")}`,
                description: getProduct().description,
                unit_amount: getProduct().category === 'jewelry' ? getProduct().price : `${discountPrice(getProduct())}`, 
                quantity: itemCount,
                category: getProduct().category
            }]))
        }
    }
    return (
        <>
            <div className='product-detail'>
            <div className='details-add-to-cart'>
            <div className="product-summary">
                <p className="product-title">
                    {params.slug[1].replace('%3A', ": ").split("%20").join(" ")}
                </p>
                <p className="product-description">{getProduct().description}</p>
            </div>
            <div className='item-count_size-selection'>
                <div className='item-count'>
                    <span aria-disabled={itemCount === 1} onClick={() => setItemCount(itemCount - 1)} className='reduce-count'>-</span>
                    <span>{itemCount}</span>
                    <span aria-disabled={itemCount > 10} onClick={() => setItemCount(itemCount + 1)} className='increase-count'>+</span>
                </div>
            </div>
            <div className='price_add-to-cart'>
            {getProduct().category !== 'jewelry' && <p className='item-price'>$<span className='full-price'>{getProduct().price}</span>  $<span>{discountPrice(getProduct())}</span></p>}
            {getProduct().category === 'jewelry' && <p className='item-price'>${getProduct().price} </p>}
                <p className='add-to-cart' onClick={() => handleAddToCart(params.slug[0])}>ADD TO CART</p>
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