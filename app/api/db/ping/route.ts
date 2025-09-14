import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Simple lightweight query to verify database connectivity
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ ok: true, db: 'up' })
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
