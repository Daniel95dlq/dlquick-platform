import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    '/DLQuick_Web_Platform_and_Legal_Pack.pdf',
    '/DLQuick_Web_Platform_and_Extra_Bomb_Pack.pdf',
    '/DLQuick_Mega_Master_Developer_Pack.pdf',
    '/DLQuick_Mega_Master_Developer_Pack_WITH_WIREFRAMES.pdf',
    '/DLQuick_Project_Summary_for_Developers.pdf',
  ]
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
    ],
  sitemap: (process.env.NEXT_PUBLIC_APP_URL || 'https://www.dlquick.co.uk') + '/sitemap.xml',
  }
}
