"use client";

import React, { useContext } from 'react';
import { CheckoutItemsContext } from '.././context/checkout.context';

export default function CheckoutSuccess() {
    const { checkoutItems, address } = useContext(CheckoutItemsContext);
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
                    <p>${checkoutItems.orderTotal}</p>
                </div>
            {checkoutItems.paymentMethod === 'Zelle' && <>
                <h2>Bank Details</h2>
                <div className='order-details'>
                    <h5>Zelle ID</h5>
                    <p>skarunwi@gmail.com</p>
                </div>
            </>}
            <h2>Order details</h2>
            <div className='order-details'>
            <div className='product-details'>
            <div className='item-detail'>
            <h5>Product</h5>
            {checkoutItems?.items?.map(item => (
                <div key={item.id}>
                    <span>{item.name}</span> x <span>{item.quantity}</span>
                </div>
            ))}
            </div>
            <div className='item-detail'>
            <h5>Total</h5>
            {checkoutItems?.items?.map(item => (
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

            {checkoutItems.paymentMethod === 'Zelle' && <div className='billling-shipping-details'>
                <div className='billing-details'>
                    <h3>Billing Details</h3>
                    <p>{address.billingAddress.firstName} &nbsp; {address.billingAddress.firstName}</p>
                    <p>{address.billingAddress.houseNumber} &nbsp; {address.billingAddress.street}</p>
                    <p>{address.billingAddress.city}</p>
                    <p>{address.billingAddress.state} &nbsp; {address.billingAddress.country}</p>
                    <p>{address.billingAddress.postCode} </p>
                    <p>{address.billingAddress.email} </p>
                    <p>{address.billingAddress.phone}</p>
                </div>
                <div className='shipping-details'>
                    <h3>Shipping Details</h3>
                    <>
                    {address.useBillingAsShipping ? <>
                        <p>{address.billingAddress.firstName} &nbsp; {address.billingAddress.firstName}</p>
                        <p>{address.billingAddress.houseNumber} &nbsp; {address.billingAddress.street}</p>
                        <p>{address.billingAddress.city}</p>
                        <p>{address.billingAddress.state} &nbsp; {address.billingAddress.country}</p>
                        <p>{address.billingAddress.postCode} </p>
                        <p>{address.billingAddress.email} </p>
                        <p>{address.billingAddress.phone}</p>
                    </> : 
                    <>
                        <p>{address.shippingAddress.firstName} &nbsp; {address.shippingAddress.lastName}</p>
                        <p>{address.shippingAddress.houseNumber} &nbsp; {address.shippingAddress.street}</p>
                        <p>{address.shippingAddress.city}</p>
                        <p>{address.shippingAddress.state} &nbsp; {address.shippingAddress.country}</p>
                        <p>{address.shippingAddress.postCode} </p>
                        <p>{address.shippingAddress.email} </p>
                        <p>{address.shippingAddress.phone}</p>
                    </>}
                    </>
                </div>
            </div>}
        </div>
    )
}