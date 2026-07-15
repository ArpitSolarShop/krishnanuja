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
                Our Journey &amp; <br /> Evolution.
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-medium">
              <p>
                Founded in 2013 by a dedicated team of engineers in Varanasi, our journey began as <strong>Arpit Solar Shop</strong>, a sole proprietorship. Driven by a vision to provide reliable and uninterrupted clean energy, we quickly established ourselves as a trusted name in solar EPC.
              </p>
              <p>
                Today, we have evolved into <strong>Krishnanuja Renewables Pvt. Ltd.</strong>, a private limited company guided by directors <strong>Rahul and Ratnesh Mishra</strong>. With over <strong>25MW</strong> of successfully installed projects, we continue our legacy of empowering homes and businesses across India.
              </p>
              <p>
                We are proud to be an officially empaneled agency by <strong>UPNEDA</strong> and channel partners for industry leaders like Reliance New Energy, Shakti Pumps, and Tata Power Solar.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 pt-8">
              {[
                { icon: CheckCircle, title: "25MW+ Installed", desc: "Proven track record" },
                { icon: Award, title: "UPNEDA Empaneled", desc: "PM Surya Ghar Approved" },
                { icon: Users, title: "Expert Directors", desc: "Rahul & Ratnesh Mishra" },
                { icon: Globe, title: "Premium Partners", desc: "Tata, Reliance, Shakti" },
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
                  <p className="font-bold text-foreground text-lg">Since 2013</p>
                  <p className="text-sm text-muted-foreground">Pioneering Solar EPC</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 bg-background p-6 rounded-3xl border border-border/50 shadow-2xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Globe className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">Tier-1 Partner</p>
                  <p className="text-sm text-muted-foreground">Top Global Brands</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
