import { services } from '@/src/lib/services'

export default function sitemap(){
  const base = 'https://dlquick.co.uk'
  const staticRoutes = [
    '',
    '/services',
    '/track',
    '/partners',
    '/legal/terms',
    '/legal/privacy',
    '/legal/cookies',
  ]

  const serviceRoutes = services.map(s => `/services/${s.slug}`)

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: base + path,
    lastModified: new Date(),
  }))
}
