"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Arrow } from "./Arrow";
import { Banner } from "./Banner";

export function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="header">
        <div className="logo">
            <Link href="/">
              <img src="./logo.svg" alt="Ctrl print banner" className="header-logo" />
              <p>CTRL +PRINT</p>
            </Link>
      </div>
        <div className="cart">
          <p>CART  &nbsp; &nbsp; (0)</p>
        </div>
      </header>
    </>
  );
}
