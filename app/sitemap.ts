import { MetadataRoute } from 'next';
import locations from '@/data/locations.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://krishnanuja.com';

  // Core static routes
  const staticRoutes = [
    '',
    '/quote',
    '/blog',
    '/solar-system/2kw-on-grid',
    '/solar-system/3kw-on-grid',
    '/solar-system/5kw-on-grid',
    '/solar-system/10kw-on-grid',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : (route === '/quote' ? 0.9 : 0.8),
  }));

  // Dynamic Location SEO routes
  const locationRoutes = locations.map((location) => ({
    url: `${baseUrl}/solar-installation/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog post routes
  const blogRoutes = [
    'how-much-can-you-save-with-solar-in-2024',
    'on-grid-vs-off-grid-solar-systems'
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...locationRoutes, ...blogRoutes];
}
