import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Canonical host handling and domain verification
  const envAllowed = (process.env.ALLOWED_HOSTS || '')
    .split(',')
    .map(h => h.trim())
    .filter(Boolean)
  const allowedHosts = new Set<string>([
    'www.dlquick.co.uk',
    'dlquick-platform-git-main-dlq.vercel.app',
    'dlquick-platform-847px5cgv-dlq.vercel.app',
    'localhost:3000',
    '127.0.0.1:3000',
    ...envAllowed,
  ])
  const host = req.headers.get('host') || ''
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  // Allow any Vercel preview hosts to reduce friction during deploys
  const isVercelPreview = host.endsWith('.vercel.app')
  const isAllowed = allowedHosts.has(host) || isVercelPreview

  // Redirect naked/apex to www in production for dlquick.co.uk
  if (!isLocal && host === 'dlquick.co.uk') {
    const url = new URL(req.url)
    url.host = 'www.dlquick.co.uk'
    return NextResponse.redirect(url, 308)
  }

  // Optionally block unknown hosts in production
  if (process.env.VERCEL && !isAllowed) {
    return new NextResponse('Not Found', { status: 404 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
  // Run on all paths except Next internals and known static/API endpoints
  '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|opengraph-image|robots.txt|sitemap.xml).*)',
  ],
}
