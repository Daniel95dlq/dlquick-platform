import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/src/lib/stripe'
import { prisma } from '@/src/lib/prisma'
import { headers } from 'next/headers'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = headers()
  const sig = headersList.get('stripe-signature')

  if (!sig || !endpointSecret) {
    console.error('Missing Stripe signature or webhook secret')
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const orderId = session.metadata?.orderId

        if (!orderId) {
          console.error('No orderId in session metadata')
          break
        }

        // Update order status to CONFIRMED
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'CONFIRMED',
            paymentStatus: 'PAID',
            confirmedAt: new Date(),
            stripePaymentId: session.payment_intent as string,
            notes: `Payment completed. Stripe Session: ${session.id}`,
          },
        })

        console.log(`Order ${orderId} confirmed after successful payment`)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object
        const orderId = paymentIntent.metadata?.orderId

        if (!orderId) {
          console.error('No orderId in payment intent metadata')
          break
        }

        // Additional payment confirmation if needed
        await prisma.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: 'PAID',
            stripePaymentId: paymentIntent.id,
            notes: `Payment intent succeeded. Payment ID: ${paymentIntent.id}`,
          },
        })

        console.log(`Payment confirmed for order ${orderId}`)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        const orderId = paymentIntent.metadata?.orderId

        if (!orderId) {
          console.error('No orderId in failed payment intent metadata')
          break
        }

        // Update order status to FAILED
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'CANCELLED',
            paymentStatus: 'FAILED',
            stripePaymentId: paymentIntent.id,
            notes: `Payment failed. Payment ID: ${paymentIntent.id}`,
          },
        })

        console.log(`Payment failed for order ${orderId}`)
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object
        const orderId = session.metadata?.orderId

        if (!orderId) {
          console.error('No orderId in expired session metadata')
          break
        }

        // Update order status to CANCELLED due to expired session
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'CANCELLED',
            notes: `Checkout session expired. Session ID: ${session.id}`,
          },
        })

        console.log(`Order ${orderId} cancelled due to expired checkout session`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
