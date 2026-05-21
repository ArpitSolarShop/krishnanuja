"use client";

import { Badge } from "@/components/ui/badge";
import { Handshake } from "lucide-react";

const partners = [
  { name: "Reliance Solar", color: "#1e3a5f" },
  { name: "Tata Power Solar", color: "#3d6b9e" },
  { name: "Waaree Energies", color: "#c9933a" },
  { name: "Adani Solar", color: "#1e3a5f" },
];

export default function PartnersSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 solar-grid-pattern" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 mb-4">
            <Handshake className="w-3 h-3 mr-1" />
            Premium Brands
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">
            Products We <span className="gradient-text">Provide</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            We partner with and provide world-class solar panels and equipment from India's most trusted 
            brands like Reliance, Tata, Waaree, and Adani.
          </p>
        </div>

        {/* Partners marquee */}
        <div className="relative overflow-hidden py-8">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex animate-marquee gap-12 items-center">
            {[...partners, ...partners, ...partners, ...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="shrink-0 px-8 py-4 rounded-xl border border-brand-blue/5 bg-card/50 hover:bg-brand-blue/5 hover:border-brand-blue/15 transition-all duration-300 group"
              >
                <p
                  className="text-lg font-bold whitespace-nowrap opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ color: partner.color }}
                >
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
