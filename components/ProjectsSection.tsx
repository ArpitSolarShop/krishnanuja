"use client";

import Image from "next/image";
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
    title: "Residential Complex",
    location: "Sigra, Varanasi",
    capacity: "120 kW",
    year: "2024",
    type: "Housing",
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
    title: "Factory Rooftop",
    location: "MIDC, Lucknow",
    capacity: "200 kW",
    year: "2025",
    type: "Industrial",
    image: "/commercial-solar.png",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 relative bg-background border-t border-border/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Powering success.
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            A showcase of our completed solar installations spanning residential,
            commercial, and utility-scale projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group flex flex-col bg-background border border-border/50 rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-64 sm:h-80 overflow-hidden bg-secondary">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  {project.type}
                </div>
              </div>

              <div className="p-8 flex flex-col space-y-6">
                <h3 className="text-2xl font-bold text-foreground tracking-tight">
                  {project.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                      <MapPin className="w-4 h-4 text-primary" /> Location
                    </div>
                    <p className="text-foreground text-sm">{project.location}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                      <Zap className="w-4 h-4 text-primary" /> Capacity
                    </div>
                    <p className="text-foreground text-sm font-semibold">{project.capacity}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                      <Calendar className="w-4 h-4 text-primary" /> Year
                    </div>
                    <p className="text-foreground text-sm">{project.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
