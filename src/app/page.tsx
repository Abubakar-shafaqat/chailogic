import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import SpinnerWheel from "@/components/SpinnerWheel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <MenuSection />
      <SpinnerWheel />
      <Footer />
    </main>
  );
}
