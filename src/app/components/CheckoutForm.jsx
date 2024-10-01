"use client";

import React, { useContext, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/navigation';

import { CheckoutItemsContext } from "../context/checkout.context";
import { CartItemsContext } from "../context/cart.context";
import AddressForm from './AddressForm';


export default function CheckoutForm() {
    const [checkoutMethod, setCheckoutMethod] = useState('');
    const [promoCode, setPromoCode] = useState('')
    const router = useRouter();
    const { setCheckoutItems, checkoutItems, address, setAddress, promoApplied, setPromoApplied } = useContext(CheckoutItemsContext);
    const { cartItems, setCartItems, setCartOpen } = useContext(CartItemsContext);

    function handlePromoCode({ target }) {
      const items = checkoutItems.items;
      const promoItems = items.filter((item) => item.tag === 'jewelry');
      const value = target.value.toLowerCase();
      setPromoCode(target.value);
      if (!promoApplied) {
        if(value === 'first10' && promoItems.length > 0) {
          const appliedPromoItems = promoItems.map((item) => {
            const discountPrice = parseFloat(item.unit_amount) - (parseFloat(item.unit_amount) * 0.1);
            return {
              ...item,
              unit_amount: discountPrice
            }
          });

          for(let i = 0; i < items.length; i++) {
            for(let j = 0; j < appliedPromoItems.length; j++) {
              if(items[i].id === appliedPromoItems[j].id) {
                items[i] = appliedPromoItems[j]
              }
            }
          }
          setPromoApplied(true);
          let sumWithInitial = items.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.unit_amount * currentValue.quantity),
      0)
          sumWithInitial =  Number(sumWithInitial).toFixed(2);
          setCheckoutItems((prevState) => {
            return {
              ...prevState,
              orderTotal: sumWithInitial,
              checkoutItems: items,
            }
          });

          
        }
      }
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

      async function handleCompleteOrder() {
        const orderDetails = {
          product_name: "SHOP CTRL PRINT",
          name: address.billingAddress.firstName,
          email: address.billingAddress.email,
          receipt_id: checkoutItems.orderID,
          date: checkoutItems.orderDate,
          receipt_details: checkoutItems.items.map((item) => {
            return {
              description: `${item.size ? `[${item.size}] - ` : ""} ${item.name}`,
              quantity: item.quantity,
              amount: item.unit_amount * item.quantity
            }
          }),
          total: checkoutItems.orderTotal,
          support_url: "info@shopctrlprint.com",
          company_name: "CTRL PRINT",
          company_address: "Lagos, Nigeria"
        };
        try {
          await fetch("https://completeorder-6sl3ws34aa-uc.a.run.app", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              orderDetails
            })
          });
        } catch(error) {
          console.error(error);
        }
        router.push('/checkout/success');
      }

      async function handleCreateOrder() {
        const payPalCart = cartItems.map((item) => {
          return {
            name: `${item.size ? `[${item.size}] - ` : ""} ${item.name}`,
            quantity: item.quantity,
            unit_amount: {
              // value: parseFloat(item.unit_amount),
              value: 1,
              currency_code: "USD"
            },
            description: item.description.split('.')[0]
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
                  const date = new Date();
                  const orderDate = date.toLocaleDateString()
                  setCheckoutItems(() => ({
                    orderID: data.orderID,
                    orderDate,
                    orderTotal: calculateSubtotal(),
                    paymentMethod: 'PayPal',
                    items: cartItems
                  }));
                  setCartOpen(false);
                  setCartItems([]);
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

    function toggleCheckoutUI() {
        switch (checkoutMethod) {
            case "PayPal":
                return (
                    <PayPalScriptProvider options={initialOptions}>
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
             </PayPalScriptProvider>
                )
            case "Zelle":
                return (
                    <div className='address-form-container'>
                        <h4>Promo Code</h4>
                        <label>
                        <input onChange={handlePromoCode} type="text" required value={promoCode} name="promoCode" /> {promoApplied && <span className='promo-applied'>Promo Code applied!</span>}
                        </label>
                        <h4>Billing Details</h4>
                        <AddressForm state={address.billingAddress} setState={setAddress} field={'billingAddress'} />
                        <p>Ship to same address as billing address? 
                            <input type="checkbox" checked={address.useBillingAsShipping} onChange={(e) => setAddress((prevState) => ({
                                ...prevState,
                                useBillingAsShipping: e.target.checked
                            }))} />
                        </p>
                        {!address.useBillingAsShipping && <>
                            <h4>Shipping Details</h4>
                            <AddressForm state={address.shippingAddress} setState={setAddress} field={'shippingAddress'} />
                        </>}
                    </div>
                )
            default:
                return null
        }
    }


    return (
        <div className='checkout-form'>
            <h1>Checkout</h1>
            <div className='container'>
            <div className='checkout-payment-method'>
                <h2>Select Payment Method</h2>
                <div className='payment-methods'>
                    <div className='payment-method-card' onClick={() => setCheckoutMethod('PayPal')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill={checkoutMethod === "PayPal" ? "darkgoldenrod" : "currentColor"} className="bi bi-paypal" viewBox="0 0 16 16">
                        <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.35.35 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91q.57-.403.993-1.005a4.94 4.94 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.7 2.7 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.7.7 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016q.326.186.548.438c.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.87.87 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.35.35 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32z"/>
                        </svg>
                    </div>

                    <div className='payment-method-card'  onClick={() => setCheckoutMethod('Zelle')}>
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill={checkoutMethod === "Zelle" ? "darkgoldenrod" : "currentColor"} d="M35,42H13c-3.866,0-7-3.134-7-7V13c0-3.866,3.134-7,7-7h22c3.866,0,7,3.134,7,7v22 C42,38.866,38.866,42,35,42z"/><path fill="#fff" d="M17.5,18.5h14c0.552,0,1-0.448,1-1V15c0-0.552-0.448-1-1-1h-14c-0.552,0-1,0.448-1,1v2.5	C16.5,18.052,16.948,18.5,17.5,18.5z"/><path fill="#fff" d="M17,34.5h14.5c0.552,0,1-0.448,1-1V31c0-0.552-0.448-1-1-1H17c-0.552,0-1,0.448-1,1v2.5	C16,34.052,16.448,34.5,17,34.5z"/><path fill="#fff" d="M22.25,11v6c0,0.276,0.224,0.5,0.5,0.5h3.5c0.276,0,0.5-0.224,0.5-0.5v-6c0-0.276-0.224-0.5-0.5-0.5	h-3.5C22.474,10.5,22.25,10.724,22.25,11z"/><path fill="#fff" d="M22.25,32v6c0,0.276,0.224,0.5,0.5,0.5h3.5c0.276,0,0.5-0.224,0.5-0.5v-6c0-0.276-0.224-0.5-0.5-0.5	h-3.5C22.474,31.5,22.25,31.724,22.25,32z"/><path fill="#fff" d="M16.578,30.938H22l10.294-12.839c0.178-0.222,0.019-0.552-0.266-0.552H26.5L16.275,30.298	C16.065,30.553,16.247,30.938,16.578,30.938z"/></svg>
                    </div>
                </div>
                {toggleCheckoutUI()}
            </div>
            <div className='checkout-order-details'>
                <h2>Your Order</h2>
                <div className='order-details'>
                    <div className='product-details'>
                            <div className='item-detail'>
                            <h5>Product</h5>
                                {checkoutItems?.items?.map(item => (
                                    <div key={item.id}>
                                        <span> {item.size ? `[${item.size}] - ` : ""} {item.name}</span> x <span>{item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='item-detail'>
                            <h5>Total</h5>
                                {checkoutItems?.items?.map(item => (
                                    <div key={item.id}>
                                        <span>{`$${item.unit_amount * item.quantity}`}</span>
                                    </div>
                                ))}
                            </div>
                    </div>
                    <div className='product-details'>
                    <h5>Total</h5>
                    <p>${checkoutItems.orderTotal}</p>
                    </div>
                </div>
                {checkoutMethod === 'Zelle' && <div className='bank-transfer-instruction'>
                <h3>• Direct bank transfer</h3>
                <p>Make your payment directly into <strong>Zelle ID skarunwi@gmail.com</strong>. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                ORDERS WOULD BE CANCELLED AFTER 12 HOURS IF PAYMENT IS NOT RECEIVED</p>
                </div>}

                <div className='personal-data-policy'>
                    <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                </div>

                {checkoutMethod === 'Zelle' && <div className="cart-checkout" onClick={handleCompleteOrder}>
                    <p>Place Order</p>
                </div>}
            </div>
         </div>
        </div>
    )
}