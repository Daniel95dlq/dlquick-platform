import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://www.dlquick.co.uk'
  // Include a cache-busting hint so deploys update robots quickly (no behavior change)
  const v = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) || 'local'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
  disallow: [],
      },
    ],
    sitemap: `${base}/sitemap.xml?v=${v}`,
    host: base.replace(/^https?:\/\//, ''),
  }
}
