import { NextRequest, NextResponse } from 'next/server'

export function GET(req: NextRequest) {
  const hdr = req.headers.get('x-forwarded-host') || req.headers.get('host')
  const proto = req.headers.get('x-forwarded-proto') || 'https'
  const inferred = hdr ? `${proto}://${hdr}` : undefined
  const base = process.env.NEXT_PUBLIC_APP_URL || inferred || 'https://www.dlquick.co.uk'
  const urls = ['/', '/services', '/partners', '/privacy', '/terms', '/overview']
  const items = urls
    .map((u) => `<url><loc>${base}${u}</loc><changefreq>weekly</changefreq></url>`) 
    .join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}
