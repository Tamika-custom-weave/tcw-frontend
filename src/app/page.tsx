import Hero from "@/components/home/Hero";
import BrandLuxury from "@/components/home/BrandLuxury";
import ShopByCollection from "@/components/home/ShopByCollection";
import BrandStory from "@/components/home/BrandStory";
import CustomWig from "@/components/home/CustomWig";
import ProcessSection from "@/components/home/ProcessSection";
import Testimonials from "@/components/home/Testimonials";
import InstagramGallery from "@/components/home/InstagramGallery";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandLuxury />
      <ShopByCollection />
      <BrandStory />
      <CustomWig />
      <ProcessSection />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
