"use client";

import { useContext, useEffect, useRef } from "react";
import { CartItemsContext } from "../context/cart.context";
import Image from "next/image";
import Link from 'next/link';
import { CheckoutItemsContext } from "../context/checkout.context";

export default function Cart() {
    const { cartItems, cartOpen, setCartItems, setCartOpen } = useContext(CartItemsContext);
    const { setCheckoutItems } = useContext(CheckoutItemsContext);
    const cartRef = useRef(null);

    useEffect(() => {
  
      const handleClickOutside = (event) => {
        if (cartOpen && !cartRef.current.contains(event.target)) {
          setCartOpen(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, []);

    function deleteFromCart(id) {
      let newCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(newCartItems);
    }

    function calculateSubtotal() {
        const sumWithInitial = cartItems.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.unit_amount * currentValue.quantity),
        0)
        return Number(sumWithInitial).toFixed(2);
    }


    return (
        <div ref={cartRef} className={`cart ${cartOpen ? '-opened' : '-closed'}`}>
            {cartItems.map((item) => (
                <div className="cart-item" key={item.slug}>
                    <div className="product-info_thumbnail">
                    <Image className="thumbnail" src={`/images/products/product-${item.slug}.JPG`} width={113} height={113} alt="Product Thumbnail" />
                    <div className="info">
                        <p>{item.name.split("%20").join(" ")}</p>
                        <p>Size: {item.size}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>${item.unit_amount}</p>
                    </div>
                    </div>
                    <div onClick={() => deleteFromCart(item.id)} className="remove-item">X</div>
                </div>
            ))}

            <div className="cart-cost">
                <div className="subtotal">
                    <p>SUBTOTAL</p>
                    <p>${calculateSubtotal()}</p>
                </div>
                <div className="total">
                    <p>TOTAL</p>
                    <p>${calculateSubtotal()}
                        <p className="vat-note">Including VAT</p>
                    </p>
                </div>
            </div>
            <Link href="/checkout/form" className="checkout-link">
            <div className="cart-checkout">
            <p onClick={() => {
              const date = new Date();
              const orderDate = date.toLocaleDateString()
              setCartOpen(false);
              setCheckoutItems(() => ({
                orderID: '',
                orderDate,
                orderTotal: calculateSubtotal(),
                paymentMethod: 'Zelle',
                items: cartItems
              }));
            }}>
              CHECKOUT
            </p>
            </div>
            </Link>
        </div>
    )
}