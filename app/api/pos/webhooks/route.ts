import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const provider = url.searchParams.get('provider') || 'unknown'
  const signature = req.headers.get('x-signature') || undefined
  const eventType = req.headers.get('x-event-type') || undefined
  const payload = await req.json().catch(() => ({}))
  await prisma.posWebhookLog.create({ data: { provider, eventType: eventType || null, signature, payload } as any })
  return NextResponse.json({ ok: true })
}
