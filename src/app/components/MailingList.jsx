import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const document = window.document;
export default function MailingList({ showModal, setShowModal}) {
const [userEmail, setUserEmail] = useState("");
const modalRef = useRef(null)
// https://sendpromoemail-6sl3ws34aa-uc.a.run.app
async function handleMailingListOptIn() {
    if(userEmail !== "") {
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
        setShowModal(false);
    }
    setShowModal(false);
}

useEffect(() => {
  
    const handleClickOutside = (event) => {
      if (showModal && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);


  return (
    <>
      {showModal && createPortal(
        <div ref={modalRef} className='mailing-list__container'>
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
        </div>,
        document.body
      )}
    </>
  );
}
