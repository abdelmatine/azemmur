
import { HeroSection } from "../components/home/hero-section";
import { SustainabilityTimeline } from "../components/home/sustainability-timeline";
import { Testimonials } from "../components/home/testimonials";
import { ProductsSection } from "../components/home/products-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <SustainabilityTimeline />
      <Testimonials />
    </>
  );
}
