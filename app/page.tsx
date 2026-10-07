import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import ServicesGrid from "@/components/home/ServicesGrid";
import Industries from "@/components/home/Industries";
import WhyUs from "@/components/home/WhyUs";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />
      <Industries />
      <WhyUs />
      <FeaturedWorks />
      <CTABanner />
    </>
  );
}
