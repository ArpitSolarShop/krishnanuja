"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, TrendingDown, Sun } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-solar.png"
          alt="Solar Installation"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 solar-grid-pattern opacity-10" />
      </div>

      {/* Floating decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-blue-light/10 rounded-full blur-3xl" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <Badge className="bg-brand-navy/10 text-white border-brand-navy/20 backdrop-blur-sm text-sm px-4 py-1.5 gap-2">
              <Sun className="w-4 h-4 text-brand-gold-light" />
              Solar EPC Services
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Power Your
              <br />
              Future with
              <br />
              <span className="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-light bg-clip-text text-transparent">
                Solar Energy
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-lg leading-relaxed">
              Krishnanuja Renewables delivers end-to-end solar solutions for homes,
              businesses, and industries. Save up to 90% on electricity bills with
              India&apos;s trusted Solar EPC partner.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-gold to-brand-gold-light text-white font-semibold text-lg px-8 py-6 shadow-xl shadow-brand-gold/30 hover:shadow-brand-gold/50 group"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-" />
                </Button>
              </Link>
              <Link href="#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 font-medium text-lg px-8 py-6 backdrop-blur-sm"
                >
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { icon: Shield, text: "25 Year Warranty" },
                { icon: TrendingDown, text: "90% Bill Savings" },
                { icon: Zap, text: "Fast Installation" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/60">
                  <div className="w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-4 h-4 text-brand-gold-light" />
                  </div>
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Static Image */}
          <div className="hidden lg:block w-full h-[600px] relative z-20">
            <Image
              src="/solar-farm.png"
              alt="Solar Showcase"
              fill
              className="object-cover rounded-3xl shadow-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: 500, suffix: "+", label: "Projects Completed" },
            { value: 50, suffix: " MW+", label: "Solar Capacity Installed" },
            { value: 1000, suffix: "+", label: "Happy Customers" },
            { value: 15, suffix: "+ Years", label: "Industry Experience" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5 text-center bg-[#030712] border-white/10 hover:bg-white/5"
            >
              <p className="text-3xl sm:text-4xl font-bold text-white">
                <span className="tabular-nums">{stat.value.toLocaleString("en-IN")}{stat.suffix}</span>
              </p>
              <p className="text-sm text-white/50 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
