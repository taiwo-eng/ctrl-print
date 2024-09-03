"use client";

import React, { createContext, useState } from 'react';

export const CheckoutItemsContext = createContext({
    checkoutItems: {
            orderID: '',
            orderDate: '',
            paymentMethod: '',
            orderTotal: 0,
            items: []
        }
})

export default function CheckoutContext({
    children,
  }) {
    const [checkoutItems, setCheckoutItems] = useState({});

    return (
        <CheckoutItemsContext.Provider value={{checkoutItems, setCheckoutItems}}>
            {children}
        </CheckoutItemsContext.Provider>
    )
}