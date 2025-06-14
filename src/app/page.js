import Navbar from "@/components/landing page/Navbar";
import HeroSection from "@/components/landing page/HeroSection";
import HowWeWork from "@/components/landing page/HowWeWork";
import BrowseMerchants from "@/components/landing page/BrowseMerchants";
import WorldSection from "@/components/landing page/WorldSection";
import StatisticsSection from "@/components/landing page/StatisticsSection";
import TestimonialsSection from "@/components/landing page/TestimonialsSection";
import NewsletterSection from "@/components/landing page/NewsletterSection";
import Footer from "@/components/landing page/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <HowWeWork />
      <BrowseMerchants />
      <WorldSection />
      <StatisticsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
