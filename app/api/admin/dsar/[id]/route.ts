import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { status, notes } = body || {}
    const updated = await prisma.dSARRequest.update({
      where: { id: params.id },
      data: {
        status: typeof status === 'string' ? status : undefined,
        notes: typeof notes === 'string' ? notes : undefined,
      },
      select: { id: true, status: true, notes: true, updatedAt: true },
    })
    return NextResponse.json({ ok: true, item: updated })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'update_failed' }, { status: 400 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.dSARRequest.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'delete_failed' }, { status: 400 })
  }
}
