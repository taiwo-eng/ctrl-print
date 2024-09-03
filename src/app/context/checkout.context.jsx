"use client";

import React, { createContext, useState } from 'react';

export const CheckoutItemsContext = createContext({})

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