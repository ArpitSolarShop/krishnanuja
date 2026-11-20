import { faqs } from "@/data/faqs";
import { siteConfig } from "@/lib/seo/config";

interface LocationJsonLdProps {
  city: string;
  state: string;
  pincode?: string;
  subsidy?: string;
}

const LocationJsonLd = ({ city, state, pincode, subsidy }: LocationJsonLdProps) => {
  const baseUrl = siteConfig.url;
  const url = `${baseUrl}/solar-installation/${city.toLowerCase().replace(/\s+/g, "-")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. LocalBusiness / Contractor Node
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${url}/#localbusiness`,
        name: `${siteConfig.name} - ${city}`,
        url,
        logo: `${baseUrl}${siteConfig.logo}`,
        image: `${baseUrl}${siteConfig.ogImage}`,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        priceRange: "₹55,000 - ₹5,00,000",
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: state,
          ...(pincode && { postalCode: pincode }),
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        areaServed: {
          "@type": "City",
          name: city,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "350",
          bestRating: "5",
          worstRating: "1",
        },
      },
      // 2. Service Schema
      {
        "@type": "Service",
        "@id": `${url}/#service`,
        name: `Rooftop Solar Installation in ${city}`,
        serviceType: "Solar Panel Installation & EPC",
        description: `Premium rooftop solar panel installation services in ${city}, ${state}. Verified PM Surya Ghar subsidy partners with up to ₹${subsidy || "1,08,000"} benefit and 25-year warranty.`,
        provider: {
          "@id": `${url}/#localbusiness`,
        },
        areaServed: {
          "@type": "City",
          name: city,
        },
      },
      // 3. Breadcrumb Schema
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Solar Installation",
            item: `${baseUrl}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: city,
            item: url,
          },
        ],
      },
      // 4. FAQ Schema
      {
        "@type": "FAQPage",
        mainEntity: faqs.slice(0, 8).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default LocationJsonLd;
