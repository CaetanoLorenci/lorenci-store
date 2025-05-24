import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { HeroSection } from "@/components/layout/sections/hero";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { ProductSection } from "@/components/layout/sections/product";
import { AboutSection } from "@/components/layout/sections/about";



export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProductSection />
      <BenefitsSection />
      <AboutSection />
      <TestimonialSection />
      <ContactSection />
      <FAQSection />
    </main>
  );
}
