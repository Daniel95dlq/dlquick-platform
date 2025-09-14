import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { rateLimit } from '../../../../lib/ratelimit'
import { notifyOps } from '../../../../lib/notify'
// Avoid importing Prisma enum (not always generated); use a local union instead
type PartnerTypeV = 'DRIVER' | 'MERCHANT' | 'LTD'

function normalisePartnerPayload(body: any) {
  // Accept both legacy { type,name,email,phone,company,data } and new { role,data }
  const role: string | undefined = body?.role
  const legacyType: string | undefined = body?.type
  const data = body?.data || {}

  // Determine type
  let type: PartnerTypeV | null = null
  const raw = (role || legacyType || '').toLowerCase()
  if (raw.includes('driver')) type = 'DRIVER'
  else if (raw.includes('merchant') || raw.includes('shop')) type = 'MERCHANT'
  else if (raw.includes('ltd') || raw.includes('company')) type = 'LTD'

  // Extract contact details from either top-level or nested data
  const name = body?.name || data?.contactName || [data?.firstName, data?.lastName].filter(Boolean).join(' ').trim() || data?.companyName || null
  const email = body?.email || data?.email || data?.contactEmail || null
  const phone = body?.phone || data?.phone || data?.contactPhone || null
  const company = body?.company || data?.companyName || data?.tradingName || null

  return { type, name, email, phone, company, payload: body?.data ?? body ?? {} }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'local'
    if (!rateLimit(`partners:${ip}`, 10, 60_000).ok) {
      return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const { type, name, email, phone, company, payload } = normalisePartnerPayload(body)

    if (!type || !name || !email || !phone) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const created = await prisma.partnerApplication.create({
      data: { type, name, email, phone, company, payload },
      select: { id: true },
    })

    await notifyOps({
      title: `New partner application: ${type}`,
      lines: [
        `Type: ${type}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Company: ${company || '-'}`,
        `ID: ${created.id}`,
      ],
    })
    return NextResponse.json({ ok: true, id: created.id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Invalid payload' }, { status: 400 })
  }
}
