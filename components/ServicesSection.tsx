"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  Home, Building2, Factory, Battery, Sun, 
  Droplets, ArrowRight, Sparkles
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Rooftop Solar",
    description: "Transform your home into a powerhouse. Our residential solar solutions help you save up to 90% on electricity bills with premium quality panels and hassle-free installation.",
    features: ["On-Grid & Off-Grid Options", "Net Metering Support", "Government Subsidy Assistance", "25-Year Panel Warranty"],
    image: "/hero-solar.png",
    color: "from-brand-blue to-brand-blue-light",
  },
  {
    icon: Building2,
    title: "Commercial & Industrial Solar",
    description: "Reduce operational costs and boost your green credentials. We design and install large-scale solar systems for commercial buildings, warehouses, and industrial facilities.",
    features: ["Custom System Design", "ROI within 3-4 Years", "Opex & Capex Models", "24/7 Remote Monitoring"],
    image: "/commercial-solar.png",
    color: "from-brand-steel to-brand-blue-light",
  },
  {
    icon: Factory,
    title: "Ground Mounted Solar",
    description: "Large-scale ground-mounted solar power plants for utility and captive consumption. Engineered for maximum output with advanced tracking systems.",
    features: ["MW-Scale Installations", "Fixed & Tracker Mounts", "Land Assessment & Design", "EPC to O&M Services"],
    image: "/solar-farm.png",
    color: "from-brand-navy to-brand-blue",
  },
  {
    icon: Battery,
    title: "Hybrid & Battery Storage",
    description: "Never worry about power cuts again. Our hybrid solutions combine solar with battery storage for uninterrupted power supply day and night.",
    features: ["Lithium-ion Batteries", "Seamless Grid Switching", "Smart Energy Management", "Backup During Outages"],
    image: "/hero-solar.png",
    color: "from-brand-gold-dark to-brand-gold",
  },
  {
    icon: Sun,
    title: "Solar Water Pumping",
    description: "Sustainable irrigation solutions for agriculture. Solar-powered water pumps that eliminate fuel costs and provide reliable water supply.",
    features: ["AC & DC Pump Systems", "No Running Fuel Cost", "Government Subsidy Eligible", "Remote Area Solutions"],
    image: "/solar-farm.png",
    color: "from-brand-blue-light to-brand-steel",
  },
  {
    icon: Droplets,
    title: "Solar Water Heater",
    description: "Efficient solar water heating systems for homes, hotels, and hospitals. Reduce hot water costs by up to 80% with eco-friendly technology.",
    features: ["ETC & FPC Technology", "Stainless Steel Tanks", "All-Weather Performance", "Low Maintenance"],
    image: "/commercial-solar.png",
    color: "from-brand-gold to-brand-gold-light",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 solar-grid-pattern" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-brand-gold/10 text-brand-gold-dark border-brand-gold/20 mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Our Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Complete Solar
            <span className="gradient-text"> Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From rooftop installations to utility-scale solar farms, we provide 
            end-to-end EPC services tailored to your energy needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group  border-brand-blue/5 bg-card/80 backdrop-blur-sm hover:border-brand-blue/20 overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`} />
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-blue">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="#contact">
                    <Button
                      variant="ghost"
                      className="w-full mt-2 text-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 group/btn"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
