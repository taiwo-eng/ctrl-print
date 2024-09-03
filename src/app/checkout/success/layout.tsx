import React from 'react';
import type { Metadata } from "next";

import "./layout.css";

export const metadata: Metadata = {
    title: "CTRL PRINT - Checkout",
    description: "",
  };

export default function CheckoutPageLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
        <section>
            {children}
        </section>
    )
}