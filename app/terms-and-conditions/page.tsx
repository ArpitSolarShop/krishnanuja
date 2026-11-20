import React from "react";
import type { Metadata } from "next";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { createMetadata } from "@/lib/seo/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = createMetadata({
  title: "Terms and Conditions | Krishnanuja Renewables",
  description:
    "Terms and Conditions governing the use of Krishnanuja Renewables website, solar EPC consultations, quotations, and installation services.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <MarketingLayout>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Terms and Conditions", url: "/terms-and-conditions" },
        ]}
      />
      <div className="min-h-screen bg-background pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Terms and Conditions</h1>
          <p className="text-muted-foreground mb-12">Last Updated: {currentDate}</p>

          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing our website at krishnanuja.com, you agree to be bound by these Terms and Conditions and agree that you are responsible for compliance with any applicable local laws. 
                If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Solar Quotations & Feasibility</h2>
              <p>
                Calculations and quotes generated via our online quotation forms and System Builder are indicative estimates based on user inputs. 
                Final system pricing, equipment sizing, and net-metering approval are subject to an on-site technical survey and DISCOM sanction.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
