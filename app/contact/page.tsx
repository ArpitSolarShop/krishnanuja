import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { createMetadata } from "@/lib/seo/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo/config";

export const metadata: Metadata = createMetadata({
  title: "Contact Us | Krishnanuja Renewables Solar EPC",
  description:
    "Get in touch with Krishnanuja Renewables for rooftop solar consultation, free site surveys, PM Surya Ghar subsidy assistance, and customized quotes.",
  path: "/contact",
  keywords: [
    "contact Krishnanuja Renewables",
    "solar consultation Varanasi",
    "solar installer phone number",
    "rooftop solar site visit",
  ],
});

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.name}`,
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "HomeAndConstructionBusiness",
      name: siteConfig.legalName,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
    },
  };

  return (
    <MarketingLayout>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      <JsonLd id="contact-schema" data={contactSchema} />
      <ContactSection />
    </MarketingLayout>
  );
}
