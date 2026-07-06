import { faqs } from "@/data/faqs";

interface LocationJsonLdProps {
    city: string;
    state: string;
}

const LocationJsonLd = ({ city, state }: LocationJsonLdProps) => {
    const baseUrl = "https://krishnanuja.com";
    const url = `${baseUrl}/solar-installation/${city.toLowerCase().replace(/\s+/g, '-')}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            // 1. Service Schema
            {
                "@type": "Service",
                "serviceType": "Solar Panel Installation",
                "provider": {
                    "@type": "LocalBusiness",
                    "name": `Krishnanuja Renewables - ${city}`,
                    "telephone": "+91-9509624540",
                    "priceRange": "₹50000 - ₹500000",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": city,
                        "addressRegion": state,
                        "addressCountry": "IN"
                    },
                    "areaServed": {
                        "@type": "City",
                        "name": city
                    }
                },
                "areaServed": {
                    "@type": "City",
                    "name": city
                },
                "name": `Solar Installation in ${city}`,
                "description": `Premium solar panel installation services in ${city}, ${state}. Verified subsidy partners and 25-year warranty.`
            },
            // 2. Breadcrumb Schema
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": baseUrl
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Solar Installation",
                        "item": `${baseUrl}/solar-installation`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": city,
                        "item": url
                    }
                ]
            },
            // 3. Aggregate Rating
            {
                "@type": "AggregateRating",
                "itemReviewed": {
                    "@type": "LocalBusiness",
                    "name": `Krishnanuja Renewables - ${city}`
                },
                "ratingValue": "4.9",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "350"
            },
            // 4. FAQ Schema
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map((faq) => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default LocationJsonLd;
