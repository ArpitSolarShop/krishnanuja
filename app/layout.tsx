import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://krishnanuja.com'),
  title: {
    default: "Krishnanuja Renewables | Premium Solar EPC Services in India",
    template: "%s | Krishnanuja Renewables",
  },
  description:
    "India's trusted Solar EPC partner. Krishnanuja Renewables provides premium end-to-end solar solutions for residential, commercial, and industrial projects with PM Surya Ghar Yojana subsidies.",
  keywords: [
    "solar panels",
    "solar EPC",
    "rooftop solar",
    "solar installation India",
    "renewable energy",
    "Krishnanuja Renewables",
    "solar power",
    "PM Surya Ghar Yojana",
    "best solar installer",
  ],
  authors: [{ name: "Krishnanuja Renewables" }],
  creator: "Krishnanuja Renewables",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://krishnanuja.com",
    title: "Krishnanuja Renewables | Premium Solar EPC Services in India",
    description:
      "End-to-end solar solutions for homes and businesses. India's trusted Solar EPC partner.",
    siteName: "Krishnanuja Renewables",
    images: [
      {
        url: "/solar-farm.png",
        width: 1200,
        height: 630,
        alt: "Krishnanuja Renewables Solar Farm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishnanuja Renewables | Premium Solar EPC Services",
    description: "Save up to 90% on electricity bills with India's trusted Solar partner.",
    images: ["/solar-farm.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-foreground selection:text-background overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

