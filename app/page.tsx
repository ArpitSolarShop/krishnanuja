import HeroSection from "@/components/HeroSection";
import SubsidyCalculator from "@/components/SubsidyCalculator";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import MarketingLayout from "@/components/layout/MarketingLayout";

export default function Home() {
  return (
    <MarketingLayout>
      <main>
        <HeroSection />
        <SubsidyCalculator />
        <AboutSection />
        <ProductsSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <PartnersSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
    </MarketingLayout>
  );
}
