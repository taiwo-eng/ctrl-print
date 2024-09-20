"use client"

import React from 'react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function MailingList() {
const [userEmail, setUserEmail] = useState("");
const modalRef = useRef(null)

async function handleMailingListOptIn() {
    if(userEmail !== "") {
        modalRef.current.close();
        try {
            await fetch("https://sendpromoemail-6sl3ws34aa-uc.a.run.app", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                userEmail
              })
            });
          } catch(error) {
            console.error(error);
          }
    }
    modalRef.current.close();
}

useEffect(() => {
    modalRef.current.showModal();
    const handleClickOutside = (event) => {
    if (!modalRef.current.contains(event.target)) {
        modalRef.current.close();
        }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);


  return (
    <>
      <dialog ref={modalRef} className='mailing-list__container'>
            <div className='sign-up-for-promo'>
                <Image src={`/images/products/product-9.JPG`} width={400} height={450} className='image' alt="Promo Image" />
                <div>
                    <h1>Welcome to CTRL PRINT</h1>
                    <h2>Drop your email for <span>10% off</span></h2>
                    <input type='email' value={userEmail} onChange={({ target }) => setUserEmail(target.value)} placeholder='Enter email address' />
                    <div className="button" aria-disabled={userEmail === ''} role='button' onClick={handleMailingListOptIn}>
                        <p>YES PLEASE</p>
                    </div>
                </div>
            </div>
        </dialog>
    </>
  );
}
