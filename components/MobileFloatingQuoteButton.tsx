"use client";

import React from "react";
import Link from "next/link";
import { Calculator, Phone, MessageCircle } from "lucide-react";

export default function MobileFloatingQuoteButton() {
  const phoneNumber = "919044555572";
  const defaultMessage = "Hi Krishnanuja Renewables, I'm interested in solar installation.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-3 bg-background/90 backdrop-blur-xl border-t border-border/50 sm:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <Link href={callUrl} className="flex-1">
          <button className="w-full flex flex-col items-center justify-center gap-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 py-2.5 rounded-xl active:scale-[0.98] transition-transform">
            <Phone className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
          </button>
        </Link>

        {/* Get Quote Button (Primary) */}
        <Link href="/#get-quote" className="flex-[2]">
          <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform">
            <Calculator className="w-5 h-5" />
            Free Quote
          </button>
        </Link>

        {/* WhatsApp Button */}
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <button className="w-full flex flex-col items-center justify-center gap-1 bg-[#25D366]/10 text-[#25D366] py-2.5 rounded-xl active:scale-[0.98] transition-transform">
            <MessageCircle className="w-5 h-5 fill-[#25D366]" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Chat</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
