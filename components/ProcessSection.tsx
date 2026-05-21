"use client";

import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Compass, Wrench, BarChart3, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Free Consultation",
    description: "Our solar experts visit your location for a comprehensive energy assessment. We analyze your electricity consumption, roof space, and sun exposure to determine the optimal solution.",
  },
  {
    icon: Compass,
    step: "02",
    title: "Custom Design",
    description: "We create a tailored solar system design using advanced 3D modeling. Our engineers optimize panel placement, inverter sizing, and wiring to maximize your energy output.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Professional Installation",
    description: "Our certified technicians install your solar system with precision and quality assurance. We handle all electrical work, mounting structures, and grid connections.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Monitoring & Maintenance",
    description: "Enjoy 24/7 remote monitoring of your solar system's performance. Our team provides regular maintenance, cleaning, and support to ensure peak efficiency year after year.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-blue to-brand-navy" />
      <div className="absolute inset-0 solar-grid-pattern opacity-5" />
      
      {/* Decorative floating orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-blue-light/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="bg-white/10 text-white border-white/20/15 mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Your Solar Journey in
            <span className="text-brand-gold-light"> 4 Simple Steps</span>
          </h2>
          <p className="text-lg text-white/60">
            From consultation to commissioning, we make going solar seamless and hassle-free.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-gold/30 via-brand-gold/60 to-brand-gold/30" />

          {steps.map((step, i) => (
            <div key={step.step} className="relative group">
              {/* Mobile connecting arrow */}
              {i < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-brand-gold/40">
                  <ArrowDown className="w-5 h-5" />
                </div>
              )}
              
              <div className="text-center space-y-6">
                {/* Step number circle */}
                <div className="relative mx-auto">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/10 group-hover:border-brand-gold/30 group- group-hover:shadow-lg group-hover:shadow-brand-gold/20">
                    <step.icon className="w-8 h-8 text-brand-gold-light group-hover:text-brand-gold" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-light flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {step.step}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold-light">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
