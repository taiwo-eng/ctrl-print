import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CTRL PRINT - Checkout",
    description: "",
  };

export default function CheckoutFormLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
        <section>
            {children}
        </section>
    )
}