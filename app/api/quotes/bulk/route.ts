import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import { revalidatePath } from 'next/cache'

const ALLOWED = ['CONTACTED','QUOTED','WON','LOST'] as const

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!(session as any)?.user || (session as any).user.role !== 'ADMIN') {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json().catch(() => null)
  const ids = (body?.ids as string[]) || []
  const status = (body?.status as string) || ''
  if (!ids.length || !ALLOWED.includes(status as any)) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }
  const userId = (session as any).user.id
  // Fetch current statuses to log from/to
  const current = await (prisma as any).quoteRequest.findMany({
    where: { id: { in: ids } },
    select: { id: true, status: true },
  })
  const map = new Map<string, string>(current.map((r: any) => [r.id, r.status]))
  await (prisma as any).$transaction([
    ...(ids.map((id) => (prisma as any).quoteRequest.update({ where: { id }, data: { status } }))),
    ...(ids.map((id) => (prisma as any).quoteActivity.create({ data: {
      quoteId: id,
      fromStatus: map.get(id),
      toStatus: status,
      changedBy: userId,
      note: `Bulk set status to ${status}`,
    } }))),
  ])
  // Revalidate admin listing and any open detail pages
  revalidatePath('/admin/quotes')
  ids.forEach((id) => revalidatePath(`/admin/quotes/${id}`))
  return NextResponse.json({ ok: true, count: ids.length })
}
