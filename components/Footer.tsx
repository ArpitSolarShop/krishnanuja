"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  MapPin, Phone, Mail, ArrowUp
} from "lucide-react";
import { footerNavigation } from "@/lib/site-navigation";

export default function Footer() {
  return (
    <footer className="relative bg-secondary text-foreground overflow-hidden border-t border-border/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Image src="/logo-short.png" alt="Krishnanuja" width={48} height={48} className="drop-shadow-sm rounded-xl" />
              <div>
                <h3 className="text-xl font-bold text-foreground">Krishnanuja</h3>
                <p className="text-xs text-muted-foreground tracking-wider uppercase font-semibold">Renewables Pvt. Ltd.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-medium">
              India&apos;s trusted Solar EPC partner delivering end-to-end renewable energy 
              solutions for homes, businesses, and industries. Powering a sustainable future, 
              one rooftop at a time.
            </p>
            <div className="text-xs text-muted-foreground space-y-1 font-medium">
              <p><strong className="text-foreground">GST:</strong> 09AAMCK6259J1ZU</p>
              <p><strong className="text-foreground">CIN:</strong> U35105UP2026PTC244522</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-muted-foreground font-medium">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span><strong className="text-foreground">Office:</strong> Sh16/114-25-K-2, Sharvodayanagar, Kadipur, Shivpur, Varanasi 221003 (UP), India</span>
                  <span><strong className="text-foreground">Warehouse:</strong> SH15/243, Bharlai, Shivpur, Varanasi 221003</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+919044555572" className="hover:text-primary transition-colors">
                  +91 9044555572 (WhatsApp & Call)
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@krishnanuja.com" className="hover:text-primary transition-colors">
                  info@krishnanuja.com
                </a>
              </div>
            </div>

          </div>

          {/* Links */}
          {Object.entries(footerNavigation).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-border" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} Krishnanuja Renewables Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <Link
        href="/#home"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-background/80 backdrop-blur border border-border text-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </Link>
    </footer>
  );
}
