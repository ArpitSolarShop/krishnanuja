import React from "react";
import type { Metadata } from "next";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { createMetadata } from "@/lib/seo/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy | Krishnanuja Renewables",
  description:
    "Privacy Policy and personal data protection principles for Krishnanuja Renewables Private Limited website visitors and solar customers.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
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
          { name: "Privacy Policy", url: "/privacy-policy" },
        ]}
      />
      <div className="min-h-screen bg-background pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground mb-12">Last Updated: {currentDate}</p>

          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Welcome to Krishnanuja Renewables (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website krishnanuja.com or engage with our services.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our solar products and services, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Name, phone number, and email address</li>
                <li>Pincode, city, and state for site survey feasibility</li>
                <li>Electricity consumption details (monthly bill amounts, connected load)</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
