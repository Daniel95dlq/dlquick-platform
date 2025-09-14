import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { orderId: string } }) {
  const { orderId } = params
  // TODO: join with live driver telemetry when available.
  return NextResponse.json({
    orderId,
    status: 'in_route',
    etaMinutes: 18,
    vehicle: { type: 'van', registration: 'DLQ-42', branded: true },
    position: { lat: 53.4084, lng: -2.9916 },
    updatedAt: new Date().toISOString(),
  })
}
