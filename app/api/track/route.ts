import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { orderId } = await req.json().catch(() => ({ orderId: '' }))
  if (!orderId || typeof orderId !== 'string' || orderId.length < 5) {
    return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 })
  }

  const demo = {
    orderId: orderId.toUpperCase(),
    status: 'in-transit',
    eta: '14:30',
    currentLocation: 'Liverpool City Centre',
    vehicle: {
      type: 'Van',
      regPlate: 'DLQ 123',
      branded: true,
      driverName: 'James Wilson',
      driverPhoto: '/img/driver-placeholder.jpg'
    },
    stages: [
      { id: 'order-placed', name: 'Order Placed', description: 'Order received and confirmed', completed: true, timestamp: '2024-09-03 12:15', icon: '📋' },
      { id: 'preparing', name: 'Preparing', description: 'Items being prepared', completed: true, timestamp: '2024-09-03 12:45', icon: '📦' },
      { id: 'collected', name: 'Collected', description: 'Loaded for delivery', completed: true, timestamp: '2024-09-03 13:20', icon: '🚚' },
      { id: 'in-transit', name: 'In Transit', description: 'On the way', completed: true, timestamp: '2024-09-03 13:45', icon: '🛣️' },
      { id: 'delivered', name: 'Delivered', description: 'Delivered to recipient', completed: false, icon: '✅' }
    ],
    notes: [
      'Driver will ring doorbell',
      'Ensure someone is available to receive',
      'Contact driver if any issues: 07123 456789'
    ],
    photos: []
  }

  return NextResponse.json(demo)
}
