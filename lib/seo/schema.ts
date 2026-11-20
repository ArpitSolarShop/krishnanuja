// lib/seo/schema.ts

import { siteConfig } from "./config";

/**
 * Generates Organization / LocalBusiness JSON-LD schema
 * Google recognizes HomeAndConstructionBusiness / LocalBusiness
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: siteConfig.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    foundingDate: "2013",
    founder: [
      {
        "@type": "Person",
        name: "Rahul Mishra",
        jobTitle: "Director",
      },
      {
        "@type": "Person",
        name: "Ratnesh Mishra",
        jobTitle: "Director & CEO",
      },
    ],
    knowsAbout: [
      "Top Solar Installer in Varanasi",
      "Solar Panel Installation in Varanasi and Uttar Pradesh",
      "PM Surya Ghar Muft Bijli Yojana Subsidies",
      "UPNEDA Empaneled Solar EPC Agency",
      "Commercial & Industrial Solar Power Plants",
      "Agricultural Solar Water Pumps Shakti Pumps",
      "Solar Atta Chakki and Flour Mill Setups",
      "Hybrid Solar Systems with Battery Storage",
      "Net Metering Bi-Directional Liaisoning PuVVNL",
      "Tata Power Solar and Reliance New Energy Panels",
    ],
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasMap: siteConfig.hasMap,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: siteConfig.socialLinks,
  };
}

/**
 * Generates WebSite Schema with potential Sitelinks SearchBox
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-IN",
  };
}

/**
 * Generates BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * Generates Article / BlogPosting Schema
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  image,
  author = siteConfig.name,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string | null;
  author?: string;
}) {
  const url = `${siteConfig.url}/blog/${slug}`;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description,
    image: [imageUrl],
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Organization",
      name: author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
  };
}

/**
 * Generates Product Schema for Solar Equipment & Solutions
 */
export function generateProductSchema({
  name,
  description,
  image,
  brand,
  model,
  price,
  priceCurrency = "INR",
  inStock = true,
  category = "Solar Panels",
}: {
  name: string;
  description: string;
  image?: string;
  brand: string;
  model?: string;
  price?: string;
  priceCurrency?: string;
  inStock?: boolean;
  category?: string;
}) {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: imageUrl,
    category,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    ...(model && { model }),
    offers: {
      "@type": "Offer",
      url: siteConfig.url,
      priceCurrency,
      price: price || "0",
      priceValidUntil: "2027-12-31",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };
}

/**
 * Generates FAQ Schema
 */
export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates Service Schema (e.g. Solar EPC, Residential Installation)
 */
export function generateServiceSchema({
  name,
  serviceType,
  description,
  areaName,
}: {
  name: string;
  serviceType: string;
  description: string;
  areaName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: areaName
      ? {
          "@type": "City",
          name: areaName,
        }
      : siteConfig.serviceAreas.map((area) => ({
          "@type": "City",
          name: area,
        })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar Installation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Rooftop Solar Installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial & Industrial Solar EPC",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "PM Surya Ghar Yojana Subsidy Consultation",
          },
        },
      ],
    },
  };
}

/**
 * Generates VideoObject Schema for video tutorials, showcases, or testimonials
 */
export function generateVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate,
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
  };
}
