import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dlquick.co.uk';
  const currentDate = new Date();
  
  return [
    {
      url: baseUrl + '/',
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: baseUrl + '/services',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: baseUrl + '/partners',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: baseUrl + '/track',
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: baseUrl + '/legal/terms',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: baseUrl + '/legal/privacy',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: baseUrl + '/legal/cookies',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: baseUrl + '/legal/merchant-agreement',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: baseUrl + '/legal/partner-agreement',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: baseUrl + '/legal/buyer-protection',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.2,
    },
  ];
}
