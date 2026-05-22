"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center bg-background">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-foreground tracking-tighter leading-tight">
          Power your future. <br className="hidden sm:block" />
          <span className="text-muted-foreground">With solar energy.</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium px-2">
          Krishnanuja Renewables delivers end-to-end solar solutions. Save up to 90% on electricity bills with India&apos;s trusted partner.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
          <Link href="/quote" className="w-full sm:w-auto flex">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-8 py-6 h-14 transition-colors"
            >
              Get Free Consultation
            </Button>
          </Link>
          <Link href="#services" className="w-full sm:w-auto flex">
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto rounded-full text-primary hover:bg-primary/10 text-base sm:text-lg px-8 py-6 h-14 group transition-colors"
            >
              Explore Services
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto mt-20 px-4">
        <div className="aspect-[16/9] w-full relative rounded-3xl overflow-hidden bg-secondary shadow-2xl">
          <Image
            src="/solar-farm.png"
            alt="Solar Installation Showcase"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-4xl mx-auto w-full mt-24 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Projects Completed" },
            { value: "50 MW+", label: "Capacity Installed" },
            { value: "1,000+", label: "Happy Customers" },
            { value: "15+ Yrs", label: "Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <p className="text-4xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
