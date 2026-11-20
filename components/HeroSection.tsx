"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Star } from "lucide-react";
import { HeroGetQuote } from "@/components/forms/HeroGetQuote";
import HeroVideoLoop from "@/components/HeroVideoLoop";

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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              #1 Solar Installer in Varanasi • UPNEDA Empaneled
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tighter leading-[1.1]">
              Top Solar Installer <br className="hidden sm:block" />
              <span className="text-primary">in Varanasi &amp; UP.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg font-medium">
              Krishnanuja Renewables (formerly Arpit Solar Shop) delivers turnkey residential, commercial, and agricultural solar solutions with up to ₹1,08,000 PM Surya Ghar subsidies.
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

              <Link href="#calculator" className="w-full sm:w-auto flex">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full border-border/80 hover:bg-secondary text-base sm:text-lg px-6 py-6 h-14 group transition-colors"
                >
                  Calculate Subsidy
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://local.google.com/place?placeid=ChIJS1upMo4tjjkRsv-DF1vx_Fo&utm_medium=noren&utm_source=gbp&utm_campaign=2026"
                target="_blank"
                rel="noopener noreferrer"
                title="View Krishnanuja Renewables on Google Maps & Reviews"
                className="inline-flex items-center gap-2 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-full px-3.5 py-1.5 transition-all hover:scale-102 group cursor-pointer"
              >
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  4.9/5 <span className="text-muted-foreground font-normal">on Google ↗</span>
                </span>
              </a>
              
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full px-3.5 py-1.5 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                0% EMI Available
              </div>

              <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full px-3.5 py-1.5 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5" />
                25-Yr Performance Warranty
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-border/50">
              {[
                { value: "500+", label: "Solar Projects" },
                { value: "25 MW+", label: "Total Installed" },
                { value: "1,000+", label: "Happy Clients" },
                { value: "12+ Yrs", label: "Industry Legacy" },
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

      {/* Auto-Looping Hero Video Showcase */}
      <div id="hero-video-tour" className="relative w-full max-w-6xl mx-auto mt-16 sm:mt-20 px-4 scroll-mt-28">
        <HeroVideoLoop />
      </div>
    </section>
  );
}
