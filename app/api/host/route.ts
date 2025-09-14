import { NextResponse } from 'next/server'

export function GET(req: Request) {
  const headers = new Headers(req.headers as any)
  const host = headers.get('host')
  const xfHost = headers.get('x-forwarded-host')
  const xfProto = headers.get('x-forwarded-proto')
  const url = new URL(req.url)
  return NextResponse.json({ host, xForwardedHost: xfHost, xForwardedProto: xfProto, url: url.origin })
}
