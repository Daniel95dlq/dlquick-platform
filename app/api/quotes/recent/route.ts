import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

export async function GET() {
  try {
    const items = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    })
    return NextResponse.json({ ok: true, items })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 })
  }
}
