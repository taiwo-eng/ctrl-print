import { Marquee } from "./components/Marquee";
import { Footer } from "./components/Footer";
import { HomePageProducts } from "./components/HomePageProducts";

export default function Home() {
  return (
    <main className="content">
      <Marquee />
      <HomePageProducts />
      <Footer />
    </main>
  );
}
