"use client";

import Script from "next/script";

// NOTE TO DEVELOPER/OWNER: 
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID.
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; 

export default function Analytics() {
  // If the ID is the placeholder or not set, don't load the script.
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
