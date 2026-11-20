import type { MetadataRoute } from "next";
import locations from "@/data/locations.json";
import { publicStaticRoutes } from "@/lib/site-navigation";
import { siteConfig } from "@/lib/seo/config";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // 1. Static Routes with priority weights
  const staticRoutes: MetadataRoute.Sitemap = publicStaticRoutes.map((route) => {
    let priority = 0.8;
    let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly";

    if (route === "/") {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (
      route === "/solar-installation" ||
      route.startsWith("/products") ||
      route === "/build-your-system"
    ) {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (route === "/blog") {
      priority = 0.8;
      changeFrequency = "daily";
    } else if (route === "/contact") {
      priority = 0.7;
      changeFrequency = "monthly";
    } else if (route === "/privacy-policy" || route === "/terms-and-conditions") {
      priority = 0.3;
      changeFrequency = "yearly";
    }

    return {
      url: `${baseUrl}${route === "/" ? "" : route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });

  // 2. Programmatic Location SEO routes
  const locationRoutes: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${baseUrl}/solar-installation/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 3. Dynamic Published Blog Posts from Database
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "published" },
      select: {
        slug: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  return [...staticRoutes, ...locationRoutes, ...blogRoutes];
}
