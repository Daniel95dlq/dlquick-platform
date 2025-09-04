import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'
import * as z from 'zod'

const createOrderSchema = z.object({
  serviceId: z.string(),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  pickupAddress: z.string().min(5),
  deliveryAddress: z.string().min(5),
  scheduledDate: z.string(),
  totalAmount: z.number().positive(),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    let userId = session?.user?.id

    // If no session, create a guest user
    if (!userId) {
      const body = await request.json()
      const guestUser = await prisma.user.create({
        data: {
          email: body.customerEmail,
          name: body.customerName,
          role: 'CUSTOMER',
        },
      })
      userId = guestUser.id
    }

    const body = await request.json()
    const validatedData = createOrderSchema.parse(body)

    // Generate order number
    const orderNumber = `DLQ-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        serviceId: validatedData.serviceId,
        userId,
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone,
        pickupAddress: validatedData.pickupAddress,
        deliveryAddress: validatedData.deliveryAddress,
        scheduledDate: new Date(validatedData.scheduledDate),
        totalAmount: validatedData.totalAmount,
        notes: validatedData.notes,
        status: 'PENDING',
      },
      include: {
        service: {
          include: {
            subcategory: {
              include: {
                category: true,
              },
            },
          },
        },
        user: true,
      },
    })

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        serviceName: order.service.name,
        totalAmount: order.totalAmount,
        scheduledDate: order.scheduledDate,
      },
    })
  } catch (error) {
    console.error('Order creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid data provided', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        service: {
          include: {
            subcategory: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, orders })
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
