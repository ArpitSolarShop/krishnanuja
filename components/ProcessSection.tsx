"use client";

import { ClipboardCheck, Compass, Wrench, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Free Consultation",
    description: "Our solar experts visit your location for a comprehensive energy assessment. We analyze your consumption and roof space.",
  },
  {
    icon: Compass,
    step: "02",
    title: "Custom Design",
    description: "We create a tailored solar system design using advanced modeling to optimize panel placement and maximize your energy output.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Expert Installation",
    description: "Our certified technicians install your solar system with precision and quality assurance. We handle all electrical work seamlessly.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Monitoring & Care",
    description: "Enjoy 24/7 remote monitoring of your system's performance. Our team provides regular support to ensure peak efficiency.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-32 relative bg-secondary">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Going solar. <br /> Simplified.
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            From consultation to commissioning, we make going solar seamless and hassle-free in four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {steps.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center text-center group">
              <div className="mb-8 relative">
                <div className="text-8xl font-black text-background group-hover:text-border transition-colors duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                  {step.step}
                </div>
                <div className="w-20 h-20 bg-background border border-border/50 rounded-3xl flex items-center justify-center relative z-10 shadow-xl shadow-foreground/5 group-hover:scale-110 transition-transform duration-500">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
