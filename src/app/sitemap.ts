// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'https://www.kknaga.com';

  const lastModified = new Date().toISOString().split('T')[0];
  const pages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: lastModified },
  ];

  return pages;
}
