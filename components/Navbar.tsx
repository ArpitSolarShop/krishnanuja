"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Zap } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Testimonials" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border py-3"
          : "bg-background/95 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt="Krishnanuja Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold tracking-tight text-foreground leading-none">
                Krishnanuja
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href="tel:+919044555572" className="hidden md:flex">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-foreground hover:bg-secondary rounded-full px-4"
              >
                <Phone className="w-4 h-4" />
                <span className="text-[13px]">Call Us</span>
              </Button>
            </Link>
            <Link href="/quote" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 font-medium text-[13px] transition-colors"
              >
                Get Quote
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-l border-border">
                <div className="flex flex-col h-full pt-8">
                  <div className="flex items-center gap-3 mb-8 px-2">
                    <Image src="/logo.png" alt="Logo" width={32} height={32} />
                    <p className="font-semibold text-foreground text-lg">Krishnanuja</p>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl font-medium text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pb-8 px-2 space-y-3">
                    <Link href="tel:+919044555572" className="w-full">
                      <Button variant="outline" className="w-full gap-2 rounded-xl">
                        <Phone className="w-4 h-4" /> Call Us
                      </Button>
                    </Link>
                    <Link href="/quote" onClick={() => setOpen(false)}>
                      <Button className="w-full rounded-xl bg-primary text-primary-foreground mt-2">
                        <Zap className="w-4 h-4 mr-2" /> Get Quote
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
