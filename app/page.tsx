import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SubsidyCalculator from "@/components/SubsidyCalculator";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import ProductsSection from "@/components/ProductsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { createMetadata } from "@/lib/seo/metadata";
import { primaryKeywords } from "@/lib/seo/keywords";

export const metadata: Metadata = createMetadata({
  title: "Top Solar Installer in Varanasi | Krishnanuja Renewables (Arpit Solar)",
  description:
    "Varanasi's leading Solar EPC contractor & UPNEDA empaneled vendor. 12+ years experience, 25MW+ installed. Turnkey residential, commercial, solar atta chakki & agricultural pump solutions with up to ₹1,08,000 PM Surya Ghar subsidy.",
  path: "/",
  keywords: [
    "top solar installer in varanasi",
    "best solar company in varanasi",
    "solar panel installation varanasi",
    "rooftop solar varanasi upneda",
    "solar company in varanasi with subsidy",
    "krishnanuja renewables",
    "arpit solar shop varanasi",
    "pm surya ghar subsidy varanasi",
    "solar water pump varanasi",
    "solar atta chakki varanasi",
    ...primaryKeywords,
  ],
});

export default function Home() {
  return (
    <MarketingLayout>
      <main>
        <HeroSection />
        <SubsidyCalculator />
        <ServicesSection />
        <ProductsSection />
        <PartnersSection />
        <ProjectsSection />
        <ProcessSection />
        <AboutSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
    </MarketingLayout>
  );
}
