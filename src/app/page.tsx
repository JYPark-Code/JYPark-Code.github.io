import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Browse from "@/components/Browse";
import Journey from "@/components/Journey";
import Certs from "@/components/Certs";
import BottomBento from "@/components/BottomBento";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollSpy from "@/components/ScrollSpy";
import Starfield from "@/components/Starfield";
import Grain from "@/components/Grain";

export default function Home() {
  return (
    <>
      <Starfield />
      <Grain />
      <ScrollProgress />
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
      <ScrollSpy />
    </>
  );
}
