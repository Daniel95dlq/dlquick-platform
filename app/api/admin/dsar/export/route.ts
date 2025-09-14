import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function GET() {
  const rows = await prisma.dSARRequest.findMany({
    orderBy: { createdAt: 'desc' },
  })
  const header = ['id','email','type','status','notes','createdAt','updatedAt','userId']
  const csv = [header.join(',')].concat(
    rows.map(r => [r.id, r.email, r.type, r.status, (r.notes||'').replaceAll('\n',' '), r.createdAt.toISOString(), r.updatedAt.toISOString(), r.userId||''].map(v => `"${String(v).replaceAll('"','""')}"`).join(','))
  ).join('\n')
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="dsar_export.csv"',
    },
  })
}
