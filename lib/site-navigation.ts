export type SiteLink = {
  href: string;
  label: string;
};

// The canonical public navigation. Keep page labels and destinations here so
// the desktop menu, mobile menu, footer, and sitemap cannot drift apart.
export const primaryNavigation: SiteLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },

  { href: "/build-your-system", label: "System Builder" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const footerNavigation = {
  Solutions: [
    { href: "/products", label: "All Products" },
    { href: "/products/tata-solar", label: "Tata Power Solar" },
    { href: "/products/hybrid-systems", label: "Hybrid Systems" },
    { href: "/products/reliance-new-energy", label: "Reliance New Energy" },
  ],
  Explore: [

    { href: "/build-your-system", label: "System Builder" },
    { href: "/#get-quote", label: "Get a Quote" },
    { href: "/blog", label: "Solar Insights" },
  ],
  Support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/#faq", label: "FAQs" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
  ],
} satisfies Record<string, SiteLink[]>;

export const publicStaticRoutes = [
  "/",
  "/products",
  "/products/tata-solar",
  "/products/hybrid-systems",
  "/products/reliance-new-energy",

  "/build-your-system",
  "/#get-quote",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
] as const;
