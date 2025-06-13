import Navbar from "@/components/landing page/Navbar";
import HeroSection from "@/components/landing page/HeroSection";
import HowWeWork from "@/components/landing page/HowWeWork";
import BrowseMerchants from "@/components/landing page/BrowseMerchants";
import WorldSection from "@/components/landing page/WorldSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <HowWeWork />
      <BrowseMerchants />
      <WorldSection />
    </div>
  );
}
