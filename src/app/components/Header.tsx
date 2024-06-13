"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";
import { useContext } from "react";
import { CartItemsContext } from "../context/cart.context";

export function Header() {
  const pathname = usePathname();
  const { cartItems } = useContext(CartItemsContext);
  return (
    <>
      <header className="header">
        <div className="logo">
            <Link href="/">
              <Image src="./logo.svg" alt="Ctrl print banner" width={100} height={100} className="header-logo" />
              <p>CTRL +PRINT</p>
            </Link>
      </div>
        <div className="cart">
          <p>CART  &nbsp; &nbsp; {cartItems.length}</p>
        </div>
      </header>
    </>
  );
}
