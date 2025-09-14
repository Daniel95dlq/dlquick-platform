import { NextResponse } from 'next/server'

export function GET() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://www.dlquick.co.uk'
  const urls = ['/', '/services', '/partners', '/privacy', '/terms']
  const items = urls
    .map((u) => `<url><loc>${base}${u}</loc><changefreq>weekly</changefreq></url>`) 
    .join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}
