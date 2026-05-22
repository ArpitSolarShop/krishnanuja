"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Home, Building2, Factory, Battery, Sun, 
  Droplets, ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Rooftop",
    description: "Transform your home into a powerhouse. Save up to 90% on electricity bills.",
    image: "/hero-solar.png",
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description: "Reduce operational costs and boost your green credentials.",
    image: "/commercial-solar.png",
  },
  {
    icon: Factory,
    title: "Ground Mounted",
    description: "Large-scale solar power plants engineered for maximum output.",
    image: "/solar-farm.png",
  },
  {
    icon: Battery,
    title: "Hybrid Storage",
    description: "Combine solar with battery storage for uninterrupted power supply.",
    image: "/hero-solar.png",
  },
  {
    icon: Sun,
    title: "Water Pumping",
    description: "Sustainable irrigation solutions for agriculture without fuel costs.",
    image: "/solar-farm.png",
  },
  {
    icon: Droplets,
    title: "Water Heating",
    description: "Efficient solar water heating systems for homes, hotels, and hospitals.",
    image: "/commercial-solar.png",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-32 relative bg-secondary">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Complete solar solutions.
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            From rooftop installations to utility-scale solar farms, we provide 
            end-to-end services tailored to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col bg-background rounded-3xl overflow-hidden border border-border/50 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <service.icon className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {service.description}
                </p>
                <div className="mt-8 pt-6 border-t border-border">
                  <Link href="#contact" className="inline-flex items-center text-primary font-medium group/link">
                    Learn more 
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
