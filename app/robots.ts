import { MetadataRoute } from 'next';
import { SITE_METADATA } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/admin'],
    },
    sitemap: `${SITE_METADATA.siteUrl}/sitemap.xml`,
  };
}
