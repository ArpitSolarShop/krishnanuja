"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Homeowner, Lucknow",
    text: "Krishnanuja Renewables transformed our energy bills completely! Our monthly bill dropped from ₹8,000 to just ₹500. The installation was professional and completed in just one day. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Factory Owner, Varanasi",
    text: "We installed a 100kW system for our textile factory and the ROI has been incredible. The team handled everything from design to commissioning seamlessly. Our operational costs have reduced by 70%.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Hotel Manager, Prayagraj",
    text: "The hybrid solar system with battery backup has been a game-changer for our hotel. No more worries about power cuts during peak season. The monitoring app gives us real-time insights.",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    role: "Farmer, Jaunpur",
    text: "The solar water pump has completely eliminated our diesel costs. Now we can irrigate our fields reliably without worrying about fuel prices. Thank you Krishnanuja team!",
    rating: 5,
  },
  {
    name: "Dr. Vikram Singh",
    role: "Clinic Owner, Gorakhpur",
    text: "As a healthcare facility, uninterrupted power is critical for us. Krishnanuja installed a reliable solar system with battery backup that keeps our clinic running 24/7. Excellent service!",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    role: "Housing Society, Kanpur",
    text: "Our housing society of 120 flats went solar with Krishnanuja. The common area electricity bill has dropped by 85%. They also helped us with the government subsidy paperwork. Very professional team.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient-blue" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-brand-gold/10 text-brand-gold-dark border-brand-gold/20 mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Trusted by <span className="gradient-text">1000+ Customers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Here&apos;s what our customers have to say about their solar journey with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card
              key={i}
              className="group  border-brand-blue/5 bg-card/80 backdrop-blur-sm hover:border-brand-gold/20"
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-gold/10 to-brand-gold-light/10 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-brand-gold" />
                </div>

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-brand-blue/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 glass rounded-2xl px-8 py-4">
            <div className="text-4xl font-bold text-white">4.9</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on <span className="font-semibold text-white">500+</span> reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
