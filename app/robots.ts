import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot"],
        allow: ["/", "/products", "/blog", "/solar-installation/", "/build-your-system"],
        disallow: ["/api/", "/admin/", "/login/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
