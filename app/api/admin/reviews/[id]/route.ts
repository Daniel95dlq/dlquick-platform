import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { verified } = body || {}
    const updated = await prisma.review.update({
      where: { id: params.id },
      data: { verified: Boolean(verified) },
      select: { id: true, verified: true },
    })
    return NextResponse.json({ ok: true, item: updated })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'update_failed' }, { status: 400 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.review.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'delete_failed' }, { status: 400 })
  }
}
