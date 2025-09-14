import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(req: NextRequest) {
  const { type, email, notes } = await req.json().catch(() => ({}))
  if (!email || (type !== 'export' && type !== 'delete')) return NextResponse.json({ ok: false }, { status: 400 })
  const rec = await prisma.dSARRequest.create({ data: { email, type, status: 'received', notes } as any })
  return NextResponse.json({ ok: true, id: rec.id })
}
