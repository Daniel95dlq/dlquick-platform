import { NextRequest, NextResponse } from 'next/server'

// Block access to sensitive PDFs anywhere they might be hosted
const BLOCKED_PDFS = [
  '/DLQuick_Web_Platform_and_Legal_Pack.pdf',
  '/DLQuick_Web_Platform_and_Extra_Bomb_Pack.pdf',
  '/DLQuick_Mega_Master_Developer_Pack.pdf',
  '/DLQuick_Mega_Master_Developer_Pack_WITH_WIREFRAMES.pdf',
  '/DLQuick_Project_Summary_for_Developers.pdf',
]

export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname
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
  if (BLOCKED_PDFS.includes(p)) {
    return new NextResponse('Not Found', { status: 404 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
  // Run on all paths except Next internals and heavy static assets
  '/((?!_next/static|_next/image|favicon.ico|icon.svg|opengraph-image).*)',
  ],
}
