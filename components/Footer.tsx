"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, Phone, Mail, Globe, ExternalLink, 
  Share2, MessageCircle, ArrowUp 
} from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Residential Solar", href: "#services" },
    { label: "Commercial Solar", href: "#services" },
    { label: "Ground Mounted", href: "#services" },
    { label: "Hybrid Solutions", href: "#services" },
    { label: "Solar Water Pump", href: "#services" },
    { label: "Solar Water Heater", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Careers", href: "#contact" },
    { label: "Blog", href: "#" },
  ],
  Support: [
    { label: "Contact Us", href: "#contact" },
    { label: "FAQs", href: "#faq" },
    { label: "Solar Calculator", href: "#contact" },
    { label: "Maintenance", href: "#contact" },
    { label: "Warranty", href: "#faq" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "#", label: "Instagram" },
  { icon: Share2, href: "#", label: "Twitter" },
  { icon: ExternalLink, href: "#", label: "LinkedIn" },
  { icon: Globe, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-brand-navy text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue" />
      
      <div className="absolute inset-0 solar-grid-pattern opacity-3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Krishnanuja" width={56} height={56} className="drop-shadow-lg" />
              <div>
                <h3 className="text-xl font-bold text-white">Krishnanuja</h3>
                <p className="text-xs text-brand-gold-light tracking-wider uppercase">Renewables Pvt. Ltd.</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              India&apos;s trusted Solar EPC partner delivering end-to-end renewable energy 
              solutions for homes, businesses, and industries. Powering a sustainable future, 
              one rooftop at a time.
            </p>
            <div className="text-xs text-white/40 space-y-1">
              <p><strong className="text-white/60">GST:</strong> 09AAMCK6259J1ZU</p>
              <p><strong className="text-white/60">CIN:</strong> U35105UP2026PTC244522</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-brand-gold-light mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span><strong className="text-white/70">Office:</strong> SH16/114-15-K2, Sharvodaya Nagar, Kadipur, Shivpur, Varanasi 221003</span>
                  <span><strong className="text-white/70">Warehouse:</strong> SH15/243, Bharlai, Shivpur, Varanasi 221003</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Phone className="w-4 h-4 text-brand-gold-light shrink-0" />
                <a href="tel:+919044555572" className="hover:text-brand-gold-light">
                  +91 9044555572 (WhatsApp & Call)
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Mail className="w-4 h-4 text-brand-gold-light shrink-0" />
                <a href="mailto:info@krishnanuja.com" className="hover:text-brand-gold-light">
                  info@krishnanuja.com
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/20/8 flex items-center justify-center hover:bg-brand-gold/20 hover:border-brand-gold/30 group"
                >
                  <Icon className="w-4 h-4 text-white/50 group-hover:text-brand-gold-light" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-brand-gold-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-neutral-950/8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} Krishnanuja Renewables Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <Link href="#" className="hover:text-white/60">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/60">Terms of Service</Link>
            <Link href="#" className="hover:text-white/60">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <Link
        href="#home"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light text-white shadow-lg shadow-brand-blue/30 flex items-center justify-center hover:shadow-brand-blue/50"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </Link>
    </footer>
  );
}
