import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import MarketingLayout from "@/components/layout/MarketingLayout";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Talk to Krishnanuja Renewables about a solar installation, site visit, or tailored quotation.",
};

export default function ContactPage() {
  return (
    <MarketingLayout>
      <ContactSection />
    </MarketingLayout>
  );
}
