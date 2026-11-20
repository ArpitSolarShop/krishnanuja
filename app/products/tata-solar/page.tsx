import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { createMetadata } from "@/lib/seo/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import JsonLd from "@/components/seo/JsonLd";
import { generateProductSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title: "Tata Power Solar Rooftop Solutions | Krishnanuja Renewables",
  description:
    "Authorized channel partner for Tata Power Solar in Uttar Pradesh. High-efficiency mono PERC modules, string inverters, 25-year warranty, and PM Surya Ghar subsidies.",
  path: "/products/tata-solar",
  keywords: [
    "Tata Power Solar dealer Varanasi",
    "Tata solar panel price in UP",
    "Tata rooftop solar installation",
    "Tata solar mono PERC modules",
    "Tata solar inverter",
    "PM Surya Ghar Tata solar",
  ],
  image: "/Tata Power Solar.webp",
});

export default function TataSolarPage() {
  const productSchema = generateProductSchema({
    name: "Tata Power Solar PV Modules & Inverters",
    description:
      "Industry-leading Mono PERC solar modules and string inverters with 25-year performance warranty and authorized installation by Krishnanuja Renewables.",
    brand: "Tata Power Solar",
    image: "/Tata Power Solar.webp",
    category: "Solar PV Modules",
  });

  return (
    <MarketingLayout>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
          { name: "Tata Power Solar", url: "/products/tata-solar" },
        ]}
      />
      <JsonLd id="tata-product-schema" data={productSchema} />

      <main className="pt-24 pb-16 bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-secondary/50 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-4">
                    Authorized Tata Power Solar Partner
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                    Harness the Sun with India&apos;s #1 Solar Brand.
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Krishnanuja Renewables is an authorized partner for Tata Power Solar, bringing you premium quality, unmatched reliability, and government subsidy support under PM Surya Ghar Yojana.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/#get-quote">
                    <Button size="lg" className="rounded-full px-8 text-base h-12">
                      Get a Free Quote
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-white/50 border border-border/50 shadow-2xl flex items-center justify-center p-8">
                <Image
                  src="/Tata Power Solar.webp"
                  alt="Tata Power Solar Official Logo and Solutions"
                  width={400}
                  height={300}
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Premium Components</h2>
              <p className="text-lg text-muted-foreground">Every Tata Power Solar installation comes with industry-leading components engineered for maximum efficiency and durability.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Solar PV Modules",
                  features: ["High-Efficiency Mono PERC", "PID Resistant", "Durable Build"],
                  benefits: ["Maximize energy generation", "Reliable for 25+ years", "Great ROI"],
                },
                {
                  title: "String Inverters",
                  features: ["High Conversion Efficiency", "IP65 Rated", "Remote Monitoring"],
                  benefits: ["Optimize power output", "Safe operation", "Track performance"],
                },
                {
                  title: "Mounting Structures",
                  features: ["Corrosion-Resistant GI", "High Wind Speed Design", "Quick Installation"],
                  benefits: ["Ensures panel safety", "Long lifespan", "Optimal orientation"],
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold text-foreground mb-6">{item.title}</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Features</h4>
                      <ul className="space-y-2">
                        {item.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {item.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subsidy Banner */}
        <section className="py-20 bg-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-full mb-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              PM Surya Ghar <span className="text-primary">मुफ्त बिजली योजना</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Avail maximum government subsidies on your Tata Power Solar installation through our UPNEDA empaneled services.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-background border border-border/50 p-8 rounded-3xl shadow-sm">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-3">₹90,000</p>
                <p className="text-lg font-medium text-foreground">Subsidy for 2 kWp Systems</p>
              </div>
              <div className="bg-background border border-border/50 p-8 rounded-3xl shadow-sm">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-3">₹1,08,000</p>
                <p className="text-lg font-medium text-foreground">Total subsidy for systems ≥ 3 kWp</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
