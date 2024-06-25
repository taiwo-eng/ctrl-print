"use client";

import { useContext } from "react";
import { CartItemsContext } from "../context/cart.context";
import Image from "next/image";

export default function Cart() {
    const { cartItems, cartOpen } = useContext(CartItemsContext);


    function calculateSubtotal() {
        const sumWithInitial = cartItems.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
        0)
        return sumWithInitial;
    }
    return (
        <div className={`cart ${cartOpen ? '-opened' : '-closed'}`}>
            {cartItems.map((item) => (
                <div className="cart-item" key={item.slug}>
                    <div className="product-info_thumbnail">
                    <Image className="thumbnail" src={`/images/products/product-${item.slug}.JPG`} width={113} height={113} alt="Product Thumbnail" />
                    <div className="info">
                        <p>{item.item}</p>
                        <p>{item.size}</p>
                        <p>${item.price}</p>
                    </div>
                    </div>
                    <div className="remove-item">X</div>
                </div>
            ))}

            <div className="cart-cost">
                <div className="subtotal">
                    <p>SUBTOTAL</p>
                    <p>${calculateSubtotal()}</p>
                </div>
                <div className="shipping">
                    <p>SHIPPING</p>
                    <p>$4.99</p>
                </div>
                <div className="total">
                    <p>TOTAL</p>
                    <p>${calculateSubtotal() + 4.99}
                        <p>Including VAT</p>
                    </p>
                </div>
            </div>
            <div className="cart-checkout">
                <p>CHECKOUT</p>
            </div>
        </div>
    )
}