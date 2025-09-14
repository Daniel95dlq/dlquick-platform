import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'

const ALLOWED_STATUSES = ['NEW','CONTACTED','QUOTED','WON','LOST'] as const

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const row = await (prisma as any).quoteRequest.findUnique({ where: { id } })
  if (!row) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true, item: row })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const role = (session?.user as any)?.role
  if (!session?.user || role !== 'ADMIN') {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params
  const body = await req.json().catch(() => null)
  const status = body?.status as (typeof ALLOWED_STATUSES)[number] | undefined

  if (!status || !ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ ok: false, error: 'Invalid status' }, { status: 400 })
  }

  const updated = await (prisma as any).quoteRequest.update({
    where: { id },
    data: { status },
    select: { id: true, status: true },
  }).catch(() => null)

  if (!updated) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, item: updated })
}
