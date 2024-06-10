import React from 'react';
import type { Metadata } from "next";
import ProductDetailPage from './page';

export const metadata: Metadata = {
    title: "CTRL PRINT - Product",
    description: "",
  };

export default function ProductDetailLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    )
}