import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krishnanuja Renewables Pvt. Ltd. | Solar EPC Services",
  description:
    "India's trusted Solar EPC partner. Krishnanuja Renewables provides end-to-end solar solutions for residential, commercial, and industrial projects. Save up to 90% on electricity bills.",
  keywords: [
    "solar panels",
    "solar EPC",
    "rooftop solar",
    "solar installation India",
    "renewable energy",
    "Krishnanuja Renewables",
    "solar power",
    "clean energy",
  ],
  openGraph: {
    title: "Krishnanuja Renewables Pvt. Ltd. | Solar EPC Services",
    description:
      "End-to-end solar solutions for homes and businesses. Save up to 90% on your electricity bills with India's trusted Solar EPC partner.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white font-sans selection:bg-brand-gold/30 selection:text-brand-gold-light overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
