import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FloatingQuickAssist from "@/components/FloatingQuickAssist";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <FloatingQuickAssist />
      <Footer />
    </>
  );
}
