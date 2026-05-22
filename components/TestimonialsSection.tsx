"use client";

import { Star } from "lucide-react";

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
    <section id="testimonials" className="py-32 relative bg-background border-t border-border/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Trusted by 1000+.
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            Here&apos;s what our customers have to say about their solar journey with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="group flex flex-col justify-between bg-secondary border border-border/50 rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="space-y-6">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-foreground text-lg leading-relaxed font-medium">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-base">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-secondary/80 rounded-3xl px-10 py-6 border border-border/50">
            <div className="text-6xl font-black text-foreground tracking-tighter">4.9</div>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
              </div>
              <div className="text-muted-foreground font-medium">
                Based on <span className="text-foreground font-semibold">500+</span> reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
