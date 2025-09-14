import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!(session as any)?.user) return new NextResponse('Unauthorized', { status: 401 })
  const role = (session as any).user.role
  if (role !== 'ADMIN') return new NextResponse('Forbidden', { status: 403 })

  const { searchParams } = new URL(req.url)
  const limit = Math.min(1000, Math.max(1, parseInt(searchParams.get('limit') || '500', 10)))
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const skip = (page - 1) * limit
  const status = (searchParams.get('status') || '').toUpperCase()
  const where = status ? { status } : {}

  const rows = await (prisma as any).partnerApplication.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip,
    where,
    select: { id: true, createdAt: true, type: true, name: true, email: true, phone: true, company: true, status: true },
  })
  const header = ['id','createdAt','type','name','email','phone','company','status']
  const body = rows.map((r: any) => [r.id, r.createdAt.toISOString(), r.type, r.name, r.email, r.phone, r.company || '', r.status]
    .map(v => typeof v === 'string' ? `"${v.replace(/"/g,'""')}"` : v).join(',')).join('\n')
  const csv = header.join(',') + '\n' + body
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="partners.csv"',
    }
  })
}
