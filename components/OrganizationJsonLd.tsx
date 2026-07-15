export default function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SolarInstallationCompany",
    "name": "Krishnanuja Renewables Pvt. Ltd.",
    "url": "https://krishnanuja.com",
    "logo": "https://krishnanuja.com/logo.png",
    "image": "https://krishnanuja.com/solar-farm.png",
    "description": "Premium Solar EPC Services in India. Expert rooftop solar installations for residential, commercial, and industrial projects with government subsidies.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Varanasi",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7905763618",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.facebook.com/krishnanujarenewables",
      "https://www.instagram.com/krishnanujarenewables"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
