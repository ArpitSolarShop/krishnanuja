import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, ShieldCheck, Sun } from "lucide-react";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { createMetadata } from "@/lib/seo/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = createMetadata({
  title: "Tier-1 Solar Products & Brands | Krishnanuja Renewables",
  description:
    "Explore our range of Tier-1 solar panels, string inverters, and hybrid battery systems from authorized partners including Tata Power Solar, Waaree, and Reliance.",
  path: "/products",
  keywords: [
    "Tata Power Solar panels",
    "Waaree solar modules",
    "Reliance New Energy solar",
    "hybrid solar inverter India",
    "bifacial solar panels price",
    "Tier 1 solar equipment India",
  ],
});

const PRODUCTS = [
  {
    brand: "Tata Power Solar",
    logo: "/Tata Power Solar.webp",
    slug: "/products/tata-solar",
    description:
      "India's most trusted solar brand offering unparalleled reliability and performance for residential and commercial rooftops.",
    features: [
      "Tier-1 Mono PERC & Bifacial Modules",
      "25 Years Linear Performance Warranty",
      "High Efficiency in Low Light & Winter Irradiance",
      "PID Resistant & Cyclone Withstand Rating",
    ],
    image: "/hero-solar.png",
    tags: ["Tier-1 Brand", "Most Trusted"],
  },
  {
    brand: "Waaree Energies",
    logo: "/Waree.webp",
    slug: "/#get-quote",
    description:
      "India's largest solar panel manufacturer. Known for cutting-edge technology and robust panels suited for diverse Indian climates.",
    features: [
      "Bifacial High-Efficiency Dual-Glass Technology",
      "Up to 550W+ High Power Output Per Panel",
      "Anti-Reflective Hydrophobic Surface Coating",
      "Extreme Wind & Snow Load Mechanical Resistance",
    ],
    image: "/commercial-solar.png",
    tags: ["Best Value", "High Output"],
  },
  {
    brand: "Reliance Solar",
    logo: "/Reliance.webp",
    slug: "/products/reliance-new-energy",
    description:
      "State-of-the-art solar solutions backed by Reliance's massive scale and commitment to a green future.",
    features: [
      "Next-Gen Heterojunction (HJT) Technology",
      "Ultra-Low Thermal Degradation Coefficient",
      "Sleek Black Aesthetic & Enhanced Durability",
      "Smart Grid & Battery Energy Storage Ready",
    ],
    image: "/solar-farm.png",
    tags: ["Next-Gen HJT", "Authorized Partner"],
  },
  {
    brand: "Hybrid Solar Systems",
    logo: "/Integrated.webp",
    slug: "/products/hybrid-systems",
    description:
      "Advanced 24/7 backup systems combining solar generation with lithium and tubular battery storage for complete energy independence.",
    features: [
      "24/7 Uninterrupted Clean Power Supply",
      "Lithium Iron Phosphate (LiFePO4) Compatible",
      "Real-Time Mobile App Bluetooth & Wi-Fi Monitoring",
      "Bi-Directional Net-Metering & PM Surya Ghar Subsidy Ready",
    ],
    image: "/Hybrid.webp",
    tags: ["24/7 Backup", "Battery Storage"],
  },
];

export default function ProductsPage() {
  return (
    <MarketingLayout>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
        ]}
      />
      <div className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-2 font-bold text-sm shadow-sm rounded-full">
              Tier-1 Solar Equipment
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground mb-6 tracking-tight">
              Powering Your Future with <br className="hidden md:block" />
              <span className="text-primary">The Best Brands</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              We only install top-tier solar panels and inverters from globally recognized manufacturers to ensure maximum efficiency and a 25-year lifespan.
            </p>
            <Link href="/#get-quote">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                Get a Quote for Your Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Products Section */}
        <div className="py-24 container mx-auto px-4">
          <div className="space-y-20 max-w-6xl mx-auto">
            {PRODUCTS.map((product, idx) => (
              <div key={product.brand} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 group">
                    <Image
                      src={product.image}
                      alt={`${product.brand} Solar Installation by Krishnanuja Renewables`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {product.tags.map(tag => (
                        <Badge key={tag} className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-white/10 font-bold px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-primary font-bold">
                      <Sun className="w-6 h-6" />
                      <span>Solar Equipment</span>
                    </div>
                    {product.logo && (
                      <div className="h-10 w-28 relative">
                        <Image
                          src={product.logo}
                          alt={product.brand}
                          fill
                          sizes="112px"
                          className="object-contain object-right"
                        />
                      </div>
                    )}
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                    {product.brand}
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="pt-6 space-y-4">
                    {product.features.map(feature => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-lg font-medium text-foreground/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-8 flex flex-wrap gap-4">
                    <Link href={product.slug}>
                      <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl hover:bg-secondary group border-border shadow-sm">
                        Explore {product.brand}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Guarantee Section */}
        <div className="bg-secondary/50 py-24 border-t border-border/50">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <ShieldCheck className="w-20 h-20 text-primary mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
              The Krishnanuja Quality Guarantee
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              No matter which brand you choose, every installation comes with our premium service guarantee, including regular maintenance checks and robust after-sales support.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "25 Year Warranty", desc: "Performance warranty directly from the manufacturer." },
                { title: "Expert Installation", desc: "Installed by certified Krishnanuja professionals." },
                { title: "Local Support", desc: "Rapid response service for your peace of mind." }
              ].map((item) => (
                <Card key={item.title} className="bg-background border-border/50 shadow-sm rounded-3xl">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
