import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminPath = req.nextUrl.pathname.startsWith('/admin')
    const isAgentPath = req.nextUrl.pathname.startsWith('/agent')
    const isPartnerPath = req.nextUrl.pathname.startsWith('/partner')

    // Check admin access
    if (isAdminPath && token?.role !== 'MASTER_ADMIN' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    // Check agent access
    if (isAgentPath && token?.role !== 'AGENT' && token?.role !== 'ADMIN' && token?.role !== 'MASTER_ADMIN') {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    // Check partner access
    if (isPartnerPath && token?.role !== 'STORE' && token?.role !== 'ADMIN' && token?.role !== 'MASTER_ADMIN') {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public routes
        if (req.nextUrl.pathname.startsWith('/api/auth')) return true
        if (req.nextUrl.pathname === '/') return true
        if (req.nextUrl.pathname.startsWith('/services')) return true
        if (req.nextUrl.pathname.startsWith('/legal')) return true
        if (req.nextUrl.pathname.startsWith('/track')) return true
        if (req.nextUrl.pathname.startsWith('/removals')) return true

        // Require auth for protected routes
        if (req.nextUrl.pathname.startsWith('/admin')) return !!token
        if (req.nextUrl.pathname.startsWith('/agent')) return !!token
        if (req.nextUrl.pathname.startsWith('/partner')) return !!token

        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/agent/:path*', 
    '/partner/:path*'
  ]
}
