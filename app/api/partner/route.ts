import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // For now, just return ok. Later: forward to SES/Lambda via API Gateway.
  return NextResponse.json({ ok: true });
}
