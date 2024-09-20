"use client";

import React, { createContext, useState, useRef } from 'react';

export const CartItemsContext = createContext({});

export default function CartContext({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const modalRef = useRef(null)
    return (
        <CartItemsContext.Provider value={{cartItems, setCartItems, cartOpen, setCartOpen, modalRef}}>
            {children}
        </CartItemsContext.Provider>
    )
}