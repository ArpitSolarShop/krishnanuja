import React from "react";
import type { Metadata } from "next";
import MarketingLayout from "@/components/layout/MarketingLayout";

export const metadata: Metadata = {
  title: "Terms and Conditions | Krishnanuja Renewables",
  description: "Terms and Conditions for using Krishnanuja Renewables services and website.",
};

export default function TermsAndConditionsPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <MarketingLayout>
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
            <h2 className="text-2xl font-semibold mb-4">2. Services and Estimates</h2>
            <p>
              The solar power estimates, savings calculations, and quotes provided on our website are approximations based on the data you provide and average regional conditions. 
              Actual system size, cost, and energy generation will be determined only after a physical site assessment by our engineering team. 
              Prices and government subsidy policies (such as the PM Surya Ghar Yojana) are subject to change without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Information</h2>
            <p>
              By submitting your information (name, phone number, address) through our contact forms, quote calculators, or WhatsApp links, 
              you authorize Krishnanuja Renewables to contact you regarding your solar inquiry, even if your number is registered on a Do Not Call (DNC) registry.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Limitations of Liability</h2>
            <p>
              In no event shall Krishnanuja Renewables or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on our website, even if Krishnanuja Renewables or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Uttar Pradesh, India.
            </p>
          </section>
        </div>
      </div>
    </div>
    </MarketingLayout>
  );
}
