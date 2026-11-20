import type { Metadata } from "next";
import AdvancedSystemBuilder from "@/components/system-builder/AdvancedSystemBuilder";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { createMetadata } from "@/lib/seo/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo/config";

export const metadata: Metadata = createMetadata({
  title: "Build Your Solar System | Interactive Sizing & Cost Configurator",
  description:
    "Design and customize your rooftop solar power system. Select panels, inverters, and battery storage to get an instant tailored quote and subsidy estimate.",
  path: "/build-your-system",
  keywords: [
    "solar system calculator",
    "solar panel cost estimator India",
    "rooftop solar design tool",
    "PM Surya Ghar calculator",
    "solar battery sizing",
  ],
});

export default function BuildYourSystemPage() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Krishnanuja Solar System Builder",
    url: `${siteConfig.url}/build-your-system`,
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    description:
      "Interactive drag-and-drop solar system configurator and quote builder for residential and commercial solar installations.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <MarketingLayout>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "System Builder", url: "/build-your-system" },
        ]}
      />
      <JsonLd id="tool-schema" data={toolSchema} />

      <main className="pt-24 pb-16 bg-background min-h-screen">
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <div className="text-center max-w-3xl mx-auto mb-10 print:hidden">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Build Your Solar System
            </h1>
            <p className="text-xl text-muted-foreground">
              Drag and drop solar components to design your custom system. Get a personalized quote and subsidy calculation from our experts instantly.
            </p>
          </div>
          
          <AdvancedSystemBuilder />
        </div>
      </main>
    </MarketingLayout>
  );
}
