"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Sun, Zap, Home, Building2, Factory, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-brand-blue/5 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Krishnanuja Renewables"
                fill
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-brand-navy leading-tight">
                Krishnanuja
              </h1>
              <p className="text-[10px] font-medium text-brand-blue-light tracking-widest uppercase">
                Renewables Pvt. Ltd.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-brand-navy/80 hover:text-brand-blue transition-colors duration-200 rounded-lg hover:bg-brand-blue/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link href="tel:+919044555572" className="hidden md:flex">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-brand-blue/20 text-brand-blue hover:bg-brand-blue/5 hover:border-brand-blue/40"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">+91 9044555572</span>
                <span className="xl:hidden">Call Us</span>
              </Button>
            </Link>
            <Link href="/quote" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-gradient-to-r from-brand-blue to-brand-blue-light text-white shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all duration-300 hover:scale-105"
              >
                <Zap className="w-4 h-4 mr-1" />
                Get Free Quote
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-brand-navy">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-xl">
                <div className="flex flex-col h-full pt-8">
                  <div className="flex items-center gap-3 mb-8 px-2">
                    <Image src="/logo.png" alt="Logo" width={48} height={48} />
                    <div>
                      <p className="font-bold text-brand-navy">Krishnanuja</p>
                      <p className="text-xs text-brand-blue-light">Renewables Pvt. Ltd.</p>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 text-brand-navy/80 hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all duration-200 font-medium"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pb-8 px-2 space-y-3">
                    <Link href="tel:+919044555572" className="w-full">
                      <Button variant="outline" className="w-full gap-2 border-brand-blue/20">
                        <Phone className="w-4 h-4" /> Call Us
                      </Button>
                    </Link>
                    <Link href="/quote" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-light text-white mt-2">
                        <Zap className="w-4 h-4 mr-2" /> Get Free Quote
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
