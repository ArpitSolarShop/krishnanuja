"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Users, Globe } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient-blue" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue/20 to-brand-gold/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-blue/10">
              <Image
                src="/solar-farm.png"
                alt="Krishnanuja Renewables Solar Farm"
                width={640}
                height={480}
                className="object-cover w-full h-[400px] lg:h-[500px] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-brand-gold-light rounded-xl flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-navy text-sm">Trusted Solar EPC Partner</p>
                    <p className="text-xs text-brand-blue-light">ISO Certified • MNRE Approved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 mb-4">
                About Krishnanuja
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy leading-tight">
                Powering India&apos;s
                <span className="gradient-text block">Green Revolution</span>
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Krishnanuja Renewables Pvt. Ltd. is a leading Solar EPC (Engineering, 
              Procurement &amp; Construction) company committed to driving India&apos;s transition 
              to clean, renewable energy. With years of expertise, we deliver turnkey solar 
              solutions that transform how homes and businesses power their future.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our team of skilled engineers and technicians leverages cutting-edge technology 
              and premium components to design, supply, and install solar power systems that 
              maximize energy generation and long-term savings.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: CheckCircle, title: "End-to-End EPC", desc: "Design to commissioning" },
                { icon: Award, title: "Premium Quality", desc: "Tier-1 components only" },
                { icon: Users, title: "Expert Team", desc: "Certified engineers" },
                { icon: Globe, title: "Pan-India Reach", desc: "Serving across states" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-blue/5 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-navy text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
