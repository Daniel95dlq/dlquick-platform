import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getCurrentUser } from '../../../lib/auth'

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user?.id) return NextResponse.json({ ok: false }, { status: 401 })
  const { orderId, rating, comment } = await req.json().catch(() => ({}))
  if (!orderId || !rating || rating < 1 || rating > 5) return NextResponse.json({ ok: false }, { status: 400 })
  const order = await prisma.order.findUnique({ where: { id: orderId } })
  if (!order || order.userId !== user.id) return NextResponse.json({ ok: false }, { status: 403 })
  const rec = await prisma.review.create({ data: { orderId, userId: user.id, rating, comment, verified: true } })
  return NextResponse.json({ ok: true, id: rec.id })
}
