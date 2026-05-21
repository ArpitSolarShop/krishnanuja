"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, TrendingDown, Sun } from "lucide-react";
import Solar3DShowcase from "./Solar3DShowcase";


function CountUpNumber({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById(`counter-${target}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, target]);

  return (
    <span id={`counter-${target}`} className="tabular-nums">
      {prefix}{count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

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
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-blue-light/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in-up">
            <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm text-sm px-4 py-1.5 gap-2">
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

            <p className="text-lg sm:text-xl text-white/80 max-w-lg leading-relaxed">
              Krishnanuja Renewables delivers end-to-end solar solutions for homes,
              businesses, and industries. Save up to 90% on electricity bills with
              India&apos;s trusted Solar EPC partner.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-navy font-semibold text-lg px-8 py-6 shadow-xl shadow-brand-gold/30 hover:shadow-brand-gold/50 transition-all duration-300 hover:scale-105 group"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-medium text-lg px-8 py-6 backdrop-blur-sm"
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
                <div key={text} className="flex items-center gap-2 text-white/70">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-4 h-4 text-brand-gold-light" />
                  </div>
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Interactive 3D Solar Showcase */}
          <div className="hidden lg:block w-full h-[600px] relative z-20">
            <Solar3DShowcase />
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
              className="glass rounded-2xl p-5 text-center bg-white/10 border-white/15 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <p className="text-3xl sm:text-4xl font-bold text-white">
                <CountUpNumber target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-white/60 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
