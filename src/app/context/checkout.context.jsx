"use client";

import React, { createContext, useState } from 'react';

export const CheckoutItemsContext = createContext({
    checkoutItems: {
            orderID: '',
            orderDate: '',
            paymentMethod: '',
            orderTotal: 0,
            items: []
    },
    address: {
        billingAddress: {
            firstName: '',
            lastName: '',
            country: '',
            houseNumber: '',
            street: '',
            city: '',
            state: '',
            postCode: '',
            email: '',
            phone: ''
        },
        shippingAddress: {
            firstName: '',
            lastName: '',
            country: '',
            houseNumber: '',
            street: '',
            city: '',
            state: '',
            postCode: '',
            email: '',
            phone: ''
        },
        useBillingAsShipping: true
    }
})

export default function CheckoutContext({
    children,
  }) {
    const [checkoutItems, setCheckoutItems] = useState({});
    const [address, setAddress] = useState({
        billingAddress: {
            firstName: '',
            lastName: '',
            country: '',
            houseNumber: '',
            street: '',
            city: '',
            state: '',
            postCode: '',
            email: '',
            phone: ''
        },
        shippingAddress: {
            firstName: '',
            lastName: '',
            country: '',
            houseNumber: '',
            street: '',
            city: '',
            state: '',
            postCode: '',
            email: '',
            phone: ''
        },
        useBillingAsShipping: true
    })

    return (
        <CheckoutItemsContext.Provider value={{checkoutItems, setCheckoutItems, address, setAddress}}>
            {children}
        </CheckoutItemsContext.Provider>
    )
}