import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Reliance New Energy Solar Solutions | Krishnanuja Renewables",
  description: "Authorized Channel Partner for Reliance New Energy. Premium solar products and complete solar ecosystem solutions.",
};

export default function RelianceNewEnergyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-background">
        
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/reliance/newenergy-banner.jpg"
              alt="Reliance New Energy Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="relative z-10 text-center text-white max-w-4xl px-6 space-y-6">
            <p className="text-primary font-bold tracking-widest uppercase text-sm md:text-base">
              Authorized Partner
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-xl">
              Energizing India Sustainably
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
              Moving to a Greener Economy with Reliance New Energy and Krishnanuja Renewables.
            </p>
            <div className="pt-8">
              <Link href="/quote">
                <Button size="lg" className="rounded-full px-8 text-base h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                  Get a Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Commitment to Net-Zero</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Reliance has committed to an ambitious target of achieving net-zero carbon status by 2035. Through active investments and partnerships, we aim to build one of the world&apos;s leading New Energy businesses that bridges the green energy divide in India and globally.
              </p>
              <p>
                The business is based on the principle of Carbon Recycle and Circular Economy with a portfolio of advanced materials. We aim to create a fully integrated manufacturing ecosystem with secure and self-sufficient supply chains.
              </p>
            </div>
          </div>
        </section>

        {/* Helping India Lead */}
        <section className="py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Helping India Lead in the Green Energy Future
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    With an investment of over $10 billion, Reliance is building the most comprehensive ecosystem for New Energy and New Materials in India to secure the promise of a sustainable future.
                  </p>
                  <p>
                    Our New Energy and New Materials business will be an optimal mix of reliable, clean and affordable energy solutions encompassing solar, wind, and energy storage.
                  </p>
                </div>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                <Image
                  src="/assets/reliance/green-energy.jpg"
                  alt="Green Energy"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* End-to-End Solar PV */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border/50 order-2 md:order-1">
                <Image
                  src="/assets/reliance/end-solar-pv-ecosystem.jpg"
                  alt="End-to-End Solar PV Ecosystem"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  End-to-End Solar PV Ecosystem
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    We are constructing a fully integrated, end-to-end solar photovoltaics (PV) manufacturing ecosystem, which will be one of the largest, most technologically advanced, and cost-competitive solar giga factories globally.
                  </p>
                  <p>
                    The Jamnagar solar PV factory will be the first-of-its-kind &apos;quartz-to-module&apos; facility, taking us a step closer to enabling at least 100 GW of solar energy by 2030.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Partnerships */}
        <section className="py-24 bg-primary/5 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Global Partnerships & Acquisitions
              </h2>
              <p className="text-lg text-muted-foreground">
                Forging strong global partnerships to co-create New Energy solutions for India and the world.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { 
                  title: "REC Solar Holdings (REC Group)", 
                  text: "Acquired REC Group, one of the world's leading solar cells/panels and polysilicon manufacturing companies, for an enterprise value of USD 771 million.",
                  img: "/assets/reliance/recgroup-logo.jpg"
                },
                { 
                  title: "SenseHawk", 
                  text: "Invested in SenseHawk, a California-based developer of software-based management tools that help accelerate solar projects from planning to production.",
                  img: "/assets/reliance/sensehawk-logo.jpg"
                },
                { 
                  title: "Sterling & Wilson Solar", 
                  text: "Acquired a 40% stake in Sterling & Wilson Solar, one of the largest EPC and O&M providers globally, to provide turnkey solutions.",
                  img: "/assets/reliance/sterlingandwilson-logo.jpg"
                },
                { 
                  title: "NexWafe", 
                  text: "Partnered for the joint technology development and commercialization of high-efficiency monocrystalline 'green solar wafers'.",
                  img: "/assets/reliance/NexWafe-logo.jpg"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-background border border-border/50 p-8 rounded-3xl shadow-sm flex flex-col h-full">
                  <div className="h-16 relative mb-6">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground flex-grow">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-6">Ready to transition to Reliance New Energy?</h2>
            <p className="text-lg text-muted-foreground mb-8">Get in touch with our experts at Krishnanuja Renewables for a personalized consultation.</p>
            <Link href="/quote">
              <Button size="lg" className="rounded-full px-8 text-base h-14">
                Partner with Us Today
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
