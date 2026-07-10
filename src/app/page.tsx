import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Browse from "@/components/Browse";
import Journey from "@/components/Journey";
import Certs from "@/components/Certs";
import BottomBento from "@/components/BottomBento";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Browse />
        <Journey />
        <Certs />
        <BottomBento />
      </main>
      <Footer />
      <RevealInit />
    </>
  );
}
