"use client"
import React, { useState } from 'react';

import { Marquee } from "./components/Marquee";
import { HomePageProducts } from "./components/HomePageProducts";
import { Banner } from "./components";
import MailingList from "./components/MailingList";


export default function Home() {
  const [showModal, setShowModal] = useState(true);
  return (
    <main className="content">
      <MailingList setShowModal={setShowModal} showModal={showModal} />
      <Banner />
      <Marquee />
      <HomePageProducts />
    </main>
  );
}
