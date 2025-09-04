import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/services',
          '/partners', 
          '/track',
          '/legal/*',
        ],
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://dlquick.co.uk/sitemap.xml',
    host: 'https://dlquick.co.uk',
  }
}
