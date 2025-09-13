import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { serviceSlug, serviceTitle, data } = body || {}
    if (!serviceSlug || !serviceTitle || !data?.name || !data?.email || !data?.phone) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    try {
      const client: any = prisma as any
      await client.quoteRequest?.create({
        data: {
          serviceSlug,
          serviceTitle,
          name: data.name,
          email: data.email,
          phone: data.phone,
          payload: data,
        },
      })
    } catch (e) {
      // If DB is not configured yet, at least log and continue
      console.warn("Could not persist quote to DB:", (e as Error).message)
    }

    // TODO: send email/Slack notification here
    console.log("Quote request:", body)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }
}
