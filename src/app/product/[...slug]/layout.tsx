import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CTRL PRINT - Product",
    description: "",
  };

export default function ProductDetailLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
        <section>
            {children}
        </section>
    )
}