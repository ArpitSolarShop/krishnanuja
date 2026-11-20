"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Zap, MessageCircle, Sparkles } from "lucide-react";
import { primaryNavigation } from "@/lib/site-navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hello Krishnanuja Renewables, I want to inquire about rooftop solar installation and PM Surya Ghar subsidy."
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-xs py-2.5"
          : "bg-background/95 py-3"
      }`}
    >
      {/* Top Subsidy Ticker Bar */}
      <div className="bg-primary/10 border-b border-primary/20 -mt-3 mb-2 py-1 text-center text-[11px] sm:text-xs font-semibold text-primary px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>
            <strong>PM Surya Ghar Muft Bijli Yojana:</strong> Avail up to ₹1,08,000 Govt Subsidy + 0% EMI Financing. Free Site Survey Across UP!
          </span>
          <Link href="/#calculator" className="underline font-bold hover:text-primary/80 ml-1">
            Calculate Subsidy →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
              <Image
                src="/logo-short.png"
                alt="Krishnanuja Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-foreground leading-tight">
                Krishnanuja <span className="text-primary">Renewables</span>
              </h1>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                Pvt. Ltd. • Solar EPC
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden xl:flex items-center gap-1">
            {primaryNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/60 px-3 py-1.5 rounded-full transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Actions */}
          <div className="flex items-center gap-2.5">
            {/* WhatsApp Quick */}
            <Link
              href={`https://wa.me/919044555572?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex"
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 rounded-full px-3.5 h-9"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                <span className="text-xs font-bold">WhatsApp</span>
              </Button>
            </Link>

            {/* Call */}
            <Link href="tel:+919044555572" className="hidden sm:flex">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-foreground hover:bg-secondary rounded-full px-3.5 h-9"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">+91 9044555572</span>
              </Button>
            </Link>

            {/* Get Quote Button */}
            <Link href="/#get-quote">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4.5 font-bold text-xs h-9 shadow-sm transition-all hover:scale-102"
              >
                <Zap className="w-3.5 h-3.5 mr-1" />
                Get Quote
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="xl:hidden">
                <Button variant="ghost" size="icon" className="text-foreground h-9 w-9">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-l border-border p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <Image src="/logo-short.png" alt="Logo" width={36} height={36} className="rounded-lg" />
                    <div>
                      <p className="font-bold text-foreground text-sm leading-tight">
                        Krishnanuja Renewables
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                        UPNEDA Empaneled Agency
                      </p>
                    </div>
                  </div>

                  <nav aria-label="Mobile navigation" className="flex flex-col gap-1 overflow-y-auto max-h-[60vh] pr-1">
                    {primaryNavigation.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="px-3.5 py-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl font-semibold text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-6 border-t border-border space-y-2.5">
                    <Link
                      href={`https://wa.me/919044555572?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      <Button variant="outline" className="w-full gap-2 rounded-xl border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10 h-10 font-bold text-xs">
                        <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500" /> Chat on WhatsApp
                      </Button>
                    </Link>

                    <Link href="tel:+919044555572" className="w-full block">
                      <Button variant="outline" className="w-full gap-2 rounded-xl h-10 font-bold text-xs">
                        <Phone className="w-4 h-4" /> Call +91 9044555572
                      </Button>
                    </Link>

                    <Link href="/#get-quote" onClick={() => setOpen(false)} className="w-full block">
                      <Button className="w-full rounded-xl bg-primary text-primary-foreground h-11 font-bold text-xs">
                        <Zap className="w-4 h-4 mr-1.5" /> Claim Subsidy &amp; Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
