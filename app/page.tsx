import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowToUse from "@/components/HowToUse";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowToUse />
      </main>
      <Footer />
    </>
  );
}
