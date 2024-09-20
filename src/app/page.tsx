"use client"
import React, { useState } from 'react';

import { Marquee } from "./components/Marquee";
import { HomePageProducts } from "./components/HomePageProducts";
import { Banner } from "./components";
import MailingList from "./components/MailingList";


export default function Home() {
  return (
    <main className="content">
      <MailingList />
      <Banner />
      <Marquee />
      <HomePageProducts />
    </main>
  );
}
