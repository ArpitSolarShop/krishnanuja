import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Zap, Battery, Sun, Shield, Settings, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarketingLayout from "@/components/layout/MarketingLayout";

export const metadata: Metadata = {
  title: "Hybrid Solar Systems & Inverters | Krishnanuja Renewables",
  description: "Best Hybrid Solar Systems. Smart energy solutions that work with and without the grid. Authorized dealer for top brands.",
};

export default function HybridSolarPage() {
  return (
    <MarketingLayout>
      <main className="pt-24 pb-16 bg-background">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-sm">
                    Hybrid Solar Systems
                  </h1>
                </div>
                <p className="text-xl max-w-xl text-primary-foreground/90">
                  Get the best of both worlds with our advanced hybrid solar solutions that combine solar power with battery storage for 24/7 energy independence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/#get-quote">
                    <Button size="lg" variant="secondary" className="rounded-full px-8 text-base h-12 text-primary font-bold hover:bg-secondary/90">
                      Get a Free Quote
                    </Button>
                  </Link>
                  <Link href="/#contact">
                    <Button size="lg" className="rounded-full px-8 text-base h-12 border-2 border-primary-foreground/20 hover:bg-primary-foreground/10 bg-transparent">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl flex items-center justify-center p-8">
                <Image
                  src="/Hybrid.webp"
                  alt="Hybrid Solar System"
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Hybrid Solar?</h2>
              <p className="text-lg text-muted-foreground">
                Our hybrid solar systems are designed to maximize your energy independence while reducing your electricity bills.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Sun,
                  title: "Solar Power",
                  description: "Generate clean energy from the sun during the day to power your home and charge your batteries.",
                },
                {
                  icon: Battery,
                  title: "Battery Backup",
                  description: "Store excess solar energy for use at night or during power outages, ensuring uninterrupted power.",
                },
                {
                  icon: Zap,
                  title: "Grid Connection",
                  description: "Remain connected to the grid for backup power when needed, while still saving on electricity bills.",
                },
                {
                  icon: Shield,
                  title: "Power Protection",
                  description: "Protect your appliances from power surges and voltage fluctuations with built-in surge protection.",
                },
                {
                  icon: Settings,
                  title: "Smart Management",
                  description: "Intelligent system that optimizes energy usage between solar, battery, and grid power.",
                },
                {
                  icon: CheckCircle,
                  title: "Subsidies Available",
                  description: "Benefit from various government schemes and subsidies for installing hybrid solar systems.",
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
    </MarketingLayout>
  );
}
