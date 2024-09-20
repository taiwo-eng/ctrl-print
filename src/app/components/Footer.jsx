"use client";

import Link from "next/link"
import { useContext } from "react"
import { CartItemsContext } from "../context/cart.context"

/* eslint-disable @next/next/no-img-element */
export function Footer () {
    const { modalRef } = useContext(CartItemsContext)
    return (
        <div className="footer">
            <div className="footer-rights">
                <img src="./footer-logo.svg" alt="footer logo" />
                <p>ALL RIGHTS RESERVED</p>
            </div>
            <div className="mailing-list-footer" onClick={() => modalRef.current.showModal()}>
                <p>
                    Join our mailing list
                </p>
            </div>
            <div className="contact-via-email">
                <p>
                    <Link href={`/terms-conditions`}>
                    Terms & Conditions
                </Link>
                </p>
            </div>
        </div>
    )
}