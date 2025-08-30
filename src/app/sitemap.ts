// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'https://www.kknaga.com';

  const lastModified = new Date().toISOString().split('T')[0];
  const pages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: lastModified },
    { url: `${baseUrl}/blog/engineering-efficiency`, lastModified: lastModified },
    { url: `${baseUrl}/blog/monetization`, lastModified: lastModified },
    { url: `${baseUrl}/blog/product-assessment`, lastModified: lastModified },
    { url: `${baseUrl}/blog/system-1`, lastModified: lastModified },

  ];

  return pages;
}