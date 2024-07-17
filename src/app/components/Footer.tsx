import Link from "next/link"

/* eslint-disable @next/next/no-img-element */
export function Footer () {
    return (
        <div className="footer">
            <div className="footer-rights">
                <img src="./footer-logo.svg" alt="footer logo" />
                <p>ALL RIGHTS RESERVED</p>
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