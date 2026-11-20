"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, CheckCircle2, QrCode, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Testimonial {
  name: string;
  role: string;
  city: string;
  system: string;
  text: string;
  rating: number;
  image?: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar Srivastava",
    role: "Homeowner",
    city: "Sigra, Varanasi",
    system: "5 kW On-Grid Rooftop Solar",
    text: "Krishnanuja Renewables transformed our energy bills completely! Our monthly bill dropped from ₹8,500 to just ₹450 with net metering. The installation was completed in just two days, and they handled all the PM Surya Ghar subsidy paperwork directly.",
    rating: 5,
    image: "/customer_images/2022-07-12.jpg",
    date: "Verified Customer",
  },
  {
    name: "Priya Sharma",
    role: "Textile Factory Owner",
    city: "Ramnagar Industrial Area, Varanasi",
    system: "100 kW Industrial Solar Plant",
    text: "We installed a 100kW system for our textile unit, and the ROI has been incredible. The engineering team designed an elevated galvanized structure that preserves our roof storage space. Our monthly power overhead dropped by 70%.",
    rating: 5,
    image: "/customer_images/2024-09-13.jpg",
    date: "Verified Commercial Client",
  },
  {
    name: "Amit Patel",
    role: "Hotelier & Business Owner",
    city: "Civil Lines, Prayagraj",
    system: "15 kW Hybrid Solar with Storage",
    text: "The hybrid solar system with battery backup has been a game-changer for our hotel. Zero generator noise, uninterrupted air conditioning, and complete peace of mind. The mobile app lets me monitor live generation 24/7.",
    rating: 5,
    image: "/customer_images/2022-12-27.jpg",
    date: "Verified Business Owner",
  },
  {
    name: "Sunita Devi & Family",
    role: "Agricultural Farm Owner",
    city: "Jaunpur, Uttar Pradesh",
    system: "7.5 HP Solar Water Pumping System",
    text: "The solar water pump from Shakti Solar installed by Krishnanuja team has eliminated our diesel pump costs entirely. Now we can irrigate our fields reliably whenever needed. Highly respectful and punctual team.",
    rating: 5,
    image: "/customer_images/2025-06-13.jpg",
    date: "Verified Farmer Client",
  },
  {
    name: "Dr. Vikram Singh",
    role: "Medical Hospital Director",
    city: "Gorakhpur",
    system: "30 kW On-Grid Solar Plant",
    text: "In a medical healthcare facility, uninterrupted power is mission-critical. Krishnanuja installed a reliable Tier-1 bifacial setup that slashed our commercial electricity tariff significantly. Superb after-sales maintenance.",
    rating: 5,
    image: "/customer_images/2025-06-13 (1).jpg",
    date: "Verified Healthcare Client",
  },
  {
    name: "Neha Gupta",
    role: "Secretary, Green Valley Society",
    city: "Kanpur",
    system: "25 kW Housing Society Common Area Solar",
    text: "Our housing society went solar with Krishnanuja. The common area lighting and lift electricity expenses reduced by over 80%. They helped us claim the full PM Surya Ghar group housing subsidy smoothly.",
    rating: 5,
    image: "/customer_images/2022-07-12.jpg",
    date: "Verified Housing Society",
  },
];

export default function TestimonialsSection() {
  const [qrModalOpen, setQrModalOpen] = useState(false);

  return (
    <section id="testimonials" className="py-24 relative bg-background border-t border-border/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Rated 4.9/5 from 500+ Verified Installs
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Trusted by Homes &amp; <span className="text-primary">Businesses Across UP</span>
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Read real feedback from homeowners, factory owners, and institutions who slashed their electric bills with Krishnanuja Renewables.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="group flex flex-col justify-between bg-card border border-border/70 hover:border-primary/40 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header: Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Install
                  </Badge>
                </div>

                {/* System Spec Pill */}
                <div className="inline-block bg-secondary/80 rounded-lg px-2.5 py-1 text-xs font-semibold text-primary">
                  {testimonial.system}
                </div>

                {/* Review Text */}
                <p className="text-foreground/90 text-sm leading-relaxed font-normal">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              {/* Author & Photo Footer */}
              <div className="mt-6 pt-5 border-t border-border/60 flex items-center gap-3.5">
                {testimonial.image ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border shrink-0 bg-secondary">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-foreground text-sm leading-tight">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role} • {testimonial.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Trust Bar & QR Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col lg:flex-row items-center justify-between gap-6 bg-secondary/60 rounded-3xl p-6 sm:px-8 sm:py-5 border border-border/70 shadow-sm max-w-4xl mx-auto">
            {/* Google Stars & Rating */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-10 h-10 shrink-0">
                <Image src="/google.webp" alt="Google Reviews" fill sizes="40px" className="object-contain" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black text-foreground">4.9</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-semibold">
                  Google Verified Business Rating • 500+ Reviews
                </p>
              </div>
            </div>

            <div className="hidden lg:block h-10 w-px bg-border" />

            {/* Quick Actions: Open Maps or QR */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQrModalOpen(true)}
                className="gap-2 rounded-full border-border/80 hover:bg-secondary font-bold text-xs h-10 px-4 shadow-2xs"
              >
                <QrCode className="w-4 h-4 text-primary" />
                Scan QR to Review
              </Button>

              <a
                href="https://local.google.com/place?placeid=ChIJS1upMo4tjjkRsv-DF1vx_Fo&utm_medium=noren&utm_source=gbp&utm_campaign=2026"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs h-10 px-4.5 shadow-xs"
                >
                  <span>Google Profile &amp; Reviews</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* QR Code Modal Dialog */}
        <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
          <DialogContent className="max-w-md p-6 bg-card border-border text-center">
            <DialogHeader className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center p-2 border border-border">
                <Image src="/google.webp" alt="Google" width={32} height={32} className="object-contain" />
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Review Krishnanuja on Google
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Scan with your phone camera to open our verified Google Business Profile and share your solar experience.
              </DialogDescription>
            </DialogHeader>

            <div className="my-4 p-4 bg-white rounded-2xl border border-border inline-block mx-auto shadow-inner">
              <div className="relative w-56 h-56 mx-auto">
                <Image
                  src="/google-review-qr.png"
                  alt="Krishnanuja Renewables Google Review QR Code"
                  fill
                  sizes="224px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="https://share.google/1CRgiNLIisd7Jzmlj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                <Button className="w-full rounded-xl bg-primary text-primary-foreground font-bold text-xs h-11 gap-2 shadow-md">
                  Write a Review on Google ↗
                </Button>
              </a>

              <a
                href="https://local.google.com/place?placeid=ChIJS1upMo4tjjkRsv-DF1vx_Fo&utm_medium=noren&utm_source=gbp&utm_campaign=2026"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                <Button variant="outline" className="w-full rounded-xl border-border font-semibold text-xs h-10 gap-1.5 hover:bg-secondary">
                  <span>View Google Maps Listing</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}
