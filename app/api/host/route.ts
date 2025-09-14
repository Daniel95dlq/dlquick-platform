import { NextResponse } from 'next/server'

export function GET(req: Request) {
  try {
    // In Next.js app router, req.headers is a ReadonlyHeaders; read from it directly
    const host = req.headers.get('host')
    const xfHost = req.headers.get('x-forwarded-host')
    const xfProto = req.headers.get('x-forwarded-proto')
    const url = new URL(req.url)
    return NextResponse.json({ host, xForwardedHost: xfHost, xForwardedProto: xfProto, url: url.origin })
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
