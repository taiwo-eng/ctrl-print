"use client";

import React, { createContext, useState } from 'react';

export const CartItemsContext = createContext({});

export default function CartContext({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    return (
        <CartItemsContext.Provider value={{cartItems, setCartItems, cartOpen, setCartOpen}}>
            {children}
        </CartItemsContext.Provider>
    )
}