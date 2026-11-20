"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Eye,
  CheckCircle2,
  FileCheck2,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const partners = [
  {
    name: "Tata Power Solar",
    logo: "/Tata Power Solar.webp",
    tier: "Tier-1 Partner",
    role: "Panels & Central Inverters",
  },
  {
    name: "Reliance New Energy",
    logo: "/Reliance.webp",
    tier: "Authorized Channel Partner",
    role: "Solar PV Modules",
  },
  {
    name: "Waaree Energies",
    logo: "/Waree.webp",
    tier: "Tier-1 Manufacturer",
    role: "Bifacial High-Efficiency PV",
  },
  {
    name: "Adani Solar",
    logo: "/AdaniSolar.webp",
    tier: "Authorized Systems",
    role: "Mono PERC Modules",
  },
  {
    name: "Shakti Solar Pumps",
    logo: "/Shakti Solar.webp",
    tier: "Authorized Partner",
    role: "Agricultural & Submersible Pumping",
  },
];

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
  image: string;
  badge: string;
}

const certificates: Certificate[] = [
  {
    id: "reliance",
    title: "Authorized Channel Partner Certificate",
    issuer: "Reliance New Energy Solar Ltd.",
    category: "Tier-1 Manufacturer Authorization",
    description:
      "Official certificate recognizing Krishnanuja Renewables (formerly Arpit Solar Shop) as an authorized partner for distribution and installation of Reliance high-efficiency solar modules.",
    image: "/assets/certificates/Reliance Solar Certificate.jpg",
    badge: "Official Reliance Partner",
  },
  {
    id: "shakti",
    title: "Authorized Channel Partner & Dealership",
    issuer: "Shakti Pumps (India) Ltd.",
    category: "Solar Pumping & Drives Certification",
    description:
      "Authorized dealership accreditation for solar agricultural pumping systems, hybrid VFD controllers, and high-efficiency solar irrigation solutions.",
    image: "/assets/certificates/Shkti Solar Certificate.jpg",
    badge: "Shakti Solar Certified",
  },
];

export default function PartnersSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="partners" className="py-24 relative bg-background border-t border-border/50 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20">
            <ShieldCheck className="w-4 h-4" />
            Official Tier-1 Partnerships &amp; Authorizations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Backed by India&apos;s <span className="text-primary">Leading Solar Giants</span>
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            We exclusively procure and install high-performance equipment from authorized Tier-1 brands, backed by original manufacturer warranties and regulatory credentials.
          </p>
        </div>

        {/* Partners Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group bg-card border border-border/70 hover:border-primary/50 rounded-3xl p-5 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full h-20 sm:h-24 flex items-center justify-center p-2 mb-3 bg-secondary/30 rounded-2xl group-hover:bg-primary/5 transition-colors">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} Authorized Partner Krishnanuja Renewables`}
                  width={140}
                  height={60}
                  className="max-h-16 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
                />
              </div>

              <div className="w-full">
                <p className="font-bold text-foreground text-sm line-clamp-1 mb-1">
                  {partner.name}
                </p>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20 mb-1">
                  {partner.tier}
                </span>
                <p className="text-[11px] text-muted-foreground line-clamp-1">
                  {partner.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Official Channel Partner Certificates */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Official Authorization Certificates
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Direct dealership &amp; channel partner accreditations issued to our agency
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="group bg-secondary/20 border border-border/70 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 font-semibold text-xs px-3 py-1">
                      {cert.category}
                    </Badge>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Active
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-semibold text-muted-foreground mb-4">
                    Issued by: <strong className="text-foreground">{cert.issuer}</strong>
                  </p>
                </div>

                {/* Certificate Preview Card */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border/70 bg-card cursor-pointer group/thumb"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-2 group-hover/thumb:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-sm backdrop-blur-[2px]">
                    <Eye className="w-5 h-5" /> Click to Inspect Certificate
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-primary" /> Genuine Original Document
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCert(cert)}
                    className="text-primary hover:text-primary/80 font-bold gap-1 text-xs"
                  >
                    Inspect Certificate <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Accreditations Strip */}
        <div className="bg-secondary/40 border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="space-y-1 sm:border-r border-border/60 sm:pr-6">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">UP State Agency</p>
              <h4 className="text-lg font-bold text-foreground">UPNEDA Empaneled</h4>
              <p className="text-xs text-muted-foreground">Registered vendor for UP state rooftop solar schemes</p>
            </div>
            <div className="space-y-1 sm:border-r border-border/60 sm:pr-6">
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Central Scheme</p>
              <h4 className="text-lg font-bold text-foreground">PM Surya Ghar</h4>
              <p className="text-xs text-muted-foreground">Direct National Portal subsidy processing assistance</p>
            </div>
            <div className="space-y-1 sm:border-r border-border/60 sm:pr-6">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Discom Integration</p>
              <h4 className="text-lg font-bold text-foreground">Net Metering EPC</h4>
              <p className="text-xs text-muted-foreground">DVVNL, MVVNL, PVVNL, PuVVNL liaisoning</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Warranty Shield</p>
              <h4 className="text-lg font-bold text-foreground">25-Yr Performance</h4>
              <p className="text-xs text-muted-foreground">Manufacturer tier-1 linear degradation warranty</p>
            </div>
          </div>
        </div>

      </div>

      {/* Certificate Modal Lightbox */}
      <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
        <DialogContent className="max-w-4xl p-4 sm:p-6 bg-card border-border">
          {selectedCert && (
            <div className="space-y-4">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                    {selectedCert.badge}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Verified Document</span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
                  {selectedCert.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedCert.issuer} — {selectedCert.description}
                </p>
              </DialogHeader>

              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-secondary/80 rounded-2xl overflow-hidden border border-border shadow-inner">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  sizes="1000px"
                  className="object-contain p-2"
                  priority
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <p className="text-xs text-muted-foreground">
                  Registered under Krishnanuja Renewables Pvt. Ltd. / Arpit Solar Shop
                </p>
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                >
                  Open Full Resolution <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
