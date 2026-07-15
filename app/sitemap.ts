import { MetadataRoute } from 'next';
import locations from '@/data/locations.json';
import { publicStaticRoutes } from '@/lib/site-navigation';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://krishnanuja.com';

  const staticRoutes = publicStaticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  // Dynamic Location SEO routes
  const locationRoutes = locations.map((location) => ({
    url: `${baseUrl}/solar-installation/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...locationRoutes];
}
