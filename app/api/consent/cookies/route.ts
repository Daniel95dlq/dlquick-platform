import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const choice = body?.choice as 'accept' | 'reject' | 'manage' | undefined
    const ua = req.headers.get('user-agent') || ''
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || undefined
    if (choice) {
      await prisma.cookieConsent.create({ data: { choice, userAgent: ua, ip } as any })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
