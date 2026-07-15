"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FloatingChatButton() {
  // Replace with the business WhatsApp number
  const phoneNumber = "917905763618";
  const defaultMessage = "Hi Krishnanuja Renewables, I'm interested in solar installation.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      className="fixed bottom-6 left-6 z-50 hidden sm:block"
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/20 hover:shadow-xl flex items-center justify-center relative group"
        >
          {/* Subtle pulse effect */}
          <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20" />
          
          <MessageCircle className="w-7 h-7 text-white fill-white" />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-4 bg-foreground text-background text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat on WhatsApp
            {/* Tooltip Arrow */}
            <div className="absolute top-1/2 -left-1 -mt-1 w-2 h-2 bg-foreground rotate-45" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
