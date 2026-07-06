import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Krishnanuja Renewables",
  description: "Privacy Policy and data protection guidelines for Krishnanuja Renewables.",
};

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last Updated: {currentDate}</p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Krishnanuja Renewables ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website krishnanuja.com or engage with our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Request a quote or consultation for solar installation.</li>
              <li>Fill out forms on our website (including your name, address, phone number, and electricity bill details).</li>
              <li>Contact us via WhatsApp, email, or phone.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide personalized solar estimates and designs.</li>
              <li>Communicate with you regarding our services, site visits, and installations.</li>
              <li>Assist with government subsidy applications (e.g., PM Surya Ghar Yojana) on your behalf, with your consent.</li>
              <li>Improve our website and customer service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information to third parties. We may share your information with our trusted partners, 
              installers, or government agencies strictly for the purpose of completing your solar installation and securing your subsidies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
              <br /><br />
              <strong>Krishnanuja Renewables</strong><br />
              Varanasi, Uttar Pradesh, India<br />
              Phone: +91 7905763618
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
