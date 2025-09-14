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
  const allowedHosts = new Set([
    'www.dlquick.co.uk',
    'dlquick-platform-git-main-dlq.vercel.app',
    'dlquick-platform-847px5cgv-dlq.vercel.app',
    'localhost:3000',
    '127.0.0.1:3000',
  ])
  const host = req.headers.get('host') || ''
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  const isAllowed = allowedHosts.has(host)

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
    // Host canonicalization must run on all paths
    '/:path*',
    '/DLQuick_Web_Platform_and_Legal_Pack.pdf',
    '/DLQuick_Web_Platform_and_Extra_Bomb_Pack.pdf',
    '/DLQuick_Mega_Master_Developer_Pack.pdf',
    '/DLQuick_Mega_Master_Developer_Pack_WITH_WIREFRAMES.pdf',
    '/DLQuick_Project_Summary_for_Developers.pdf',
  ],
}
