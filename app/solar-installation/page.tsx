import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Award } from "lucide-react";
import locationsData from "@/data/locations.json";
import MarketingLayout from "@/components/layout/MarketingLayout";
import LocationsDirectoryClient, {
  LocationItem,
} from "@/components/locations/LocationsDirectoryClient";
import { createMetadata } from "@/lib/seo/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo/config";

const locations = locationsData as LocationItem[];

export const metadata: Metadata = createMetadata({
  title: "Rooftop Solar Installation in Uttar Pradesh | Service Locations & Subsidies",
  description:
    "Explore rooftop solar panel installation services across Varanasi, Chandauli, Mirzapur, Jaunpur, Ghazipur, Bhadohi & UP. Check local solar prices, DISCOM subsidies up to ₹1,08,000 & book site visits.",
  path: "/solar-installation",
  keywords: [
    "solar installation Uttar Pradesh",
    "solar company in Varanasi",
    "PM Surya Ghar subsidy UP",
    "rooftop solar installer Chandauli",
    "solar panel price Mirzapur",
    "Tata solar dealer Jaunpur",
    "solar EPC Ghazipur",
    "best solar installer Bhadohi",
  ],
});

export default function SolarInstallationDirectoryPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Krishnanuja Solar Installation Service Locations in Uttar Pradesh",
    description:
      "Directory of rooftop solar installation service areas covering Varanasi, Chandauli, Mirzapur, Jaunpur, Ghazipur, Bhadohi, Mau, and Sonbhadra.",
    url: `${siteConfig.url}/solar-installation`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: locations.slice(0, 50).map((loc, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: `Solar Installation in ${loc.name}`,
        url: `${siteConfig.url}/solar-installation/${loc.slug}`,
      })),
    },
  };

  return (
    <MarketingLayout>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Solar Installation", url: "/solar-installation" },
        ]}
      />
      <JsonLd id="locations-collection-schema" data={collectionSchema} />

      <main className="min-h-screen bg-background pt-24 pb-24">
        {/* Hero Section */}
        <div className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-border/50 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 font-bold px-4 py-2 text-sm rounded-full border-0">
              Coverage Across Eastern Uttar Pradesh
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Solar Installation Across <br />
              <span className="text-primary">140+ Neighborhoods & Districts</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Find your city or locality below for doorstep site surveys, customized system engineering, 
              and direct government subsidies up to <strong className="text-foreground">₹1,08,000</strong> under PM Surya Ghar Muft Bijli Yojana.
            </p>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm font-semibold text-foreground/80">
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Net-Metering with PuVVNL
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> 25-Year Panel Warranty
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Authorized Tata & Reliance Partner
              </span>
            </div>
          </div>
        </div>

        {/* Directory Search & Grid */}
        <div className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
          <LocationsDirectoryClient locations={locations} />
        </div>

        {/* Bottom Banner */}
        <div className="container mx-auto px-4 max-w-5xl mt-12">
          <div className="bg-foreground text-background rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black">
              Don&apos;t See Your Exact Locality Listed?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto opacity-90">
              We provide turnkey Solar EPC services across all districts of Uttar Pradesh and neighboring states. 
              Our mobile survey team will visit your site within 24 hours.
            </p>
            <div className="pt-2">
              <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/#get-quote">
                  Book Free Site Survey <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </MarketingLayout>
  );
}
