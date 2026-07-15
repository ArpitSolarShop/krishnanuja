"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroGetQuote } from "@/components/forms/HeroGetQuote";

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-24 lg:pt-32 pb-20 lg:pb-28 overflow-hidden bg-background">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero: Text left + Form right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Hero Content */}
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tighter leading-[1.1]">
              Power your future. <br className="hidden sm:block" />
              <span className="text-muted-foreground">With solar energy.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg font-medium">
              Krishnanuja Renewables delivers end-to-end solar solutions. Save up to 90% on electricity bills with India&apos;s trusted partner.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
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

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 bg-secondary/50 border border-border/50 rounded-full px-3 py-1.5">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">4.9/5 <span className="text-muted-foreground font-normal">on Google</span></span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 rounded-full px-3 py-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold">0% EMI Available</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full px-3 py-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-semibold">25-Yr Warranty</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-border/50">
              {[
                { value: "500+", label: "Projects" },
                { value: "50 MW+", label: "Installed" },
                { value: "1,000+", label: "Customers" },
                { value: "15+ Yrs", label: "Experience" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quote Form */}
          <div id="get-quote" className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0 lg:max-w-[420px] xl:max-w-[480px] scroll-mt-28">
            <HeroGetQuote />
          </div>
        </div>
      </div>

      {/* Showcase Image — full width below */}
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
    </section>
  );
}
