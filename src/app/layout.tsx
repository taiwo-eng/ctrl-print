import "./globals.css";
import { Header } from "./components";
import { Footer } from "./components/Footer";
import CartContext from "./context/cart.context";
import ProductContext from "./context/product.context";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="main-app-layout">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ProductContext>
          <CartContext>
            <Header />
            {children}
            <Footer />
          </CartContext>
        </ProductContext>
      </body>
    </html>
  );
}
