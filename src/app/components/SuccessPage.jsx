"use client";

import React, { useContext, useEffect } from 'react';
import { CheckoutItemsContext } from '.././context/checkout.context';

export default function CheckoutSuccess() {
    const { checkoutItems, address } = useContext(CheckoutItemsContext);

    async function handleCompleteOrder() {
        const orderDetails = {
          product_name: "SHOP CTRL PRINT",
          name: address.billingAddress.firstName,
          email: address.billingAddress.email,
          receipt_id: checkoutItems.orderID,
          date: checkoutItems.orderDate,
          receipt_details: checkoutItems.items.map((item) => {
            return {
              description: item.name,
              quantity: item.quantity,
              amount: item.unit_amount * item.quantity
            }
          }),
          total: checkoutItems.orderTotal,
          support_url: "info@shopctrlprint.com",
          company_name: "CTRL PRINT",
          company_address: "Lagos, Nigeria"
        };
        try {
          await fetch("https://completeorder-6sl3ws34aa-uc.a.run.app", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              orderDetails
            })
          })
        } catch(error) {
          console.error(error);
        }
      }

    useEffect(() => {
        // handleCompleteOrder();
        console.log('checked out!')
    }, []);

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
                    <p>{address.billingAddress.firstName} &nbsp; {address.billingAddress.lastName}</p>
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
                        <p>{address.billingAddress.firstName} &nbsp; {address.billingAddress.lastName}</p>
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