"use client";

import Image from "next/image";
import { CheckCircle, Award, Users, Globe } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-32 relative bg-background overflow-hidden border-t border-border/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content side */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
                Powering India&apos;s <br /> green revolution.
              </h2>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              Krishnanuja Renewables Pvt. Ltd. is a leading Solar EPC company committed to driving India&apos;s transition to clean, renewable energy. We deliver turnkey solar solutions that transform how homes and businesses power their future.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 pt-8">
              {[
                { icon: CheckCircle, title: "End-to-End EPC", desc: "Design to commissioning" },
                { icon: Award, title: "Premium Quality", desc: "Tier-1 components only" },
                { icon: Users, title: "Expert Team", desc: "Certified engineers" },
                { icon: Globe, title: "Pan-India Reach", desc: "Serving across states" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-3">
                  <Icon className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{title}</h3>
                    <p className="text-muted-foreground mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-secondary shadow-2xl">
              <Image
                src="/solar-farm.png"
                alt="Krishnanuja Renewables Solar Farm"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-3xl border border-border/50 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shrink-0">
                  <Award className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">Trusted EPC</p>
                  <p className="text-sm text-muted-foreground">ISO Certified</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
