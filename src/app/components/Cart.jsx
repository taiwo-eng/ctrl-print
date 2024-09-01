"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { CartItemsContext } from "../context/cart.context";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Cart() {
    const { cartItems, cartOpen, setCartItems, setCartOpen } = useContext(CartItemsContext);
    const [showPaypal, setShowPaypal] = useState(false)
    const router = useRouter();
    const cartRef = useRef(null);

    useEffect(() => {
  
      const handleClickOutside = (event) => {
        if (cartOpen && !cartRef.current.contains(event.target)) {
          setCartOpen(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, []);

    function deleteFromCart(id) {
      let newCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(newCartItems);
    }

    const initialOptions = {
        "client-id": process.env.PAYPAL_CLIENT_ID,
        "enable-funding": "venmo",
        "disable-funding": "",
        "currency": "USD",
        "data-page-type": "product-details",
        "components": "buttons",
        "data-sdk-integration-source": "developer-studio",
      };

    function calculateSubtotal() {
        const sumWithInitial = cartItems.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.unit_amount),
        0)
        return sumWithInitial;
    }

    async function handleCreateOrder() {
      const payPalCart = cartItems.map((item) => {
        return {
          name: item.name,
          quantity: item.quantity,
          unit_amount: {
            value: item.unit_amount,
            currency_code: "USD"
          },
          description: item.description
        }
      })
        try {
            const response = await fetch("https://createorder-6sl3ws34aa-uc.a.run.app", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // use the "body" param to optionally pass additional order information
              // like product ids and quantities
              body: JSON.stringify({
                cart: payPalCart,
              }),
            });

            const orderData = await response.json();

            if (orderData.id) {
              return orderData.id;
            } else {
              const errorDetail = orderData?.details?.[0];
              const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                : JSON.stringify(orderData);

              throw new Error(errorMessage);
            }
          } catch (error) {
            console.error(error);
          }
    }

    async function handleApproveOrder(data, actions) {
            try {
              const response = await fetch(
                `https://captureorder-6sl3ws34aa-uc.a.run.app`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    orderID: `${data.orderID}`
                  })
                }
              );

              const orderData = await response.json();
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                router.push('/checkout/error')
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                router.push('/checkout/error');
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                router.push('/checkout/success')
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                console.log(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
              }
            } catch (error) {
              router.push('/checkout/error');
              console.error(error);
              console.log(
                `Sorry, your transaction could not be processed...${error}`
              );
            }
    }

    return (
        <div ref={cartRef} className={`cart ${cartOpen ? '-opened' : '-closed'}`}>
            {cartItems.map((item) => (
                <div className="cart-item" key={item.slug}>
                    <div className="product-info_thumbnail">
                    <Image className="thumbnail" src={`/images/products/product-${item.slug}.JPG`} width={113} height={113} alt="Product Thumbnail" />
                    <div className="info">
                        <p>{item.name.split("%20").join(" ")}</p>
                        <p>{item.quantity}</p>
                        <p>${item.unit_amount}</p>
                    </div>
                    </div>
                    <div onClick={() => deleteFromCart(item.id)} className="remove-item">X</div>
                </div>
            ))}

            <div className="cart-cost">
                <div className="subtotal">
                    <p>SUBTOTAL</p>
                    <p>${calculateSubtotal()}</p>
                </div>
                <div className="total">
                    <p>TOTAL</p>
                    <p>${calculateSubtotal()}
                        <p className="vat-note">Including VAT</p>
                    </p>
                </div>
            </div>
            <div className="cart-checkout">
                {!showPaypal ? <p onClick={() => setShowPaypal(!showPaypal)}>CHECKOUT</p> : <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        style={{
                            shape: "rect",
                            layout: "vertical",
                            color: "gold",
                            label: "checkout",
                        }}
                        createOrder={handleCreateOrder}
                        onApprove={handleApproveOrder}
                        />
             </PayPalScriptProvider>}
            </div>
        </div>
    )
}