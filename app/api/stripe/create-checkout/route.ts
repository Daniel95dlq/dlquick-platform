import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/src/lib/stripe'
import { prisma } from '@/src/lib/prisma'
import * as z from 'zod'

const createCheckoutSchema = z.object({
  orderId: z.string(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, successUrl, cancelUrl } = createCheckoutSchema.parse(body)

    // Get the order details
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    if (order.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Order is not in pending status' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: order.service.name,
              description: `${order.service.subcategory.category.name} - ${order.service.subcategory.name}`,
              metadata: {
                orderId: order.id,
                orderNumber: order.orderNumber,
              },
            },
            unit_amount: Math.round(order.totalAmount * 100), // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: cancelUrl,
      customer_email: order.customerEmail,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        serviceId: order.serviceId,
        userId: order.userId,
      },
      payment_intent_data: {
        metadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
        },
      },
    })

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: orderId },
      data: {
        stripeSessionId: session.id,
        notes: order.notes 
          ? `${order.notes}\n\nStripe Session: ${session.id}`
          : `Stripe Session: ${session.id}`,
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
