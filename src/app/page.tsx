import type { Metadata } from "next";

import { Marquee } from "./components/Marquee";
import { HomePageProducts } from "./components/HomePageProducts";
import { Banner } from "./components";

export const metadata: Metadata = {
  title: "CTRL PRINT - Homepage",
  description: "",
};

export default function Home() {
  return (
    <main className="content">
      <Banner />
      <Marquee />
      <HomePageProducts />
    </main>
  );
}
