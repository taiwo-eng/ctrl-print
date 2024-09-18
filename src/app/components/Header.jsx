"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";
import { useContext } from "react";
import { CartItemsContext } from "../context/cart.context";
import Cart from "./Cart";

export function Header() {
  const pathname = usePathname();
  const { cartItems, cartOpen, setCartOpen } = useContext(CartItemsContext);

  function calculateCartQuantity() {
    const sumWithInitial = cartItems.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity),
    0)
    return sumWithInitial;
}
  return (
    <>
      {pathname !== '/checkout/success' && <div className="promo-banner">
        END OF SUMMER SALE UP TO 20%. JOIN OUR MAILING LIST AND GET 10% OFF ACCESSORIES.
      </div>}
      <header className="header">
        <div className="logo">
            <Link href="/">
              <Image src="./logo.svg" alt="Ctrl print banner" width={100} height={100} className="header-logo" />
              <p>CTRL +PRINT</p>
            </Link>
      </div>
        <div className="toggle-cart">
          <p onClick={() => setCartOpen(!cartOpen)}>CART  &nbsp; &nbsp; {calculateCartQuantity()}</p>
          {cartOpen && <Cart />}
        </div>
      </header>
    </>
  );
}
