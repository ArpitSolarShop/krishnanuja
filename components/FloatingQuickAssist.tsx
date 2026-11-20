"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Zap, X, Headphones } from "lucide-react";

export default function FloatingQuickAssist() {
  const [open, setOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hello Krishnanuja Renewables, I want to inquire about rooftop solar installation and PM Surya Ghar subsidy."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 print:hidden">
      {/* Expanded Quick Action Menu */}
      {open && (
        <div className="flex flex-col items-end gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* WhatsApp Direct */}
          <Link
            href={`https://wa.me/919044555572?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white dark:bg-card text-foreground px-4 py-2.5 rounded-full shadow-xl border border-emerald-500/20 hover:border-emerald-500 hover:shadow-emerald-500/10 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              WhatsApp Us
            </span>
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
          </Link>

          {/* Instant Call */}
          <Link
            href="tel:+919044555572"
            className="group flex items-center gap-3 bg-white dark:bg-card text-foreground px-4 py-2.5 rounded-full shadow-xl border border-blue-500/20 hover:border-blue-500 hover:shadow-blue-500/10 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              Call Solar Expert
            </span>
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" />
            </div>
          </Link>

          {/* Instant Quote Shortcut */}
          <Link
            href="/#get-quote"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3 bg-white dark:bg-card text-foreground px-4 py-2.5 rounded-full shadow-xl border border-primary/20 hover:border-primary hover:shadow-primary/10 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xs font-semibold text-foreground">
              Instant Quote &amp; Subsidy
            </span>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
          </Link>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`group relative flex items-center justify-center h-14 w-14 rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 ${
          open
            ? "bg-foreground text-background rotate-90"
            : "bg-primary text-primary-foreground hover:scale-105 hover:shadow-primary/25"
        }`}
        aria-label="Contact solar consultation assistant"
      >
        {/* Subtle Pulse Animation when closed */}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-background" />
          </span>
        )}

        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <Headphones className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        )}
      </button>
    </div>
  );
}
