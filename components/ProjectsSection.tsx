"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Zap, Calendar } from "lucide-react";

const projects = [
  {
    title: "50kW Rooftop Solar",
    location: "Industrial Area, Varanasi",
    capacity: "50 kW",
    year: "2025",
    type: "Commercial",
    image: "/commercial-solar.png",
  },
  {
    title: "Residential Solar Complex",
    location: "Sigra, Varanasi",
    capacity: "120 kW",
    year: "2024",
    type: "Housing Society",
    image: "/hero-solar.png",
  },
  {
    title: "Ground Mounted Plant",
    location: "Jaunpur, UP",
    capacity: "1 MW",
    year: "2024",
    type: "Utility",
    image: "/solar-farm.png",
  },
  {
    title: "Factory Rooftop Installation",
    location: "MIDC, Lucknow",
    capacity: "200 kW",
    year: "2025",
    type: "Industrial",
    image: "/commercial-solar.png",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient-blue" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 mb-4">
            Our Projects
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-6">
            Powering Success
            <span className="gradient-text"> Across India</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A showcase of our completed solar installations spanning residential,
            commercial, and utility-scale projects.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <Card
              key={i}
              className="group card-3d border-brand-blue/5 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-brand-blue/15 transition-all duration-500"
            >
              <CardContent className="p-0">
                <div className="grid sm:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-56 sm:h-full min-h-[240px] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-navy/30" />
                    <Badge className="absolute top-4 left-4 bg-brand-gold text-brand-navy border-0 font-semibold">
                      {project.type}
                    </Badge>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col justify-center space-y-4">
                    <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {project.title}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-brand-blue-light shrink-0" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="w-4 h-4 text-brand-gold shrink-0" />
                        Capacity: <span className="font-semibold text-brand-navy">{project.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-brand-blue-light shrink-0" />
                        Completed: {project.year}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
