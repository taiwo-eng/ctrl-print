"use client";

import React, { useContext } from 'react';
import { CheckoutItemsContext } from '.././context/checkout.context';

export default function CheckoutSuccess() {
    const { checkoutItems } = useContext(CheckoutItemsContext);
    return (
        <div className='checkout-success'>
            <h1>Order received</h1>
            <p>Thank you. Your order has been received.</p>
            <h2>Order summary</h2>
                <div className='checkout-summary'>
                    <h4>ORDER NUMBER</h4>
                    <p>{checkoutItems.orderID}</p>
                    <h4>DATE</h4>
                    <p>{checkoutItems.orderDate}</p>
                    <h4>PAYMENT METHOD</h4>
                    <p>{checkoutItems.paymentMethod}</p>
                    <h4>TOTAL</h4>
                    <p>{`$${checkoutItems.orderTotal}`}</p>
                </div>
            <h2>Order details</h2>
            <div className='order-details'>
            <div className='product-details'>
            <div className='item-detail'>
            <h5>Product</h5>
            {checkoutItems.items.map(item => (
                <div key={item.id}>
                    <span>{item.name}</span> x <span>{item.quantity}</span>
                </div>
            ))}
            </div>
            <div className='item-detail'>
            <h5>Total</h5>
            {checkoutItems.items.map(item => (
                <div key={item.id}>
                    <p>{`$${item.unit_amount * item.quantity}`}</p>
                </div>
            ))}
            </div>
            </div>
            <div className='product-details'>
            <h5>Total</h5>
            <p>${checkoutItems.orderTotal}</p>
            </div>
            </div>
        </div>
    )
}