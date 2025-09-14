import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"
import { rateLimit } from "../../../lib/ratelimit"
import { notifyOps } from "../../../lib/notify"

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'local'
    if (!rateLimit(`quotes:${ip}`, 10, 60_000).ok) {
      return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
    }
    const body = await req.json()
    const { serviceSlug, serviceTitle, data } = body || {}
    if (!serviceSlug || !serviceTitle || !data?.name || !data?.email || !data?.phone) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    const created = await (prisma as any).quoteRequest.create({
      data: {
        serviceSlug,
        serviceTitle,
        name: data.name,
        email: data.email,
        phone: data.phone,
        payload: data,
      },
      select: { id: true },
    })

    // Notify ops if mailer is configured
    await notifyOps({ title: `New quote: ${serviceTitle}`, lines: [
      `Service: ${serviceTitle}`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `ID: ${created.id}`,
    ]})
    return NextResponse.json({ ok: true, id: created.id })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }
}

export async function GET() {
  const rows = await (prisma as any).quoteRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: { id: true, name: true, email: true, serviceTitle: true, createdAt: true },
  })
  return NextResponse.json({ ok: true, items: rows })
}
